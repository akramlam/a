"use client";
import { useState, useEffect } from 'react';
import Image from 'next/image'; // Import the Image component from next/image

const VulnerabilityDatabases = () => {
  const [catalogData, setCatalogData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [expandedItem, setExpandedItem] = useState(null); // To track which item is expanded
  const [currentPage, setCurrentPage] = useState(1); // Pagination state
  const itemsPerPage = 8; // Display 8 items per page

  // Function to fetch data from the backend
  useEffect(() => {
    const fetchThreat = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:3002/attack-vectors");
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
    if (indexOfLastItem < catalogData.length) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => (prevPage > 1 ? prevPage - 1 : 1));
  };

  const NavigationBar = () => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (e) => {
      e.preventDefault();

      // Define search terms and corresponding page URLs
      const searchRoutes = {
        "attack vectors": "/attackvectors",
        "security trends": "/securitytrends",
        "vulnerability database": "/vulnerabilitydatabase",
        "threat intelligence": "/threatintelligence",
        "incident reports": "/incidentreports"
      };

      const formattedQuery = searchQuery.toLowerCase();

      // Check if the query matches any predefined routes
      if (searchRoutes[formattedQuery]) {
        window.location.href = searchRoutes[formattedQuery]; // Redirect to the corresponding page
      } else {
        alert('No matching page found');
      }
    };

    return (
      <nav className="flex items-center space-x-4">
        <a href="http://localhost:3002/api-docs#/" className="mx-2 hover:text-gray-400">API Doc</a>
        <a href="/aboutus" className="mx-2 hover:text-gray-400">About Us</a>
        <form onSubmit={handleSearch} className="ml-4">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="p-1 rounded-md text-black"
          />
          <button type="submit" className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-1 px-3 ml-2 rounded">
            Search
          </button>
        </form>
      </nav>
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
        {/* Logo Image */}
        <div className="flex items-center space-x-4">
          <Image
            src="/logocy.jpg" // Ensure that 'logocy.jpg' is in your public folder
            width={48}
            height={48}
            alt="Open Data Portal"
            className="cursor-pointer"
          />
          <div className="text-lg font-bold">Open Data Portal</div>
        </div>

        {/* Navigation Bar */}
        <NavigationBar />
      </header>

      <main className="flex-1 p-4">
        {loading && <p>Loading data...</p>}

        <h1 className="text-2xl font-bold text-center mt-4">Attack Vectors</h1>

        <div className="grid grid-cols-4 gap-4 mt-8">
          {catalogData.length === 0 && !loading ? (
            <p>No data available</p>
          ) : (
            currentItems.map((dataset) => (
              <div key={dataset._id} className="border rounded-lg shadow-lg p-4 text-center">
                <h2 className="text-xl font-bold text-gray-700">{dataset.title || dataset.vectorName}</h2>
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
                      <li><strong>Vector Id :</strong> {dataset.vectorId}</li>
                      <li><strong>External Id :</strong> {dataset.externalId}</li>
                      <li><strong>Title :</strong> {dataset.title}</li>
                      <li><strong>Description :</strong> {dataset.description}</li>
                      <li><strong>Severity :</strong> {dataset.severity}</li>
                      <li><strong>Examples :</strong> {dataset.examples || dataset.mitigation}</li>
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
