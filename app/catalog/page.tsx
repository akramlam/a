"use client";
import { useState } from "react";

const Catalog = () => {
  const [catalogData, setCatalogData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [expandedItem, setExpandedItem] = useState(null); // To track which item is expanded

  // Function to fetch data from the backend
  const fetchThreat = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3002/vulnerability-databases");
      const data = await response.json();
      setCatalogData(data);
    } catch (error) {
      console.error("Error fetching catalog data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Toggle dropdown
  const toggleDropdown = (id) => {
    setExpandedItem(expandedItem === id ? null : id);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
        <div className="text-lg font-bold">Logo</div>
        <nav className="flex items-center">
          <a href="#" className="mx-2 hover:text-gray-400">Dataset Catalog</a>
          <a href="#" className="mx-2 hover:text-gray-400">Data Visualization</a>
          <a href="http://localhost:3002/api-docs#/" className="mx-2 hover:text-gray-400">API Doc</a>
          <a href="#" className="mx-2 hover:text-gray-400">About Us</a>
          <input type="text" placeholder="Search..." className="ml-4 p-1 rounded-md text-black" />
        </nav>
      </header>

      <main className="flex-1 p-4">
        <section className="mb-4">
          <div className="border rounded-lg shadow-lg p-4 bg-dark">
            <h1 className="text-2xl font-bold mb-4">Overview</h1>
            <p>Text representing purpose and mission</p>
          </div>
        </section>

        {/* Button to fetch data */}
        <button
          onClick={fetchThreat}
          className="bg-green-600 hover:bg-green-500 text-white font-bold py-2 px-4 rounded"
        >
          View Data Catalog
        </button>

        {loading && <p>Loading data...</p>}

        <div className="grid grid-cols-4 gap-4 mt-8">
          {catalogData.length === 0 && !loading ? (
            <p>No data available</p>
          ) : (
            catalogData.map((dataset) => (
              <div key={dataset._id} className="border rounded-lg shadow-lg p-4">
                <div className="text-center">
                  <h2 className="text-xl font-bold text-gray-700">{dataset.title}</h2>
                  <p className="text-gray-500">{dataset.description}</p>
                  <button
                    onClick={() => toggleDropdown(dataset._id)}
                    className="bg-blue-600 hover:bg-blue-500 text-black font-bold py-1 px-3 mt-2 rounded"
                  >
                    {expandedItem === dataset._id ? "Hide Details" : "Show Details"}
                  </button>
                </div>
                {expandedItem === dataset._id && (
                  <div className="mt-4 text-left bg-gray-100 p-4 rounded">
                    <h3 className="text-lg font-semibold">Details:</h3>
                    <ul className="list-disc list-inside">
                      <li><strong>ID:</strong> {dataset._id}</li>
                      <li><strong>Created At:</strong> {dataset.createdAt}</li>
                      <li><strong>Updated At:</strong> {dataset.updatedAt}</li>
                      {/* Add more fields as needed */}
                      {/* Example: */}
                      {/* <li><strong>Owner:</strong> {dataset.owner}</li> */}
                    </ul>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </main>

      <footer className="bg-gray-800 text-white p-4 text-center">Footer Content</footer>
    </div>
  );
};

export default Catalog;
