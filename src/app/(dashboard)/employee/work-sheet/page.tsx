"use client";

import DailyEntries from "@/components/work-sheet/DailyEntries";
import Tickets from "@/components/work-sheet/Tickets";
import TaskSubmissionForm from "@/components/work-sheet/TaskSubmissionForm";

export default function WorkSheet() {
  // Mock data - replace with actual data fetching
  // const weeklyStats = {
  //   totalHours: 38.5,
  //   targetHours: 40,
  //   overtime: 0,
  //   breaks: 5.5,
  //   productivity: 92,
  // };

  return (
    <div className="space-y-6">
      {/* Header */}

      <div>
        <h1 className="text-foreground text-3xl font-bold">Work Sheet</h1>
        <p className="text-muted-foreground">
          Track your time and manage daily tasks
        </p>
      </div>

      {/* Time Tracker */}
      {/* <TimeTracker /> */}

      {/* Task submission form */}
      <TaskSubmissionForm />

      {/* Weekly Stats */}
      {/* <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{weeklyStats.targetHours}h</div>
            <p className="text-muted-foreground text-sm">Target Hours</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{weeklyStats.overtime}h</div>
            <p className="text-muted-foreground text-sm">Overtime</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">
              {weeklyStats.productivity}%
            </div>
            <p className="text-muted-foreground text-sm">Productivity</p>
          </CardContent>
        </Card>
      </div> */}

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Daily Entries */}
        <DailyEntries />

        {/* Assigned Tasks */}
        <Tickets />
      </div>
    </div>
  );
}
