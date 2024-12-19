import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function ShippingPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const contactInfo = location.state?.contactInfo;
  const shippingAddress = location.state?.shippingAddress;
  const selectedPlan = location.state?.selectedPlan;

  if (!contactInfo || !shippingAddress || !selectedPlan) {
    navigate('/checkout');
    return null;
  }

  const handleContinueToPayment = () => {
    navigate('/payment', { state: { contactInfo, shippingAddress, selectedPlan } });
  };

  const handleBackToCheckout = () => {
    navigate('/checkout', { state: { contactInfo, shippingAddress, selectedPlan } });
  };

  return (
    <section className="shipping-page py-16 flex flex-col items-center bg-blur">
      <div className="container mx-auto p-8 bg-white rounded-lg shadow-lg max-w-2xl">
        <h2 className="text-3xl font-bold mb-8">Shipping Information</h2>
        <div className="w-full">
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">Contact Information</label>
            <p>Email: {contactInfo.email}</p>
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">Shipping Address</label>
            <p>Country: {shippingAddress.country}</p>
            <p>First Name: {shippingAddress.firstName}</p>
            <p>Last Name: {shippingAddress.lastName}</p>
            <p>State: {shippingAddress.state}</p>
            <p>City: {shippingAddress.city}</p>
            <p>Address: {shippingAddress.address}</p>
            <p>Phone: {shippingAddress.phone}</p>
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">Selected Plan</label>
            <p>Plan: {selectedPlan.name}</p>
            <p>Price: {selectedPlan.price}</p>
          </div>
        </div>
        <div className="flex justify-between mt-8">
          <button
            onClick={handleBackToCheckout}
            className="bg-gray-500 text-white py-3 px-6 rounded-lg shadow hover:bg-gray-700 focus:ring focus:ring-blue-500"
          >
            Back to Checkout
          </button>
          <button
            onClick={handleContinueToPayment}
            className="bg-blue-500 text-white py-3 px-6 rounded-lg shadow hover:bg-blue-700 focus:ring focus:ring-blue-500"
          >
            Continue to Payment
          </button>
        </div>
      </div>
    </section>
  );
}

export default ShippingPage;