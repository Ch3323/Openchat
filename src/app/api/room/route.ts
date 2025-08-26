import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(_: NextRequest) {
  try {
    const rooms = await prisma.room.findMany({});

    if (!rooms) {
      return NextResponse.json({ error: 'Room not found' }, { status: 404 });
    }
    return NextResponse.json(rooms);
  } catch (_) {
    return NextResponse.json({ error: 'Error fetching room' }, { status: 500 });
  }
}
