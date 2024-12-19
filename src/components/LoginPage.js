import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../AuthContext';

const API_URL = 'http://localhost:8081';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/profile');
    }
  }, [isLoggedIn, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.msg || 'Failed to login');
      }
      const data = await response.json();
      login(data.token);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <section className="py-16 bg-gray-100 flex justify-center items-center">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-4">Account Login</h2>
        {error && <div className="mb-4 text-red-500">{error}</div>}
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700">Email Address</label>
            <input
              type="email"
              className="w-full p-2 border rounded-lg"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              className="w-full p-2 border rounded-lg"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <a href="/" className="text-blue-500 text-sm mt-2 block">Forgot Password?</a>
          </div>
          <button className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-400">Login</button>
        </form>
        <div className="mt-4 text-center">
          <p>New here? <Link to="/signup" className="text-blue-500">Sign Up</Link></p>
        </div>
      </div>
    </section>
  );
}

export default LoginPage;