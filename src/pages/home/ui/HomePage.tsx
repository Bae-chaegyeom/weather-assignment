import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchTestTodo } from "../../../shared/api/test";

export default function HomePage() {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["testTodo"],
    queryFn: fetchTestTodo,
  });

  return (
    <div className="min-h-screen p-6">
      <h1 className="text-2xl font-bold">Home</h1>

      <div className="mt-6 rounded-xl border p-4">
        <div className="font-semibold">TanStack Query 테스트</div>

        {isLoading && <p className="mt-2">Loading...</p>}
        {isError && <p className="mt-2 text-red-600">Error: {String(error)}</p>}
        {data && (
          <p className="mt-2">
            #{data.id} / {data.title} / {data.completed ? "done" : "todo"}
          </p>
        )}

        <button
          className="mt-4 rounded-lg bg-blue-600 px-3 py-2 text-white"
          onClick={() => refetch()}
        >
          Refetch
        </button>
      </div>
    </div>
  );
}