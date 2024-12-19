import React from 'react';
import { Link } from 'react-router-dom';


function HowItWorks() {
  return (
    <section className="how-it-works py-16 text-center" style={{ backgroundImage: `url('/background2.jpg')` }}>
      <h2 className="text-4xl font-bold">How It Works</h2>
      <div className="mt-8 flex flex-wrap justify-center gap-8">
        <div className="max-w-xs">
          <img src="/box3.jpg" alt="Subscribe" className="mx-auto rounded-lg shadow-lg hover:transform hover:scale-110 hover:brightness-110 transition duration-300 ease-in-out"/>
          <h3 className="text-2xl font-semibold mt-4">Subscribe</h3>
          <p className="mt-2">Choose your plan and subscribe.</p>
        </div>
        <div className="max-w-xs">
          <img src="/box2.jpg" alt="We Curate" className="mx-auto rounded-lg shadow-lg hover:transform hover:scale-110 hover:brightness-110 transition duration-300 ease-in-out"/>
          <h3 className="text-2xl font-semibold mt-4">We Curate</h3>
          <p className="mt-2">We curate the best snacks.</p>
        </div>
        <div className="max-w-xs">
          <img src="/enjoy1.jpg" alt="Enjoy" className="mx-auto rounded-lg shadow-lg hover:transform hover:scale-110 hover:brightness-110 transition duration-300 ease-in-out"/>
          <h3 className="text-2xl font-semibold mt-4">Enjoy</h3>
          <p className="mt-2">Enjoy your snacks delivered to your door.</p>
        </div>
      </div>
      <div>
        <Link to="/subscribe">
          <button className="mt-6 bg-red-500 text-4xl py-3 px-6 rounded-full text-lg hover:bg-red-400">Subscribe Now</button>
        </Link>
      </div>
    </section>
  );
}

export default HowItWorks;