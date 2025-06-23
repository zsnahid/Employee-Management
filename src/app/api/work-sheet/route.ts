import { getCollection } from "@/lib/actions";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

interface Task {
  userId: string;
  selectedTask: string;
  selectedProgress: string;
  startTime: string;
  completionTime: string;
  createdAt: string;
}

export async function GET() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const workSheetCollection = await getCollection<Task>("work-sheet");

    if (!workSheetCollection) {
      return NextResponse.json(
        { error: "Database connection failed" },
        { status: 500 },
      );
    }

    const tasks = await workSheetCollection.find({ userId }).toArray();

    return NextResponse.json(tasks, { status: 200 });
  } catch (error) {
    console.error("Error fetching work sheet entries: ", error);
    return NextResponse.json(
      { error: "Failed to fetch entries" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const workSheetCollection = await getCollection<Task>("work-sheet");

    if (!workSheetCollection) {
      return NextResponse.json(
        { error: "Database connection failed" },
        { status: 500 },
      );
    }

    const body = await request.json();

    const { selectedTask, selectedProgress, startTime, completionTime } = body;

    if (!selectedTask || !selectedProgress || !startTime || !completionTime) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 },
      );
    }

    // Validate that completion time is after start time
    const start = new Date(startTime);
    const end = new Date(completionTime);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return NextResponse.json(
        { error: "Invalid date format" },
        { status: 400 },
      );
    }

    if (end <= start) {
      return NextResponse.json(
        { error: "Completion time must be after start time" },
        { status: 400 },
      );
    }

    const task: Task = {
      userId,
      selectedTask,
      selectedProgress,
      startTime,
      completionTime,
      createdAt: new Date().toISOString(),
    };

    const res = await workSheetCollection.insertOne(task);

    if (!res.insertedId) {
      return NextResponse.json(
        { error: "Failed to create entry" },
        { status: 500 },
      );
    }

    // Return the newly created document
    // RTK Query will use this to replace the optimistic update with real data
    const newDoc = await workSheetCollection.findOne({ _id: res.insertedId });

    return NextResponse.json(newDoc, { status: 201 });
  } catch (error) {
    console.error("Error creating work sheet entry: ", error);
    return NextResponse.json(
      { error: "Failed to create entry" },
      { status: 500 },
    );
  }
}
