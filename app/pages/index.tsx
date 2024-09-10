// pages/index.tsx
import React from 'react';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
        <div className="text-lg font-bold">Logo</div>
        <nav>
          <a href="#" className="mx-2">Data Visualization Doc</a>
          <a href="#" className="mx-2">API</a>
          <a href="#" className="mx-2">About Us</a>
          <input type="text" placeholder="Search..." className="ml-4 p-1" />
        </nav>
      </header>
      
      <div className="flex flex-1">
        <aside className="w-1/4 bg-gray-200 p-4">
          <h2 className="font-bold mb-4">Categories</h2>
          <ul>
            <li className="mb-2">Category 1</li>
            <li className="mb-2">Category 2</li>
            <li className="mb-2">Category 3</li>
          </ul>
        </aside>
        
        <main className="flex-1 p-4">
          <section className="mb-4">
            <h1 className="text-2xl font-bold">Overview</h1>
            <p>Chart representing purpose and mission</p>
          </section>
        </main>
      </div>
      
      <footer className="bg-gray-800 text-white p-4 text-center">
        Footer Content
      </footer>
    </div>
  );
};

export default Home;
