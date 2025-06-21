"use server";

import { getCollection } from "@/lib/actions";
import { auth } from "@clerk/nextjs/server";
import { ObjectId } from "mongodb";

interface Task {
  userId: string;
  selectedTask: string;
  selectedProgress: string;
  startTime: string;
  completionTime: string;
  createdAt: string;
}

// PUT - Update a work sheet entry
export async function PUT(
  request: Request,
  { params }: { params: { id: string } },
) {
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

    // Validate ObjectId
    if (!ObjectId.isValid(params.id)) {
      return Response.json({ error: "Invalid entry ID" }, { status: 400 });
    }

    // Build update object - only include provided fields
    const updateData: Partial<Task> = {};
    if (selectedTask) updateData.selectedTask = selectedTask;
    if (selectedProgress) updateData.selectedProgress = selectedProgress;
    if (startTime) updateData.startTime = startTime;
    if (completionTime) updateData.completionTime = completionTime;

    // Validate completion time is after start time if both are provided
    if (updateData.startTime && updateData.completionTime) {
      const start = new Date(updateData.startTime);
      const end = new Date(updateData.completionTime);

      if (isNaN(start.getTime()) || isNaN(end.getTime())) {
        return Response.json({ error: "Invalid date format" }, { status: 400 });
      }

      if (end <= start) {
        return Response.json(
          { error: "Completion time must be after start time" },
          { status: 400 },
        );
      }
    }

    const result = await workSheetCollection.updateOne(
      { _id: new ObjectId(params.id), userId },
      { $set: updateData },
    );

    if (result.matchedCount === 0) {
      return Response.json(
        { error: "Entry not found or unauthorized" },
        { status: 404 },
      );
    }

    // Return the updated document
    const updatedDoc = await workSheetCollection.findOne({
      _id: new ObjectId(params.id),
    });

    return Response.json(updatedDoc, { status: 200 });
  } catch (error) {
    console.error("Error updating work sheet entry: ", error);
    return Response.json({ error: "Failed to update entry" }, { status: 500 });
  }
}

// DELETE - Delete a work sheet entry
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } },
) {
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

    // Validate ObjectId
    if (!ObjectId.isValid(params.id)) {
      return Response.json({ error: "Invalid entry ID" }, { status: 400 });
    }

    const result = await workSheetCollection.deleteOne({
      _id: new ObjectId(params.id),
      userId,
    });

    if (result.deletedCount === 0) {
      return Response.json(
        { error: "Entry not found or unauthorized" },
        { status: 404 },
      );
    }

    return Response.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error deleting work sheet entry: ", error);
    return Response.json({ error: "Failed to delete entry" }, { status: 500 });
  }
}
