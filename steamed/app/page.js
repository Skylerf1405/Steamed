import Link from "next/link";


export default function Page() {

    return (
        <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-4xl font-bold mb-4">Welcome to Steamed</h1>
            <Link className="text-blue-500 hover:underline" href="/steamed/">
                Sign In
            </Link>
        </main>
    );
}