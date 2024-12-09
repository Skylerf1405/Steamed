"use client";

import { doc, getDoc, query, collection, where, getDocs } from "firebase/firestore";
import { auth, db } from "../_utils/firebase";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import Link from "next/link";

export default function Wishlist() {
    const [wishlist, setWishlist] = useState([]);
    const [user, setUser] = useState(null); 
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
        // Monitor user authentication state
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
          console.log("Current user:", currentUser); 
          setUser(currentUser);
          setLoading(false);
        });
      
        return () => unsubscribe(); 
      }, []);
  
      useEffect(() => {
        const fetchWishlist = async () => {
          if (!user) {
            console.log("No user signed in.");
            return;
          }
      
          try {
            const wishlistRef = doc(db, "wishlists", user.uid); 
            const docSnap = await getDoc(wishlistRef);
      
            if (docSnap.exists()) {
              setWishlist(docSnap.data().deals || []); 
            } else {
              console.log("No wishlist found for user.");
              setWishlist([]); 
            }
          } catch (error) {
            console.error("Error fetching wishlist:", error.code, error.message);
          }
        };
      
        fetchWishlist();
      }, [user]);
      
  
    if (loading) return <p>Loading...</p>;
  
    if (!user) return <p>Please sign in to view your wishlist.</p>;
  
  return (
    <div className="bg-gray-900 min-h-screen">
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4 text-center text-white">Your Wishlist</h1>
        <Link
            href="/steamed/protected/"
            className="block text-blue-500 hover:underline mb-2"
        >
            View Deals
        </Link>
        {wishlist.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {wishlist.map((deal, index) => (
              <div
                key={index}
                className="bg-gray-800 text-white rounded-lg p-4 shadow-lg"
              >
                
                <h3 className="text-xl font-semibold mb-2">{deal.title}</h3>
                <p className="mb-1">Price: ${deal.salePrice}</p>
                <a href={`https://www.cheapshark.com/redirect?dealID=${deal.dealID}`} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                View Deal
                </a>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-400">Your wishlist is empty.</p>
        )}
      </div>
    </div>
  );
}
