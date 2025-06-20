import { Card, CardTitle } from "@/components/ui/card";
import { CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CardHeader } from "@/components/ui/card";
import { Clock } from "lucide-react";

export default function DailyEntries() {
  const dailyEntries = [
    {
      date: "2024-12-16",
      clockIn: "09:00",
      clockOut: "17:30",
      breakTime: "1h",
      totalHours: 7.5,
      tasks: ["Code Review", "Sprint Planning", "Bug Fixes"],
      status: "completed",
    },
    {
      date: "2024-12-15",
      clockIn: "09:15",
      clockOut: "17:45",
      breakTime: "1h",
      totalHours: 7.5,
      tasks: ["Feature Development", "Team Meeting", "Documentation"],
      status: "completed",
    },
    {
      date: "2024-12-14",
      clockIn: "09:00",
      clockOut: "18:00",
      breakTime: "1h",
      totalHours: 8,
      tasks: ["Client Call", "Project Planning", "Code Implementation"],
      status: "completed",
    },
    {
      date: "2024-12-13",
      clockIn: "08:45",
      clockOut: "17:30",
      breakTime: "45min",
      totalHours: 8,
      tasks: ["Database Migration", "Testing", "Deployment"],
      status: "completed",
    },
    {
      date: "2024-12-12",
      clockIn: "09:00",
      clockOut: "17:15",
      breakTime: "1h",
      totalHours: 7.25,
      tasks: ["Research", "Prototyping", "Team Standup"],
      status: "completed",
    },
  ];

  return (
    <Card className="lg:col-span-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Daily Time Entries
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {dailyEntries.map((entry) => (
            <div key={entry.date} className="rounded-lg border p-4">
              <div className="mb-3 flex items-center justify-between">
                <div>
                  <p className="font-medium">
                    {new Date(entry.date).toLocaleDateString("en-US", {
                      weekday: "long",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                  <p className="text-muted-foreground text-sm">
                    {entry.clockIn} - {entry.clockOut}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold">{entry.totalHours}h</p>
                  <p className="text-muted-foreground text-sm">
                    Break: {entry.breakTime}
                  </p>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium">Tasks:</p>
                <div className="flex flex-wrap gap-2">
                  {entry.tasks.map((task, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {task}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
