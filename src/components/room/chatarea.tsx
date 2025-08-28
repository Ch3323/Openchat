'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Send, ArrowBigLeft, Image } from 'lucide-react';
import { useParams } from 'next/navigation';
import { uploadImage } from '@/lib/uploadImage';
import { supabase } from '@/lib/client';
import ChatBubble from './chat';
import { useRoomMessages, sendMessage } from '@/hooks/useRoomMessages';

function Chatarea() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const params = useParams();
  const roomCode = params.roomCode;

  const messages = useRoomMessages(`${roomCode}`);
  const [input, setInput] = useState('');

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleSend = async () => {
    if (!input.trim()) return;
    await sendMessage(`${roomCode}`, input);
    setInput('');
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    const file = e.target.files[0];
    const url = await uploadImage(file);

    await supabase.from('Message').insert([{ text: '', image_url: url, room_code: `${roomCode}` }]);
  };

  return (
    <div className="z-100 flex sm:mx-3 flex-col justify-between bg-primary-foreground w-3xl max-w-3xl h-full sm:h-1/2 sm:max-h-1/2 border-1 border-input">
      <div className="flex justify-between items-center border-b-1">
        <div className="flex h-full">
          <Link href={'/'}>
            <Button className="rounded-none h-full aspect-square">
              <ArrowBigLeft />
            </Button>
          </Link>
          <h1 className="py-2 px-4 font-mono font-medium">Chat</h1>
        </div>
        <div className="flex flex-col h-full bg-primary text-primary-foreground">
          <span className="text-[10px] text-center opacity-50 select-none">Room Code:</span>
          <span className="h-full content-center px-3 font-bold font-mono">
            {roomCode || 'CodeRoom'}
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-3 p-4 h-full overflow-y-auto">
        {messages.map((m) => (
          <ChatBubble key={m.id} text={m.text} image_url={m.image_url} />
        ))}
      </div>
      <div className="flex">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
        <Button variant="outline" size={'icon'} className="rounded-none" onClick={handleClick}>
          <Image />
        </Button>
        <Input
          className="rounded-none focus-visible:ring-0 border-x-0 border-b-0 focus-visible:border-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        />
        <Button onClick={handleSend} className="rounded-none">
          <Send />
        </Button>
      </div>
    </div>
  );
}
export default Chatarea;
