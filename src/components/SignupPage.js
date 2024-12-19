import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const API_URL = 'http://localhost:8081';

function SignupPage() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    try {
      const response = await fetch(`${API_URL}/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ firstName, lastName, email, password }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to sign up');
      }
      setError('');
      navigate('/login');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <section className="py-16 bg-gray-100 flex justify-center items-center">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-4">Create Account</h2>
        {error && <div className="mb-4 text-red-500">{error}</div>}
        <form onSubmit={handleSignup}>
          <div className="mb-4">
            <label className="block text-gray-700">First Name</label>
            <input
              type="text"
              className="w-full p-2 border rounded-lg"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Last Name</label>
            <input
              type="text"
              className="w-full p-2 border rounded-lg"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
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
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Confirm Password</label>
            <input
              type="password"
              className="w-full p-2 border rounded-lg"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-400">Sign Up</button>
        </form>
      </div>
    </section>
  );
}

export default SignupPage;