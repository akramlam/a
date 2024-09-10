"use client";
import React, { useEffect, useState } from 'react';

const Home: React.FC = () => {
  const [vulnerabilities, setVulnerabilities] = useState([]);
  const [threats, setThreats] = useState([]);
  const [trends, setTrends] = useState([]);

  useEffect(() => {
    async function fetchVulnerabilities() {
      try {
        const response = await fetch('http://localhost:3002/vulnerability-databases');
        const data = await response.json();
        setVulnerabilities(data);
      } catch (error) {
        console.error('Error fetching vulnerabilities:', error);
      }
    }

    async function fetchThreats() {
      try {
        const response = await fetch('http://localhost:3002/threat-intelligence');
        const data = await response.json();
        setThreats(data);
      } catch (error) {
        console.error('Error fetching threat intelligence data:', error);
      }
    }

      async function fetchSecurityTrends() {
        try {
          const response = await fetch('http://localhost:3002/security-trends');
          const data = await response.json();
          setTrends(data);
        } catch (error) {
          console.error('Error fetching security trends:', error);
        }
      }
  
    fetchSecurityTrends();
    fetchVulnerabilities();
    fetchThreats();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
        <div className="text-lg font-bold">Logo</div>
        <nav className="flex items-center">
          <a href="#" className="mx-2 hover:text-gray-400">Dataset Catalog</a>
          <a href="#" className="mx-2 hover:text-gray-400">Data Visualization</a>
          <a href="#" className="mx-2 hover:text-gray-400">API Doc</a>
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
        
        <h1 className="text-2xl font-bold mb-4">Vulnerabilities</h1>
        <ul className="flex flex-col space-y-4">
          {vulnerabilities.map((vuln) => (
            <li key={vuln.cveId} className="border rounded-lg shadow-lg p-4">
              <h2 className="text-xl font-bold">{vuln.cveId}</h2>
              <p>{vuln.description}</p>
            </li>
          ))}
        </ul>

        <h1 className="text-2xl font-bold mb-4">Threat Intelligence Records</h1>
        <ul className="flex flex-col space-y-4">
          {threats.map((threat) => (
            <li key={threat.threatId} className="border rounded-lg shadow-lg p-4">
              <h2 className="text-xl font-bold">{threat.threatId}</h2>
              <p>{threat.description}</p>
              <p>{threat.severity}</p>
            </li>
          ))}
        </ul>

        <h1 className="text-2xl font-bold mb-4">security trends Records</h1>
        <ul className="flex flex-col space-y-4">
          {trends.map((trends) => (
            <li key={trends.trendsId} className="border rounded-lg shadow-lg p-4">
              <h2 className="text-xl font-bold">{trends.trendsId}</h2>
              <p>{trends.description}</p>
              <p>{trends.severity}</p>
            </li>
          ))}
        </ul>
      </main>
      
      <footer className="bg-gray-800 text-white p-4 text-center">
        Footer Content
      </footer>
    </div>
  );
};

export default Home;
