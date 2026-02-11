import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="min-h-screen p-6">
      <h1 className="text-2xl font-bold">Home</h1>

      <p className="mt-2 text-gray-600">
        여기에 현재 위치 날씨 / 검색 / 즐겨찾기 들어갈 예정
      </p>

      <Link
        to="/location/seoul"
        className="mt-6 inline-block rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-500"
      >
        서울 상세로 이동(테스트)
      </Link>
    </div>
  )
}
