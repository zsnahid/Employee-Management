import { useGetWorkSheetEntriesQuery } from "@/store/workSheetApi";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatTime, formatDate, calculateDuration } from "@/lib/utils";

export default function DailyEntries() {
  const {
    data: worksheetEntries = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useGetWorkSheetEntriesQuery();

  // Group entries by date
  const groupedEntries = worksheetEntries.reduce(
    (groups, entry) => {
      const date = new Date(entry.createdAt).toDateString();
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(entry);
      return groups;
    },
    {} as Record<string, typeof worksheetEntries>,
  );

  // Handle loading state
  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight">Daily Entries</h2>
        </div>
        <div className="flex items-center justify-center p-8">
          <div className="border-primary h-8 w-8 animate-spin rounded-full border-b-2"></div>
          <span className="text-muted-foreground ml-3">
            Loading work sheet entries...
          </span>
        </div>
      </div>
    );
  }

  // Handle error state
  if (isError) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight">Daily Entries</h2>
        </div>
        <Card>
          <CardContent className="flex flex-col items-center justify-center p-8">
            <div className="text-destructive mb-4">
              <h3 className="text-lg font-semibold">Error Loading Data</h3>
              <p className="text-muted-foreground mt-1 text-sm">
                {error && "data" in error
                  ? (error.data as any)?.message ||
                    "Failed to load work sheet entries"
                  : "Failed to load work sheet entries"}
              </p>
            </div>
            <Button onClick={() => refetch()} variant="outline">
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Handle empty state
  if (worksheetEntries.length === 0) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight">Daily Entries</h2>
        </div>
        <Card>
          <CardContent className="flex flex-col items-center justify-center p-8">
            <div className="text-center">
              <h3 className="mb-2 text-lg font-semibold">No entries yet</h3>
              <p className="text-muted-foreground">
                Start tracking your work by adding your first task entry.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Daily Entries</h2>
        <Badge variant="secondary">
          {worksheetEntries.length}{" "}
          {worksheetEntries.length === 1 ? "entry" : "entries"}
        </Badge>
      </div>

      <div className="space-y-6">
        {Object.entries(groupedEntries)
          .sort(([a], [b]) => new Date(b).getTime() - new Date(a).getTime())
          .map(([date, entries]) => (
            <div key={date} className="space-y-3">
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-semibold">
                  {formatDate(entries[0].createdAt)}
                </h3>
                <Badge variant="outline">
                  {entries.length} {entries.length === 1 ? "task" : "tasks"}
                </Badge>
              </div>

              <div className="grid gap-3">
                {entries
                  .sort(
                    (a, b) =>
                      new Date(b.createdAt).getTime() -
                      new Date(a.createdAt).getTime(),
                  )
                  .map((entry) => {
                    const isOptimistic = entry._id.startsWith("temp-");
                    return (
                      <Card
                        key={entry._id}
                        className={`transition-all duration-200 hover:shadow-md ${
                          isOptimistic
                            ? "animate-pulse opacity-70"
                            : "opacity-100"
                        }`}
                      >
                        <CardHeader className="pb-3">
                          <div className="flex items-start justify-between">
                            <CardTitle className="flex items-center gap-2 text-base">
                              {entry.selectedTask}
                              {isOptimistic && (
                                <div className="h-2 w-2 animate-pulse rounded-full bg-blue-500" />
                              )}
                            </CardTitle>
                            <div className="flex items-center gap-2">
                              <Badge
                                variant={
                                  entry.selectedProgress === "Completed"
                                    ? "default"
                                    : entry.selectedProgress === "In Progress"
                                      ? "secondary"
                                      : "outline"
                                }
                                className={`text-xs ${
                                  entry.selectedProgress === "Completed"
                                    ? "bg-green-100 text-green-800"
                                    : entry.selectedProgress === "In Progress"
                                      ? "bg-blue-100 text-blue-800"
                                      : "bg-yellow-100 text-yellow-800"
                                }`}
                              >
                                {entry.selectedProgress}
                              </Badge>
                              <Badge
                                variant={isOptimistic ? "secondary" : "default"}
                                className="ml-2"
                              >
                                {calculateDuration(
                                  entry.startTime,
                                  entry.completionTime,
                                )}
                              </Badge>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <div className="text-muted-foreground flex items-center justify-between text-sm">
                            <div className="flex items-center gap-4">
                              <span>
                                Started: {formatTime(entry.startTime)}
                              </span>
                              <span>
                                Completed: {formatTime(entry.completionTime)}
                              </span>
                            </div>
                            {isOptimistic && (
                              <Badge variant="secondary" className="text-xs">
                                Saving...
                              </Badge>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
