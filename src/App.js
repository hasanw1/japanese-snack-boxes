import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/Header';
import MainBanner from './components/MainBanner';
import HowItWorks from './components/HowItWorks';
import InsideTheBox from './components/InsideTheBox';
import Footer from './components/Footer';
import SubscribePage from './components/SubscribePage';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import AdminPage from './components/AdminPage';
import CheckoutPage from './components/CheckoutPage';
import ShippingPage from './components/ShippingPage';
import PaymentPage from './components/PaymentPage';
import ProfilePage from './components/ProfilePage';
import { AuthProvider } from './AuthContext';
import OrderSuccessPage from './components/OrderSuccessPage';
import AdminLoginPage from './components/AdminLoginPage';
import AboutUsPage from './components/AboutUsPage';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
};

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <div className="App">
          <Header />
          <Routes>
            <Route path="/" element={<><MainBanner /><HowItWorks /><InsideTheBox /></>} />
            <Route path="/subscribe" element={<SubscribePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/checkout" element={<CheckoutPage />}/>
            <Route path="/shipping" element={<ShippingPage />} />
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="/profile" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
            <Route path="/order-success" element={<OrderSuccessPage />} />
            <Route path="/admin-login" element={<AdminLoginPage />} />
            <Route path="/about" element={<AboutUsPage />} />
          </Routes>
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
};

export default App;