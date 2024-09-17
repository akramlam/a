"use client";
import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const Home: React.FC = () => {
  const [vulnerabilities, setVulnerabilities] = useState([]);
  const [threats, setThreats] = useState([]);
  const [trends, setTrends] = useState([]);
  const [incidentReports, setIncidentReports] = useState([]);
  const [attackVectors, setAttackVectors] = useState([]);
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

  useEffect(() => {
    async function fetchData(endpoint, setData) {
      try {
        const response = await fetch(`http://localhost:3002/${endpoint}`);
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.error(`Error fetching ${endpoint}:`, error);
      }
    }

    fetchData("vulnerability-databases", setVulnerabilities);
    fetchData("threat-intelligence", setThreats);
    fetchData("security-trends", setTrends);
    fetchData("incident-reports", setIncidentReports);
    fetchData("attack-vectors", setAttackVectors);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-gray-800 text-white p-4 flex justify-between items-center shadow-md">
        <Image
          src="/logocy.jpg"
          width={48}
          height={48}
          alt="Open Data Portal"
          className="cursor-pointer"
        />
        <div className="text-lg font-bold justify-border">Open Data Portal</div>
        <nav className="flex items-center space-x-4">
          <a
            href="http://localhost:3002/api-docs#/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-300"
          >
            API Doc
          </a>
          <a href="#" className="hover:text-gray-300">
            About Us
          </a>
          <form onSubmit={handleSearch} className="ml-4">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="p-1 rounded-md text-black"
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-1 px-3 ml-2 rounded"
            >
              Search
            </button>
          </form>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-8 space-y-8">
        <section>
          <div className="border rounded-lg shadow-lg p-6 bg-white">
            <h1 className="text-3xl font-bold mb-4 text-gray-800 text-center">Overview</h1>
            <p className="text-lg font-serif text-gray-600">
              Our open data portal provides access to a wide range of datasets, enabling users to
              explore, analyze, and leverage data for research, development, and decision-making. Our
              mission is to foster transparency, innovation, and collaboration by offering
              comprehensive, up-to-date information across various sectors.
            </p>
          </div>
        </section>

        {/* Data Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 justify-center">
          <Card
            title="Attack Vectors"
            imageSrc="/hacker.png"
            count={attackVectors.length}
            link="/attackvectors"
          />
          <Card
            title="Incident Reports"
            imageSrc="/computer-security.png"
            count={incidentReports.length}
            link="/incidentreports"
          />
          <Card
            title="Security Trends"
            imageSrc="/data-security.png"
            count={trends.length}
            link="/securitytrends"
          />
          <Card
            title="Threat Intelligence"
            imageSrc="/cyber-threat.png"
            count={threats.length}
            link="/threatintelligence"
          />
          <Card
            title="Vulnerabilities"
            imageSrc="/security.png"
            count={vulnerabilities.length}
            link="/vulnerabilitydatabases"
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white p-6 text-center">
        <p>© {new Date().getFullYear()} Open Data Portal | Privacy Policy | Terms of Service</p>
      </footer>
    </div>
  );
};

// Card Component for Reusability
const Card = ({ title, imageSrc, count, link }) => (
  <a
    href={link}
    className="border rounded-lg shadow-lg p-6 bg-white hover:bg-gray-100 transition-all transform hover:scale-95 duration-300 ease-in-out"
  >
    <div className="flex flex-col items-center">
      <Image src={imageSrc} width={100} height={48} alt={title} className="mb-4" />
      <h2 className="text-xl font-bold text-gray-700">{title}</h2>
      <p className="text-lg text-slate-950 mt-2">{count} data</p>
    </div>
  </a>
);

export default Home;
