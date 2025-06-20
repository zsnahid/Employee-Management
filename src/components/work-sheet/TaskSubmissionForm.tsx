"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDownIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const taskOptions = [
  "Bug Fixes",
  "Code Review",
  "Deployment",
  "Feature Development",
  "Meeting",
  "Testing",
];

export default function TaskSubmissionForm() {
  const [selectedTask, setSelectedTask] = useState("");
  const [startTime, setStartTime] = useState("");
  const [completionTime, setCompletionTime] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log({
      task: selectedTask,
      startTime,
      completionTime,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full items-end gap-4">
      {/* Tasks Dropdown */}
      <div className="min-w-0 flex-1">
        <Label htmlFor="task-select" className="mb-2">
          Tasks
        </Label>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "h-9 w-full justify-between",
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

      {/* Start Time */}
      <div className="min-w-0 flex-1">
        <Label htmlFor="start-time" className="mb-2">
          Start Time
        </Label>
        <Input
          id="start-time"
          type="time"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          required
        />
      </div>

      {/* Completion Time */}
      <div className="min-w-0 flex-1">
        <Label htmlFor="completion-time" className="mb-2">
          Completion Time
        </Label>
        <Input
          id="completion-time"
          type="time"
          value={completionTime}
          onChange={(e) => setCompletionTime(e.target.value)}
          required
        />
      </div>

      {/* Add Button */}
      <div className="flex-shrink-0">
        <Button type="submit" className="h-9">
          Add
        </Button>
      </div>
    </form>
  );
}
