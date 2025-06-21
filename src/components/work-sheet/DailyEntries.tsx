import { useState } from "react";
import {
  useGetWorkSheetEntriesQuery,
  useDeleteWorkSheetEntryMutation,
} from "@/store/workSheetApi";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatTime, formatDate, calculateDuration } from "@/lib/utils";
import EditTaskModal from "./EditTaskModal";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import { EditIcon, Trash2Icon } from "lucide-react";

export default function DailyEntries() {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState<
    (typeof worksheetEntries)[0] | null
  >(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [entryToDelete, setEntryToDelete] = useState<{
    id: string;
    taskName: string;
  } | null>(null);

  const {
    data: worksheetEntries = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useGetWorkSheetEntriesQuery();

  const [deleteWorkSheetEntry, { isLoading: isDeleting }] =
    useDeleteWorkSheetEntryMutation();

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

  const handleEdit = (entry: (typeof worksheetEntries)[0]) => {
    setSelectedEntry(entry);
    setEditModalOpen(true);
  };

  const handleDelete = (entryId: string, taskName: string) => {
    setEntryToDelete({ id: entryId, taskName });
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!entryToDelete) return;

    try {
      await deleteWorkSheetEntry(entryToDelete.id).unwrap();
      setDeleteModalOpen(false);
      setEntryToDelete(null);
    } catch (error) {
      console.error("Failed to delete entry:", error);
    }
  };

  const handleCloseEditModal = () => {
    setEditModalOpen(false);
    setSelectedEntry(null);
  };

  const handleCloseDeleteModal = () => {
    setDeleteModalOpen(false);
    setEntryToDelete(null);
  };

  // Handle loading state
  if (isLoading) {
    return (
      <Card className="h-full">
        <CardHeader>
          <CardTitle className="text-2xl font-bold tracking-tight">
            Daily Entries
          </CardTitle>
        </CardHeader>
        <CardContent className="flex animate-pulse items-center justify-center p-8">
          <span className="text-muted-foreground ml-3">
            Loading work sheet entries...
          </span>
        </CardContent>
      </Card>
    );
  }

  // Handle error state
  if (isError) {
    return (
      <Card className="h-full">
        <CardHeader>
          <CardTitle className="text-2xl font-bold tracking-tight">
            Daily Entries
          </CardTitle>
        </CardHeader>
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
    );
  }

  // Handle empty state
  if (worksheetEntries.length === 0) {
    return (
      <Card className="h-full">
        <CardHeader>
          <CardTitle className="text-2xl font-bold tracking-tight">
            Daily Entries
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center p-8">
          <div className="text-center">
            <h3 className="mb-2 text-lg font-semibold">No entries yet</h3>
            <p className="text-muted-foreground">
              Start tracking your work by adding your first task entry.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl font-bold tracking-tight">
            Daily Entries
          </CardTitle>
          <Badge variant="secondary">
            {worksheetEntries.length}{" "}
            {worksheetEntries.length === 1 ? "entry" : "entries"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
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
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <div>
                              <CardTitle className="flex items-center gap-2 text-base">
                                {entry.selectedTask}
                                {isOptimistic && (
                                  <div className="h-2 w-2 animate-pulse rounded-full bg-blue-500" />
                                )}
                              </CardTitle>
                            </div>
                            {!isOptimistic && (
                              <div className="flex items-center gap-1">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-8 w-8 hover:bg-blue-50"
                                  onClick={() => handleEdit(entry)}
                                >
                                  <EditIcon className="h-4 w-4" />
                                  <span className="sr-only">Edit entry</span>
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-8 w-8 hover:bg-red-50"
                                  onClick={() =>
                                    handleDelete(entry._id, entry.selectedTask)
                                  }
                                >
                                  <Trash2Icon className="h-4 w-4 text-red-600" />
                                  <span className="sr-only">Delete entry</span>
                                </Button>
                              </div>
                            )}
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="mb-2 flex items-center gap-2">
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
                            >
                              {calculateDuration(
                                entry.startTime,
                                entry.completionTime,
                              )}
                            </Badge>
                          </div>
                          <div className="text-muted-foreground flex items-center justify-between text-sm">
                            <div className="flex items-center gap-4 text-xs">
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
      </CardContent>

      <EditTaskModal
        isOpen={editModalOpen}
        onClose={handleCloseEditModal}
        entry={selectedEntry}
      />

      <ConfirmDeleteModal
        isOpen={deleteModalOpen}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDelete}
        isLoading={isDeleting}
        taskName={entryToDelete?.taskName}
      />
    </Card>
  );
}
