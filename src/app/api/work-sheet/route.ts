"use server";

import { getCollection } from "@/lib/actions";
import { auth } from "@clerk/nextjs/server";

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
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const workSheetCollection = await getCollection<Task>("work-sheet");

    if (!workSheetCollection) {
      return Response.json(
        { error: "Database connection failed" },
        { status: 500 },
      );
    }

    const tasks = await workSheetCollection.find({ userId }).toArray();

    return Response.json(tasks, { status: 200 });
  } catch (error) {
    console.error("Error fetching work sheet entries: ", error);
    return Response.json({ error: "Failed to fetch entries" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const workSheetCollection = await getCollection<Task>("work-sheet");

    if (!workSheetCollection) {
      return Response.json(
        { error: "Database connection failed" },
        { status: 500 },
      );
    }

    const body = await request.json();

    const { selectedTask, selectedProgress, startTime, completionTime } = body;

    if (!selectedTask || !selectedProgress || !startTime || !completionTime) {
      return Response.json(
        { error: "All fields are required" },
        { status: 400 },
      );
    }

    // Validate that completion time is after start time
    const start = new Date(startTime);
    const end = new Date(completionTime);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return Response.json({ error: "Invalid date format" }, { status: 400 });
    }

    if (end <= start) {
      return Response.json(
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
      return Response.json(
        { error: "Failed to create entry" },
        { status: 500 },
      );
    }

    // Return the newly created document
    // RTK Query will use this to replace the optimistic update with real data
    const newDoc = await workSheetCollection.findOne({ _id: res.insertedId });

    return Response.json(newDoc, { status: 201 });
  } catch (error) {
    console.error("Error creating work sheet entry: ", error);
    return Response.json({ error: "Failed to create entry" }, { status: 500 });
  }
}
