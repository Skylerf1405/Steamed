"use client"; // Make sure this is only rendered on the client

import React, { useState, useEffect } from 'react';

const DealsList = () => {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        const response = await fetch("https://www.cheapshark.com/api/1.0/deals?pageSize=10");
        if (!response.ok) throw new Error('Failed to fetch data');
        const data = await response.json();
        setDeals(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDeals();
  }, []);

  if (loading) return <p>Loading deals...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Game Deals</h1>
      <div className="flex flex-wrap gap-4">
        {deals.map((deal) => (
          <div key={deal.dealID} className="bg-gray-800 text-white rounded-lg p-4 w-72 shadow-lg">
            <h3 className="text-xl font-semibold mb-2">{deal.title}</h3>
            <img src={deal.thumb} alt={deal.title} className="w-full rounded mb-2 border-4 border-white" />
            <p className="mb-1">Normal Price: ${deal.normalPrice}</p>
            <p className="mb-1">Sale Price: ${deal.salePrice}</p>
            <p className="mb-2">Discount: {deal.savings}%</p>
            <a href={`https://www.cheapshark.com/redirect?dealID=${deal.dealID}`} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
              View Deal
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DealsList;