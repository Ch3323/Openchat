import { NextRequest ,NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest, context: { params: Promise<{ code: string }> }) {

  const { code } = await context.params;

  try {
    const messages = await prisma.message.findMany({
      where: { roomCode: code },
      orderBy: { createdAt: "asc" },
    });

    if (messages.length === 0) {
      return NextResponse.json({ error: "No messages found" }, { status: 404 });
    }

    return NextResponse.json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    return NextResponse.json({ error: "Error fetching messages" }, { status: 500 });
  }
}
