import { useGetWorkSheetEntriesQuery } from "@/store/workSheetApi";

export default function DailyEntries() {
  const {
    data: worksheetEntries = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useGetWorkSheetEntriesQuery();

  // Handle loading state
  // Show a loading spinner while the initial data is being fetched
  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="h-12 w-12 animate-pulse rounded-full border-b-2 border-blue-500"></div>
        <span className="ml-3 text-gray-600">
          Loading work sheet entries...
        </span>
      </div>
    );
  }

  // Handle error state
  // Show an error message if the initial data fetch failed
  if (isError) {
    return (
      <div className="p-8 text-center">
        <div className="mb-4 text-red-600">
          <h3 className="text-lg font-semibold">Error Loading Data</h3>
        </div>
        <button
          onClick={refetch}
          className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          Try Again
        </button>
      </div>
    );
  }
  return <div>DailyEntries</div>;
}
