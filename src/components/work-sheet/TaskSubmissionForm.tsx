"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDownIcon, PlusIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAddWorkSheetEntryMutation } from "@/store/workSheetApi";

const taskOptions = [
  "Bug Fixes",
  "Code Review",
  "Deployment",
  "Feature Development",
  "Meeting",
  "Testing",
];

const progressOptions = ["Completed", "Pending", "In Progress"];

export default function TaskSubmissionForm() {
  const [selectedTask, setSelectedTask] = useState("");
  const [selectedProgress, setSelectedProgress] = useState("");
  const [addWorkSheetEntry, { isLoading, isError, error }] =
    useAddWorkSheetEntryMutation();

  const handleSubmit = async (formData: FormData) => {
    const startTime = formData.get("start-time") as string;
    const completionTime = formData.get("completion-time") as string;

    if (!selectedTask || !selectedProgress || !startTime || !completionTime) {
      console.error("All fields are required");
      return;
    }

    try {
      // Convert FormData to the expected JSON structure
      const taskData = {
        selectedTask,
        selectedProgress,
        startTime,
        completionTime,
      };

      // 1. Optimistically update the UI
      // 2. Sends the data to MongoDB API endpoint
      // 3. Replaces the optimistic entry with the real data from the database
      // 4. Handles error by rolling back the optimistic update if needed
      await addWorkSheetEntry(taskData).unwrap();
    } catch (error) {
      console.error("Failed to add work sheet entry: ", error);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold">Add New Task</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            {/* Tasks Dropdown */}
            <div className="space-y-2">
              <Label htmlFor="task-select" className="text-sm font-medium">
                Tasks
              </Label>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "h-10 w-full justify-between",
                      !selectedTask && "text-muted-foreground",
                    )}
                  >
                    {selectedTask || "Select a task"}
                    <ChevronDownIcon className="h-4 w-4 opacity-50" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-full">
                  {taskOptions.map((task) => (
                    <DropdownMenuItem
                      key={task}
                      onClick={() => setSelectedTask(task)}
                    >
                      {task}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Progress Dropdown */}
            <div className="space-y-2">
              <Label htmlFor="progress-select" className="text-sm font-medium">
                Progress
              </Label>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "h-10 w-full justify-between",
                      !selectedProgress && "text-muted-foreground",
                    )}
                  >
                    {selectedProgress || "Select progress"}
                    <ChevronDownIcon className="h-4 w-4 opacity-50" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-full">
                  {progressOptions.map((progress) => (
                    <DropdownMenuItem
                      key={progress}
                      onClick={() => setSelectedProgress(progress)}
                    >
                      {progress}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Start Time */}
            <div className="space-y-2">
              <Label htmlFor="start-time" className="text-sm font-medium">
                Start Time
              </Label>
              <Input
                id="start-time"
                name="start-time"
                type="datetime-local"
                required
              />
            </div>

            {/* Completion Time */}
            <div className="space-y-2">
              <Label htmlFor="completion-time" className="text-sm font-medium">
                Completion Time
              </Label>
              <Input
                id="completion-time"
                name="completion-time"
                type="datetime-local"
                required
              />
            </div>

            {/* show error if any */}
            {isError && <p className="text-destructive">Failed to add task</p>}
          </div>

          {/* Add Button */}
          <div className="flex justify-end pt-2">
            <Button
              type="submit"
              disabled={isLoading}
              className={cn("h-10 px-6", isLoading && "cursor-not-allowed")}
            >
              <PlusIcon className="mr-2 h-4 w-4" />
              {isLoading ? "Adding..." : "Add"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
