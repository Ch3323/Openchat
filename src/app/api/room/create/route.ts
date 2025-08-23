import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

function generateRoomCode(length = 6) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export async function POST(_: NextRequest) {
  try {
    let room;
    let attempts = 0;

    while (true) {
      if (attempts++ > 10) {
        return NextResponse.json({ error: 'Failed to generate unique room code' }, { status: 500 });
      }

      const code = generateRoomCode();

      try {
        room = await prisma.room.create({
          data: { code },
        });
        break;
      } catch (error: any) {
        if (error.code === 'P2002') {
          continue;
        } else {
          throw error;
        }
      }
    }

    return NextResponse.json(room, { status: 201 });
  } catch (error) {
    console.error('Error creating room:', error);
    return NextResponse.json({ error: 'Failed to create room' }, { status: 500 });
  }
}
