"use client";

import { useState, useEffect } from "react";
import { useStopwatch } from "react-timer-hook";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Play, Square, Trash2 } from "lucide-react";

interface TimeEntry {
  id: string;
  label: string;
  startTime: Date;
  endTime: Date;
  duration: number; // in seconds
}

export default function TimeTracker() {
  const [timeEntries, setTimeEntries] = useState<TimeEntry[]>([]);
  const [currentLabel, setCurrentLabel] = useState("");
  const [sessionStartTime, setSessionStartTime] = useState<Date | null>(null);
  const [isTracking, setIsTracking] = useState(false);

  const { seconds, minutes, hours, start, reset } = useStopwatch({
    autoStart: false,
  });

  // Load time entries from localStorage on component mount
  useEffect(() => {
    const savedEntries = localStorage.getItem("timeEntries");
    if (savedEntries) {
      try {
        const parsed = JSON.parse(savedEntries);
        // Convert date strings back to Date objects
        const entriesWithDates = parsed.map((entry: { startTime: string | number | Date; endTime: string | number | Date; }) => ({
          ...entry,
          startTime: new Date(entry.startTime),
          endTime: new Date(entry.endTime),
        }));
        setTimeEntries(entriesWithDates);
      } catch (error) {
        console.error("Failed to load time entries:", error);
      }
    }
  }, []);

  // Save time entries to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("timeEntries", JSON.stringify(timeEntries));
  }, [timeEntries]);

  const handleStart = () => {
    if (!currentLabel.trim()) {
      alert("Please enter a label for this time entry");
      return;
    }

    setSessionStartTime(new Date());
    setIsTracking(true);
    start();
  };

  const handleStop = () => {
    if (!sessionStartTime) return;

    const endTime = new Date();
    const totalSeconds = hours * 3600 + minutes * 60 + seconds;

    const newEntry: TimeEntry = {
      id: Date.now().toString(),
      label: currentLabel,
      startTime: sessionStartTime,
      endTime: endTime,
      duration: totalSeconds,
    };

    setTimeEntries((prev) => [newEntry, ...prev]);
    setCurrentLabel("");
    setSessionStartTime(null);
    setIsTracking(false);

    // Reset the timer to 0 without auto-starting
    reset(undefined, false);
  };

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const formatDuration = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    if (hrs > 0) {
      return `${hrs}h ${mins}m`;
    }
    return `${mins}m ${seconds % 60}s`;
  };

  const getTotalTime = () => {
    return timeEntries.reduce((total, entry) => total + entry.duration, 0);
  };

  const deleteEntry = (id: string) => {
    setTimeEntries((prev) => prev.filter((entry) => entry.id !== id));
  };

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      {/* Current Timer */}
      <Card className="p-6">
        <div className="space-y-4 text-center">
          <h2 className="text-2xl font-bold">Time Tracker</h2>

          {/* Timer Display */}
          <div className="text-primary font-mono text-5xl font-medium">
            {String(hours).padStart(2, "0")}:{String(minutes).padStart(2, "0")}:
            {String(seconds).padStart(2, "0")}
          </div>

          {/* Label Input */}
          <div className="mx-auto max-w-sm">
            <Input
              type="text"
              placeholder="Enter task label..."
              value={currentLabel}
              onChange={(e) => setCurrentLabel(e.target.value)}
              disabled={isTracking}
              className="text-center"
            />
          </div>

          {/* Control Buttons */}
          <div className="flex justify-center space-x-4">
            {!isTracking ? (
              <Button
                onClick={handleStart}
                className="flex items-center space-x-2"
                size="lg"
              >
                <Play className="h-5 w-5" />
                <span>Start</span>
              </Button>
            ) : (
              <Button
                onClick={handleStop}
                variant="destructive"
                className="flex items-center space-x-2"
                size="lg"
              >
                <Square className="h-5 w-5" />
                <span>Stop</span>
              </Button>
            )}
          </div>
        </div>
      </Card>

      {/* Time Entries List */}
      <Card className="p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold">Time Entries</h3>
            <div className="text-muted-foreground text-sm">
              Total: {formatDuration(getTotalTime())}
            </div>
          </div>

          {timeEntries.length === 0 ? (
            <p className="text-muted-foreground py-8 text-center">
              No time entries yet. Start tracking to see your entries here.
            </p>
          ) : (
            <div className="space-y-3">
              {timeEntries.map((entry) => (
                <div
                  key={entry.id}
                  className="bg-muted/50 flex items-center justify-between rounded-lg p-4"
                >
                  <div className="flex-1 space-y-1">
                    <div className="font-medium">{entry.label}</div>
                    <div className="text-muted-foreground text-sm">
                      {entry.startTime.toLocaleString()} -{" "}
                      {entry.endTime.toLocaleString()}
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <div className="font-mono text-lg">
                        {formatTime(entry.duration)}
                      </div>
                      <div className="text-muted-foreground text-sm">
                        {formatDuration(entry.duration)}
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteEntry(entry.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
