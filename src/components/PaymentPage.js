import React, { useState, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AuthContext from '../AuthContext';

const API_URL = 'http://localhost:8081';

function PaymentPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [error, setError] = useState(null);

  if (!location.state) {
    navigate('/checkout');
    return null;
  }

  const { contactInfo, shippingAddress, selectedPlan } = location.state;

  const handleCompleteOrder = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}` // Ensure the token is included
        },
        body: JSON.stringify({
          userId: user.id,
          selectedPlan,
          contactInfo,
          shippingAddress,
          paymentDetails: { cardNumber, expiryDate, cvv },
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.msg || 'Failed to complete order');
      }

      console.log('Order completed successfully');
      navigate('/order-success');
    } catch (err) {
      console.error('Error completing order:', err);
      setError('There was an error completing your order. Please try again.');
    }
  };

  const handleBackToShipping = () => {
    navigate('/shipping', { state: { contactInfo, shippingAddress, selectedPlan } });
  };

  return (
    <section className="payment-page py-16 flex flex-col items-center bg-blur">
      <div className="container mx-auto p-8 bg-white rounded-lg shadow-lg max-w-2xl">
        <h2 className="text-3xl font-bold mb-8">Payment Information</h2>
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleCompleteOrder} className="w-full">
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">Card Number</label>
            <input
              type="text"
              className="w-full p-4 border rounded-lg shadow-sm focus:ring focus:ring-blue-500"
              placeholder="Card Number"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">Expiry Date</label>
            <input
              type="text"
              className="w-full p-4 border rounded-lg shadow-sm focus:ring focus:ring-blue-500"
              placeholder="MM/YY"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">CVV</label>
            <input
              type="text"
              className="w-full p-4 border rounded-lg shadow-sm focus:ring focus:ring-blue-500"
              placeholder="CVV"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
              required
            />
          </div>
          <div className="flex justify-between mt-8">
            <button
              type="button"
              className="bg-gray-500 text-white py-3 px-6 rounded-lg shadow hover:bg-gray-700 focus:ring focus:ring-blue-500"
              onClick={handleBackToShipping}
            >
              Back to Shipping
            </button>
            <button type="submit" className="bg-blue-500 text-white py-3 px-6 rounded-lg shadow hover:bg-blue-700 focus:ring focus:ring-blue-500">
              Complete Order
            </button>
          </div>
        </form>
      </div>
      <div className="container mx-auto p-8 bg-white rounded-lg shadow-lg mt-8 max-w-2xl">
        <h3 className="text-xl font-bold mb-4">Order Summary</h3>
        <p>Plan: {selectedPlan.name}</p>
        <p>Price: {selectedPlan.price}</p>
        <p>Email: {contactInfo.email}</p>
        <p>Country: {shippingAddress.country}</p>
        <p>City: {shippingAddress.city}</p>
        <p>Address: {shippingAddress.address}</p>
        <p>Phone: {shippingAddress.phone}</p>
      </div>
    </section>
  );
}

export default PaymentPage;
