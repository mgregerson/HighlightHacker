import { db } from "@/lib/db";
import { getSelf } from "@/lib/auth-service";

export async function POST(request: Request) {
  try {
    const self = await getSelf();
    const body = await request.json();

    if (!body.content || !body.chatroomId) {
      return new Response("Invalid request. Please provide content and chatroomId.", { status: 400 });
    }

    const res = await db.message.create({
      data: {
        content: body.content,
        chatroomId: body.chatroomId,
        userId: self!.id,
      },
    });

    return new Response(JSON.stringify(res), { status: 200, headers: { "Content-Type": "application/json" } });
  } catch (error: any) {
    console.error("Error creating message:", error.message);
    return new Response("Internal Server Error", { status: 500 });
  }
}