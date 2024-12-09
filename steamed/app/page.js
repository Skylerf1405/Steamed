import Link from "next/link";


export default function Page() {

    return (
        <main className="bg-gray-800 flex flex-col items-center justify-center min-h-screen ">
            <div className="w-full py-5 bg-blue-800 text-center shadow-lg fixed top-96">
                <h1 className="text-4xl font-bold mb-1 text-center text-white ">Welcome to Steamed</h1>
            </div>
            <div className="bg-blue-700 text-white py-2 px-4 rounded hover:bg-blue-800 text-3xl">
                <Link href="/steamed/">
                        Sign In
                </Link>
            </div>
        </main>
    );
}