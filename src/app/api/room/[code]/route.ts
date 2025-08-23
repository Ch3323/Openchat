import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest, context: { params: Promise<{ code: string }> }) {

  const { code } = await context.params;
  
  try {
    const room = await prisma.room.findUnique({
      where: { code: code },
    });

    if (!room) {
      return NextResponse.json({ error: "Room not found" }, { status: 404 });
    }

    return NextResponse.json(room);
  } catch (error) {
    return NextResponse.json({ error: "Error checking room" }, { status: 500 });
  }
}
