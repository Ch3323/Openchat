import { useEffect, useState } from 'react';
import { supabase } from '@/lib/client';

export function useRoomMessages(roomCode: string) {
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    if (!roomCode) return;

    const loadMessages = async () => {
      const { data, error } = await supabase
        .from('Message')
        .select('*')
        .eq('room_code', roomCode)
        .order('created_at', { ascending: true });

      if (!error && data) setMessages(data);
    };
    loadMessages();

    const channel = supabase
      .channel('room-messages')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'Message', filter: `room_code=eq.${roomCode}` },
        (payload) => {
          setMessages((prev) => [...prev, payload.new]);
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [roomCode]);

  return messages;
}

export async function sendMessage(roomCode: string, text: string) {
  const { error } = await supabase.from('Message').insert([{ text, room_code: roomCode }]);

  if (error) console.error('Error sending message:', error);
}
