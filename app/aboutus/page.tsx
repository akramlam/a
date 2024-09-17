"use client";
import Image from 'next/image';

const AboutUs = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-gray-900 text-white p-5 flex justify-between items-center shadow-lg">
        <div className="flex items-center space-x-3">
          <Image
            src="/logocy.jpg" // Ensure that 'logocy.jpg' is in your public folder
            width={48}
            height={48}
            alt="Logo"
            className="rounded-full"
          />
          <div className="text-2xl font-bold tracking-wide">Open Data Portal</div>
        </div>

        {/* Navigation Bar */}
        <nav className="flex items-center space-x-6 text-lg">
          <a href="/" className="hover:text-gray-400 transition duration-200 ease-in-out">Home</a>
          <a href="http://localhost:3002/api-docs#/" className="hover:text-gray-400 transition duration-200 ease-in-out">API Doc</a>
          <a href="#" className="hover:text-gray-400 transition duration-200 ease-in-out">About Us</a>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-8">
        <section className="max-w-5xl mx-auto bg-white p-10 rounded-lg shadow-lg transform hover:scale-105 transition duration-300 ease-in-out">
          <h1 className="text-4xl font-extrabold mb-6 text-gray-800 text-center tracking-tight leading-tight">About Us</h1>
          <p className="text-lg text-gray-600 leading-relaxed mb-6 text-justify">
            We are a dedicated team committed to making data accessible to everyone. Our platform serves as a centralized hub for open data, ensuring that critical information is freely available to researchers, organizations, and the general public.
          </p>
          <p className="text-lg text-gray-600 leading-relaxed mb-6 text-justify">
            With a focus on quality, transparency, and collaboration, we strive to empower individuals and communities with the resources they need to harness the power of data for meaningful impact. Through continuous updates and improvements, we aim to support informed decision-making and drive innovation across industries.
          </p>
          <div className="flex justify-center mt-8">
            <a href="/" className="bg-blue-600 text-white py-2 px-6 rounded-full shadow-md hover:bg-blue-700 transition duration-300 ease-in-out text-lg font-semibold">Get Started</a>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white p-6 text-center mt-auto shadow-inner">
        <p className="text-sm tracking-wide">
          © {new Date().getFullYear()} Open Data Portal | <a href="#" className="hover:text-blue-500 transition duration-200">Privacy Policy</a> | <a href="#" className="hover:text-blue-500 transition duration-200">Terms of Service</a>
        </p>
      </footer>
    </div>
  );
};

export default AboutUs;
