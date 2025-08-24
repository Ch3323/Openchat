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
    <div className="container mx-auto flex justify-center items-center h-screen">
      <div className="flex flex-col gap-2 max-w-lg">
        <JoinRoomForm />
        <Button
          onClick={handleCreate}
          className="self-end px-0 font-normal select-none"
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
