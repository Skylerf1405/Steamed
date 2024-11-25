"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
const DealsList = dynamic(() => import("./dealslist"), { ssr: false });
export default function Home() {

  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <div className="container mx-auto py-8">
        <h1 className="text-4xl font-bold mb-6">Welcome to the Game Deals Page</h1>
        <DealsList />
      </div>
    </div>
  );
}
