import Image from "next/image";
import Link from "next/link";
export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center h-screen text-center">
    <h1 className="text-2xl font-bold">Check for signup, login, signin</h1>
    <Link href="/signup">
      <button className="mt-4 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        Click me
      </button>
    </Link>
  </div>  
  );
}
