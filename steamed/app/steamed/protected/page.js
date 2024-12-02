"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
const DealsList = dynamic(() => import("../components/dealslist"), { ssr: false });
import { useUserAuth } from "../_utils/auth_context";
import Link from "next/link";
import { firebaseSignOut } from "../_utils/firebase";
export default function ProtectedPage() {
    const {user, firebaseSignOut} = useUserAuth();

    async function handleSignOut() {
      try {
          await firebaseSignOut();
      } catch (error) {
          console.log(error);
      }
  }


  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <div className="container mx-auto py-8">
        <header>
          <h1 className="text-5xl font-bold mb-6 text-center">Welcome to Steamed</h1>
        </header>
        {user ? (
          <div>
            <button 
              type="button" 
              className="text-lg bg-blue-600 text-white rounded px-4 py-2 mt-4 hover:bg-blue-700 transition duration-300"
              onClick={handleSignOut}
              >Sign Out</button>
            <DealsList />
          </div>
        ) : (
          <div>
            <p className="text-lg mb-4">Please sign in to view the deals</p>
            <Link href="/steamed/">Click here to return to sign in page</Link>
          </div>
        )}
      </div>
    </div>
  );
}
