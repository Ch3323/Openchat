'use client';

import axios from 'axios';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { toast } from 'sonner';

function JoinRoomForm() {
  const [roomCode, setRoomCode] = useState('');
  const [isJoining, setIsJoining] = useState(false);
  const router = useRouter();

  async function handleJoin() {
    if (isJoining) {
      return;
    }
    if (!roomCode) {
      toast('Error', { description: 'You have to enter the room code.' });
      return;
    }

    try {
      setIsJoining(true);
      toast('Joining Room', { description: 'Please wait...' });
      const res = await axios.get(`/api/room/${roomCode}`);

      if (res.status === 200) {
        toast('Success', { description: 'Joined room!' });
        router.push(`/room/${roomCode}`);
      }
    } catch (_) {
      toast('Error', { description: 'Room not found.' });
      setIsJoining(false);
    }
  }

  return (
    <div className="flex flex-col sm:flex-row w-full gap-2 select-none">
      <Input
        onChange={(e) => setRoomCode(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleJoin()}
        placeholder="Enter room code..."
        className="focus-visible:ring-0 focus-visible:border-input"
      />
      <Button onClick={handleJoin} disabled={isJoining}>
        Join
      </Button>
    </div>
  );
}
export default JoinRoomForm;
