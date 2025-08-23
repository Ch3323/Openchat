"use client";

import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { toast } from "sonner";

function JoinRoomForm() {
  const [roomCode, setRoomCode] = useState("");
  const router = useRouter();

  async function handleJoin() {
    if (!roomCode) {
      toast("Error", { description: "You have to enter the room code." });
      return;
    }

    try {
      const res = await axios.get(`/api/room/${roomCode}`);

      if (res.status === 200) {
        toast("Success", { description: "Joined room!" });
        router.push(`/room/${roomCode}`);
      }
    } catch (_) {
      toast("Error", { description: "Room not found." });
    }
  }

  return (
    <div className="flex w-full gap-2 select-none">
      <Input
        onChange={(e) => setRoomCode(e.target.value)}
        className="w-lg"
        placeholder="Enter room code..."
      />
      <Button onClick={handleJoin}>Join</Button>
    </div>
  );
}
export default JoinRoomForm;
