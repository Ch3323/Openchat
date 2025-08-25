'use client';

import { useState } from 'react';
import axios from 'axios';
import JoinRoomForm from '@/components/home/joinroom';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

function Home() {
  const router = useRouter();
  const [isCreating, setIsCreating] = useState(false);

  async function handleCreate() {
    try {
      setIsCreating(true);
      toast('Creating Room', { description: 'Please wait...' });
      const res = await axios.post('/api/room/create');
      const newRoom = res.data;
      toast('Room Created', { description: `Code: ${newRoom.code}` });
      router.push(`/room/${newRoom.code}`);
    } catch (_) {
      toast('Error', { description: 'Failed to create room.' });
      setIsCreating(false);
    }
  }

  return (
    <div className="container mx-auto flex justify-center items-center h-dvh">
      <div className="flex flex-col justify-center items-center gap-2 w-full max-w-xs px-5 sm:px-0 sm:max-w-xl">
        <JoinRoomForm />
        <Button
          onClick={handleCreate}
          className="self-center sm:self-end px-0 font-normal select-none text-xs sm:text-sm"
          variant={'link'}
          disabled={isCreating}
        >
          Don't have a room yet? Create a new one.
        </Button>
      </div>
    </div>
  );
}
export default Home;
