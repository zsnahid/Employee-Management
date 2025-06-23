import { getCollection } from "@/lib/actions";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { subject, category, priority, message, contactMethod } =
      await request.json();

    if (!subject || !category || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 },
      );
    }

    const messagesCollection = await getCollection("messages");

    if (!messagesCollection) {
      return NextResponse.json(
        { error: "Database connection failed" },
        { status: 500 },
      );
    }

    const data = {
      subject,
      category,
      priority,
      message,
      contactMethod,
      createdAt: new Date().toISOString(),
    };

    const res = await messagesCollection.insertOne(data);

    if (res.insertedId) {
      return NextResponse.json({
        success: true,
        id: res.insertedId.toString(),
      });
    } else {
      return NextResponse.json(
        { error: "Failed to send message" },
        { status: 500 },
      );
    }
  } catch (err) {}
}
