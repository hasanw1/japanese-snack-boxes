import React from 'react';
import { Link } from 'react-router-dom';

function MainBanner() {
  return (
    <section className="bg-cover bg-center h-screen flex items-center justify-center text-center text-white" style={{ backgroundImage: `url('/banner.jpg')` }}>
      <div className="bg-black bg-opacity-50 p-8 rounded-lg">
        <h1 className="text-5xl font-bold">Welcome to Authentic Japanese Food</h1>
        <p className="mt-4 text-xl">Discover the best Japanese snacks and treats delivered to your door.</p>
        <Link to="/subscribe">
          <button className="mt-6 bg-red-500 text-4xl py-3 px-6 rounded-full text-lg hover:bg-red-400">Subscribe</button>
        </Link>
      </div>
    </section>
  );
}

export default MainBanner;

