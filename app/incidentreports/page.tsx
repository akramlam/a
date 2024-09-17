"use client";
import { useState, useEffect } from "react";
import Image from 'next/image'; // Ensure Image is properly imported

const VulnerabilityDatabases = () => {
  const [catalogData, setCatalogData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [expandedItem, setExpandedItem] = useState(null); // To track which item is expanded
  const [currentPage, setCurrentPage] = useState(1); // Pagination state
  const itemsPerPage = 8; // Display 8 items per page
  const [searchQuery, setSearchQuery] = useState(""); // Search bar state

  // Function to fetch data from the backend
  useEffect(() => {
    const fetchThreat = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:3002/incident-reports");
        const data = await response.json();
        setCatalogData(data);
      } catch (error) {
        console.error("Error fetching catalog data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchThreat(); // Automatically fetch data on component load
  }, []);

  const toggleDropdown = (id) => {
    setExpandedItem(expandedItem === id ? null : id);
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = catalogData.slice(indexOfFirstItem, indexOfLastItem);

  const nextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => (prevPage > 1 ? prevPage - 1 : 1));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Filter the catalog data based on the search query
    const filteredData = catalogData.filter((item) =>
      item.title?.toLowerCase().includes(searchQuery.toLowerCase()) || 
      item.incidentType?.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setCatalogData(filteredData);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <Image
            src="/logocy.jpg" // Ensure that 'logocy.jpg' is in your public folder
            width={48}
            height={48}
            alt="Logo"
            className="mr-2"
          />
          <div className="text-lg font-bold">Open Data Portal</div>
        </div>

        {/* Navigation Bar */}
        <nav className="flex items-center space-x-4">
          <a href="http://localhost:3002/api-docs#/" className="hover:text-gray-400">API Doc</a>
          <a href="#" className="hover:text-gray-400">About Us</a>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex items-center">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="ml-4 p-1 rounded-md text-black"
            />
            <button type="submit" className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-1 px-3 ml-2 rounded">
              Search
            </button>
          </form>
        </nav>
      </header>

      <main className="flex-1 p-4">
        {loading && <p>Loading data...</p>}

        <h1 className="text-2xl font-bold text-center mt-4">Incident Reports</h1>

        <div className="grid grid-cols-4 gap-4 mt-8">
          {currentItems.length === 0 && !loading ? (
            <p>No data available</p>
          ) : (
            currentItems.map((dataset) => (
              <div key={dataset._id} className="border rounded-lg shadow-lg p-4 text-center">
                <h2 className="text-xl font-bold text-gray-700">{dataset.title || dataset.incidentType}</h2>
                <p className="text-gray-500">{dataset.description}</p>
                <button
                  onClick={() => toggleDropdown(dataset._id)}
                  className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-1 px-3 mt-2 rounded"
                >
                  {expandedItem === dataset._id ? "Hide Details" : "Show Details"}
                </button>
                {expandedItem === dataset._id && (
                  <div className="mt-4 text-left bg-black-100 p-4 rounded">
                    <h3 className="text-lg font-semibold">Details:</h3>
                    <ul className="list-disc list-inside">
                      <li><strong>ID :</strong> {dataset._id}</li>
                      <li><strong>Incident Type :</strong> {dataset.incidentType}</li>
                      <li><strong>Description :</strong> {dataset.description}</li>
                      <li><strong>Date Occurred :</strong> {dataset.dateOccurred || dataset.reportedDate}</li>
                      <li><strong>Impact :</strong> {dataset.impact || dataset.severity}</li>
                      <li><strong>Response :</strong> {dataset.response || dataset.responseActions}</li>
                    </ul>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center mt-4">
          <button
            onClick={prevPage}
            className="bg-gray-600 hover:bg-gray-500 text-white font-bold py-1 px-3 mx-2 rounded"
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <button
            onClick={nextPage}
            className="bg-gray-600 hover:bg-gray-500 text-white font-bold py-1 px-3 mx-2 rounded"
            disabled={indexOfLastItem >= catalogData.length}
          >
            Next
          </button>
        </div>
      </main>

      <footer className="bg-gray-800 text-white p-6 text-center">
        <p>© {new Date().getFullYear()} Open Data Portal | Privacy Policy | Terms of Service</p>
      </footer>
    </div>
  );
};

export default VulnerabilityDatabases;
