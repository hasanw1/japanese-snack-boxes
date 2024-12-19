import React from 'react';

function AboutUsPage() {
  return (
    <section className="about-us-page">
      <div className="hero-section flex flex-col justify-center items-center text-white text-center">
        <h1 className="text-5xl font-bold mb-4">About Japanese Snacks</h1>
        <p className="text-2xl mb-8">Bringing the Best of Japan to Your Doorstep</p>
      </div>

      <div className="container mx-auto p-8">
        <div className="mission-section text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Our Mission</h2>
          <p className="text-xl text-gray-700">
            <div>At Japanese Snacks, we are dedicated to delivering the finest</div> 
            <div>and most authentic Japanese snacks right to your door.</div>
            <div>Our goal is to bring a piece of Japan to your home,</div> 
            <div>allowing you to experience the rich culture</div>
            <div>and flavors of Japan with every bite.</div>
          </p>
        </div>

        <div className="team-section text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Meet the Team</h2>
          <div className="flex justify-center items-center space-x-8">
            <div className="team-member text-center">
              <img src="https://via.placeholder.com/150" alt="Team Member" className="w-32 h-32 rounded-full mx-auto mb-4" />
              <h3 className="text-xl font-semibold">Hassan Wehbi</h3>
              <p className="text-gray-700">Founder</p>
            </div>
          </div>
        </div>

        <div className="contact-section text-center">
          <h2 className="text-4xl font-bold mb-4">Contact Us</h2>
          <p className="text-xl text-gray-700 mb-4">We'd love to hear from you!</p>
          <form className="w-full max-w-lg mx-auto">
            <div className="mb-4">
              <input
                type="text"
                className="w-full p-4 border rounded-lg shadow-sm focus:ring focus:ring-blue-500"
                placeholder="Your Name"
                required
              />
            </div>
            <div className="mb-4">
              <input
                type="email"
                className="w-full p-4 border rounded-lg shadow-sm focus:ring focus:ring-blue-500"
                placeholder="Your Email"
                required
              />
            </div>
            <div className="mb-4">
              <textarea
                className="w-full p-4 border rounded-lg shadow-sm focus:ring focus:ring-blue-500"
                placeholder="Your Message"
                required
              />
            </div>
            <button type="submit" className="bg-blue-500 text-white py-3 px-6 rounded-lg shadow hover:bg-blue-700 focus:ring focus:ring-blue-500">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default AboutUsPage;