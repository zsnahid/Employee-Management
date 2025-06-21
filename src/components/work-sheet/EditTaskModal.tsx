"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDownIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useUpdateWorkSheetEntryMutation } from "@/store/workSheetApi";

const taskOptions = [
  "Bug Fixes",
  "Code Review",
  "Deployment",
  "Feature Development",
  "Meeting",
  "Testing",
];

const progressOptions = ["Completed", "Pending", "In Progress"];

interface WorkSheetEntry {
  _id: string;
  userId: string;
  selectedTask: string;
  selectedProgress: string;
  startTime: string;
  completionTime: string;
  createdAt: string;
}

interface EditTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  entry: WorkSheetEntry | null;
}

export default function EditTaskModal({
  isOpen,
  onClose,
  entry,
}: EditTaskModalProps) {
  const [selectedTask, setSelectedTask] = useState("");
  const [selectedProgress, setSelectedProgress] = useState("");
  const [startTime, setStartTime] = useState("");
  const [completionTime, setCompletionTime] = useState("");

  const [updateWorkSheetEntry, { isLoading, isError }] =
    useUpdateWorkSheetEntryMutation();

  // Format datetime-local input value
  const formatDateTimeLocal = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  // Pre-fill form when entry changes
  useEffect(() => {
    if (entry && isOpen) {
      setSelectedTask(entry.selectedTask);
      setSelectedProgress(entry.selectedProgress);
      setStartTime(formatDateTimeLocal(entry.startTime));
      setCompletionTime(formatDateTimeLocal(entry.completionTime));
    }
  }, [entry, isOpen]);

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setSelectedTask("");
      setSelectedProgress("");
      setStartTime("");
      setCompletionTime("");
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !entry ||
      !selectedTask ||
      !selectedProgress ||
      !startTime ||
      !completionTime
    ) {
      console.error("All fields are required");
      return;
    }

    try {
      const updateData = {
        id: entry._id,
        selectedTask,
        selectedProgress,
        startTime,
        completionTime,
      };

      await updateWorkSheetEntry(updateData).unwrap();
      onClose();
    } catch (error) {
      console.error("Failed to update work sheet entry: ", error);
    }
  };

  if (!entry) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Task Entry</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-4">
            {/* Tasks Dropdown */}
            <div className="space-y-2">
              <Label htmlFor="task-select" className="text-sm font-medium">
                Task
              </Label>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    type="button"
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
                    type="button"
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
                type="datetime-local"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
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
                type="datetime-local"
                value={completionTime}
                onChange={(e) => setCompletionTime(e.target.value)}
                required
              />
            </div>

            {/* Error Message */}
            {isError && (
              <p className="text-destructive text-sm">
                Failed to update task. Please try again.
              </p>
            )}
          </div>

          <DialogFooter className="gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className={cn(isLoading && "cursor-not-allowed")}
            >
              {isLoading ? "Updating..." : "Update"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
