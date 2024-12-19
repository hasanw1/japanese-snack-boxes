import React, { useState, useEffect } from 'react';

const API_URL = 'http://localhost:8081';

const AdminPage = () => {
  const [boxes, setBoxes] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [orders, setOrders] = useState([]);
  const [newBox, setNewBox] = useState({ name: '', description: '', imageUrl: '' });
  const [selectedSection, setSelectedSection] = useState('boxes');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const [boxesResponse, accountsResponse, reviewsResponse, ordersResponse] = await Promise.all([
          fetch(`${API_URL}/boxes`, {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          }),
          fetch(`${API_URL}/accounts`, {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          }),
          fetch(`${API_URL}/reviews`, {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          }),
          fetch(`${API_URL}/orders`, {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          }), // Fetch orders with token
        ]);

        if (!boxesResponse.ok || !accountsResponse.ok || !reviewsResponse.ok || !ordersResponse.ok) {
          throw new Error('Failed to fetch data');
        }

        const boxesData = await boxesResponse.json();
        const accountsData = await accountsResponse.json();
        const reviewsData = await reviewsResponse.json();
        const ordersData = await ordersResponse.json(); 

        console.log('Boxes:', boxesData);
        console.log('Accounts:', accountsData); 
        console.log('Reviews:', reviewsData); 
        console.log('Orders:', ordersData); 

        setBoxes(boxesData);
        setAccounts(accountsData);
        setReviews(reviewsData);
        setOrders(ordersData); 
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };

    fetchData();
  }, []);

  const handleBoxSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/boxes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newBox),
      });

      if (!response.ok) {
        throw new Error('Failed to add new box');
      }

      const addedBox = await response.json();
      setBoxes([...boxes, addedBox]);
      setNewBox({ name: '', description: '', imageUrl: '' });
    } catch (error) {
      console.error('Error adding box:', error);
    }
  };

  const handleDelete = async (type, id) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/${type}/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete item');
      }

      if (type === 'boxes') {
        setBoxes(boxes.filter(box => box.id !== id));
      } else if (type === 'accounts') {
        setAccounts(accounts.filter(account => account.id !== id));
      } else if (type === 'reviews') {
        setReviews(reviews.filter(review => review.id !== id));
      } else if (type === 'orders') {
        setOrders(orders.filter(order => order.id !== id));
      }
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  return (
    <div className="admin-page flex">
      {/* Sidebar */}
      <aside className="w-1/4 bg-gray-800 text-white min-h-screen p-8">
        <h2 className="text-4xl font-bold mb-8">Admin Dashboard</h2>
        <nav>
          <ul>
            <li className="mb-4">
              <button
                className={`w-full text-left p-2 rounded ${selectedSection === 'boxes' ? 'bg-gray-700' : ''}`}
                onClick={() => setSelectedSection('boxes')}
              >
                Manage Boxes
              </button>
            </li>
            <li className="mb-4">
              <button
                className={`w-full text-left p-2 rounded ${selectedSection === 'accounts' ? 'bg-gray-700' : ''}`}
                onClick={() => setSelectedSection('accounts')}
              >
                Manage Accounts
              </button>
            </li>
            <li className="mb-4">
              <button
                className={`w-full text-left p-2 rounded ${selectedSection === 'reviews' ? 'bg-gray-700' : ''}`}
                onClick={() => setSelectedSection('reviews')}
              >
                Manage Reviews
              </button>
            </li>
            <li className="mb-4">
              <button
                className={`w-full text-left p-2 rounded ${selectedSection === 'orders' ? 'bg-gray-700' : ''}`}
                onClick={() => setSelectedSection('orders')}
              >
                Manage Orders
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Content */}
      <main className="w-3/4 p-8">
        {selectedSection === 'boxes' && (
          <div>
            <h3 className="text-3xl text-black font-bold mb-4">Current Boxes</h3>
            <ul>
              {boxes.map((box) => (
                <li key={box.id} className="mb-4 flex items-center">
                  <img src={box.imageUrl} alt={box.name} className="w-32 h-32 mr-4" />
                  <div>
                    <h4 className="text-xl font-semibold">{box.name}</h4>
                    <p>{box.description}</p>
                  </div>
                  <button onClick={() => handleDelete('boxes', box.id)} className="text-white ml-auto">Delete</button>
                </li>
              ))}
            </ul>
            <form onSubmit={handleBoxSubmit} className="mt-8">
              <h3 className="text-2xl text-black font-bold mb-4">Add New Box</h3>
              <div className="mb-4">
                <label className="block text-gray-700">Name</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-lg"
                  value={newBox.name}
                  onChange={(e) => setNewBox({ ...newBox, name: e.target.value })}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Description</label>
                <textarea
                  className="w-full p-2 border rounded-lg"
                  value={newBox.description}
                  onChange={(e) => setNewBox({ ...newBox, description: e.target.value })}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Image URL</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-lg"
                  value={newBox.imageUrl}
                  onChange={(e) => setNewBox({ ...newBox, imageUrl: e.target.value })}
                  required
                />
              </div>
              <button className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-400">Add Box</button>
            </form>
          </div>
        )}
        
        {selectedSection === 'accounts' && (
          <div>
            <h3 className="text-3xl text-black font-bold mb-4">User Accounts</h3>
            <ul>
              {accounts.map((account) => (
                <li key={account.id} className="mb-4">
                  <h4 className="text-xl text-black font-semibold">{account.firstName} {account.lastName}</h4>
                  <p>{account.email}</p>
                  <button onClick={() => handleDelete('accounts', account.id)} className="text-white">Delete</button>
                </li>
              ))}
            </ul>
          </div>
        )}
        
        {selectedSection === 'reviews' && (
          <div>
            <h3 className="text-3xl text-black font-bold mb-4">User Reviews</h3>
            <ul>
              {reviews.map((review) => (
                <li key={review.id} className="mb-4">
                  <h4 className="text-xl font-semibold">{review.name}</h4>
                  <p className="text-yellow-500">{'★'.repeat(review.rating)}</p>
                  <p>{review.comment}</p>
                  <button onClick={() => handleDelete('reviews', review.id)} className="text-white">Delete</button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {selectedSection === 'orders' && (
          <div>
            <h3 className="text-3xl text-black font-bold mb-4">User Orders</h3>
            <ul>
              {orders.map((order) => (
                <li key={order.id} className="mb-4">
                  <h4 className="text-xl font-semibold">Order ID: {order.id}</h4>
                  <p>User: {order.firstName} {order.lastName} ({order.email})</p>
                  <p>Plan: {JSON.parse(order.selectedPlan).name}</p>
                  <p>Price: {JSON.parse(order.selectedPlan).price}</p>
                  <p>Contact Info: {order.contactInfo}</p>
                  <p>Shipping Address: {order.shippingAddress}</p>
                  <p>Payment Details: {order.paymentDetails}</p>
                  <p>Created At: {new Date(order.createdAt).toLocaleString()}</p>
                  <button onClick={() => handleDelete('orders', order.id)} className="text-white">Delete</button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminPage;