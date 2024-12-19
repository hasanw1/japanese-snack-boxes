import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthContext from '../AuthContext';

function CheckoutPage() {
  const { isLoggedIn, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const savedInfo = JSON.parse(localStorage.getItem('checkoutInfo'));

  const [email, setEmail] = useState(isLoggedIn && user ? user.email : savedInfo?.email || '');
  const [country, setCountry] = useState(savedInfo?.country || '');
  const [firstName, setFirstName] = useState(savedInfo?.firstName || '');
  const [lastName, setLastName] = useState(savedInfo?.lastName || '');
  const [state, setState] = useState(savedInfo?.state || '');
  const [city, setCity] = useState(savedInfo?.city || '');
  const [address, setAddress] = useState(savedInfo?.address || '');
  const [phone, setPhone] = useState(savedInfo?.phone || '');
  const [saveInfo, setSaveInfo] = useState(false);

  const selectedPlan = JSON.parse(localStorage.getItem('selectedPlan'));

  const handleSubmit = (e) => {
    e.preventDefault();
    const contactInfo = { email };
    const shippingAddress = { country, firstName, lastName, state, city, address, phone };

    if (saveInfo) {
      localStorage.setItem('checkoutInfo', JSON.stringify({ email, country, firstName, lastName, state, city, address, phone }));
    }

    navigate('/shipping', { state: { contactInfo, shippingAddress, selectedPlan } });
  };

  return (
    <section className="checkout-page py-16 flex flex-col items-center bg-blur">
      <div className="container mx-auto p-8 bg-white rounded-lg shadow-lg max-w-2xl">
        <h2 className="text-3xl font-bold mb-8">Checkout</h2>
        <form onSubmit={handleSubmit} className="w-full">
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">Contact Information</label>
            <input
              type="email"
              className="w-full p-4 border rounded-lg shadow-sm focus:ring focus:ring-blue-500"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <p className="text-sm mt-2">
              Already have an account? <Link to="/login" className="text-blue-500">Login</Link>
            </p>
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">Shipping Address</label>
            <select
              className="w-full p-4 border rounded-lg shadow-sm mb-4 focus:ring focus:ring-blue-500"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
            >
              <option value="">Country</option>
              <option value="Lebanon">Lebanon</option>
              <option value="Japan">Japan</option>
            </select>
            <input
              type="text"
              className="w-full p-4 border rounded-lg shadow-sm mb-4 focus:ring focus:ring-blue-500"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
            <input
              type="text"
              className="w-full p-4 border rounded-lg shadow-sm mb-4 focus:ring focus:ring-blue-500"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
            <input
              type="text"
              className="w-full p-4 border rounded-lg shadow-sm mb-4 focus:ring focus:ring-blue-500"
              placeholder="State"
              value={state}
              onChange={(e) => setState(e.target.value)}
              required
            />
            <input
              type="text"
              className="w-full p-4 border rounded-lg shadow-sm mb-4 focus:ring focus:ring-blue-500"
              placeholder="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
            <input
              type="text"
              className="w-full p-4 border rounded-lg shadow-sm mb-4 focus:ring focus:ring-blue-500"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
            <input
              type="text"
              className="w-full p-4 border rounded-lg shadow-sm mb-4 focus:ring focus:ring-blue-500"
              placeholder="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
            <div className="flex items-center mb-6">
              <input
                type="checkbox"
                className="mr-2 focus:ring focus:ring-blue-500"
                checked={saveInfo}
                onChange={() => setSaveInfo(!saveInfo)}
              />
              <label className="text-gray-700">Save this information for next time</label>
            </div>
            <div className="flex justify-end">
              <button type="submit" className="bg-blue-500 text-white py-3 px-6 rounded-lg shadow hover:bg-blue-700 focus:ring focus:ring-blue-500">
                Continue to Shipping
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}

export default CheckoutPage;