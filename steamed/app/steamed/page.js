"use client";

import Link from "next/link";
import { useUserAuth } from "./_utils/auth_context";

export default function SignInPage() {
  const { user, gitHubSignIn, firebaseSignOut } = useUserAuth();

  async function handleSignIn() {
    try {
      await gitHubSignIn();
    } catch (error) {
      console.log(error);
    }
  }

  async function handleSignOut() {
    try {
      await firebaseSignOut();
    } catch (error) {
      console.log(error);
    }
  }

return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white pb-6">
        <header className="w-full py-6 bg-blue-800 text-center shadow-lg fixed top-0 ">
            <h1 className="text-4xl font-bold">Steamed Sign In</h1>
        </header>
        <div className="w-full max-w-md p-6 bg-gray-800 rounded-lg shadow-md mt-24">
            {user ? (
                <div className="text-center">
                    <p className="mb-4 text-2xl font-semibold">Welcome</p>
                    <button
                        type="button"
                        className="w-full px-4 py-2 mb-4 text-lg font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onClick={handleSignOut}
                    >
                        Sign Out
                    </button>
                    <Link
                        href="/steamed/protected/"
                        className="block text-blue-500 hover:underline mb-2"
                    >
                        View Deals
                    </Link>
                    <p className="text-blue-500 hover:underline cursor-pointer">
                        View Wish List
                    </p>
                </div>
            ) : (
                <div className="text-center">
                    <button
                        type="button"
                        className="w-full px-4 py-2 text-lg font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onClick={handleSignIn}
                    >
                        Sign In with GitHub
                    </button>
                </div>
            )}
        </div>
    </main>
);
}
