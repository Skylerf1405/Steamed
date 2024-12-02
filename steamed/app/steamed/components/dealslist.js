"use client";

import React, { useState, useEffect } from 'react';

const DealsList = () => {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("Deal Rating");
  const [currentPageNo, setCurrentPageNo] = useState(1);

  const handleSortChange = (event) => { 
    setSortBy(event.target.value);      
    setCurrentPageNo(1);
  };

  const handleNextPage = (event) => {
    setCurrentPageNo(currentPageNo + 1);
  };
  const handlePreviousPage = (event) => {
    setCurrentPageNo(currentPageNo - 1);
  };
  useEffect(() => {
    const fetchDeals = async () => {

      try {
        const response = await fetch(`https://www.cheapshark.com/api/1.0/deals?sortBy=${sortBy}&pageNumber=${currentPageNo}`); 
        
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
    console.log('page num: ', currentPageNo)
  }, [sortBy, currentPageNo]);

  const filteredDeals = deals.filter(
    (deal) => deal.title.toLowerCase().includes(searchQuery.toLowerCase())
);



  if (loading) return <p>Loading deals...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">Game Deals</h1>
      <div className="flex flex-col md:flex-row mb-4 gap-4">
        <input
          type="text"
          placeholder="Search deals..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-grow p-2 text-3xl rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="flex-shrink-0">
          <label className="block text-white mb-2">Sort By</label>
          <select
            value={sortBy}
            onChange={handleSortChange}
            className="w-full p-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Deal Rating">Deal Rating</option>
            <option value="Title">Title</option>
            <option value="Savings">Savings</option>
            <option value="Price">Price</option>
            <option value="Metacritic">Metacritic</option>
            <option value="Reviews">Reviews</option>
            <option value="Release">Release</option>
            <option value="Store">Store</option>
            <option value="Recent">Recent</option>
          </select>
        </div>
      </div>
      <div className="flex justify-between mb-4">
        <button
          onClick={handlePreviousPage}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Previous Page
        </button>
        <button
          onClick={handleNextPage}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Next Page
        </button>
      </div>
      <div className="flex flex-wrap gap-4">
        {filteredDeals.map((deal) => (
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
      <div className="flex justify-between mt-4">
        <button
          onClick={handlePreviousPage}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Previous Page
        </button>
        <button
          onClick={handleNextPage}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Next Page
        </button>
      </div>
    </div>
  );
};

export default DealsList;