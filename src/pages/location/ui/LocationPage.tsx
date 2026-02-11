import { Link, useParams } from "react-router-dom";

export default function LocationPage() {
      const { id } = useParams<{ id: string }>();
  return (
    <div className="min-h-screen p-6">
      <h1 className="text-2xl font-bold">Location Detail</h1>

      <p className="mt-2 text-gray-600">location id: {id}</p>

      <Link
        to="/"
        className="mt-6 inline-block rounded-lg border px-4 py-2 hover:bg-gray-50"
      >
        ← 홈으로
      </Link>
    </div>
  )
}
