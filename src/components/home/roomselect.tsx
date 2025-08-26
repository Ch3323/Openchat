'use client';

import { Button } from '@/components/ui/button';
import { ArrowBigRightDash, RefreshCcw } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Card, CardAction, CardContent } from '@/components/ui/card';
import { Room } from '@/generated/prisma';

function RoomSelect({ className = '' }) {
  const [roomList, setRoomList] = useState([]);
  const [isJoining, setIsJoining] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const router = useRouter();

  async function handleJoin(roomCode: string) {
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

  async function fetchRoom() {
    try {
      setIsFetching(true);
      const res = await axios.get('/api/room');
      const data = res?.data;
      setRoomList(data || []);
    } catch (_) {
      toast('Error', { description: 'Error fetching room' });
    }
    setIsFetching(false);
  }

  useEffect(() => {
    fetchRoom();
  }, []);

  return (
    <div
      className={`absolute w-full h-1/4 bottom-0 right-0 2xl:w-sm 2xl:h-full p-2 bg-secondary overflow-auto ${className}`}
    >
      <div className="flex justify-between items-center">
        <h1 className="text-lg sm:text-xl 2xl:text-2xl text-center sm:text-start font-semibold px-1 py-2">
          Active room
        </h1>
        <Button
          onClick={fetchRoom}
          className={`hover:rotate-[-90deg] rounded-full focus-visible:ring-0 ${isFetching ? 'animate-spin' : ''}`}
          size={'icon'}
          variant={'ghost'}
          disabled={isFetching}
        >
          <RefreshCcw />
        </Button>
      </div>

      <hr />
      <div className="w-full mt-5">
        {roomList.map((room: Room) => (
          <Card key={room.code} className="rounded-none p-0 shadow-none text-xs sm:text-sm">
            <CardContent className="flex justify-between items-center p-0">
              <h1 className="font-semibold px-2">{room.code}</h1>
              <CardAction>
                <Button onClick={() => handleJoin(room.code)} className="border-l-1 rounded-none">
                  <ArrowBigRightDash />
                </Button>
              </CardAction>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
export default RoomSelect;
