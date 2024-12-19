import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const OrderSuccessPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <section className="order-success-page h-screen flex justify-center items-center bg-blur">
      <div className="container mx-auto p-8 bg-white rounded-lg shadow-lg max-w-2xl text-center">
        <h2 className="text-3xl font-bold mb-8">Order Successful</h2>
        <p className="text-xl mb-8">Thank you for your purchase! You will be redirected to the home page shortly.</p>
      </div>
    </section>
  );
};

export default OrderSuccessPage;