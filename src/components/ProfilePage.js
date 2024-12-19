import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../AuthContext';

const API_URL = 'http://localhost:8081';

function ProfilePage() {
  const [user, setUser] = useState({ firstName: '', lastName: '', email: '', profilePicture: '' });
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [profilePic, setProfilePic] = useState(null);
  const { logout } = useContext(AuthContext);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_URL}/auth/profile`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || 'Failed to fetch profile');
        }
        setUser(data);
        if (data.profilePicture) {
          setProfilePic(`${API_URL}${data.profilePicture}`);
        }
      } catch (err) {
        setError(err.message);
      }
    };

    fetchProfile();
  }, []);

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleProfilePicChange = (e) => {
    setProfilePic(URL.createObjectURL(e.target.files[0]));
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token');
      const formData = new FormData();
      formData.append('firstName', user.firstName);
      formData.append('lastName', user.lastName);
      formData.append('email', user.email);
      if (profilePic) {
        formData.append('profilePicture', profilePic);
      }

      const response = await fetch(`${API_URL}/auth/profile`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to update profile');
      }
      setIsEditing(false);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <section className="py-16 bg-gray-100 flex justify-center items-center">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-4">Profile</h2>
        {error && <div className="mb-4 text-red-500">{error}</div>}
        <div className="profile-picture mb-4 flex justify-center">
          <img
            src={profilePic || 'https://via.placeholder.com/150'}
            alt="Profile"
            className="w-32 h-32 rounded-full border"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Profile Picture</label>
          <input type="file" onChange={handleProfilePicChange} />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">First Name</label>
          <input
            type="text"
            className="w-full p-2 border rounded-lg"
            value={user.firstName}
            onChange={(e) => setUser({ ...user, firstName: e.target.value })}
            readOnly={!isEditing}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Last Name</label>
          <input
            type="text"
            className="w-full p-2 border rounded-lg"
            value={user.lastName}
            onChange={(e) => setUser({ ...user, lastName: e.target.value })}
            readOnly={!isEditing}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Email Address</label>
          <input
            type="email"
            className="w-full p-2 border rounded-lg"
            value={user.email}
            readOnly
          />
        </div>
        <div className="flex justify-between">
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-400"
            onClick={handleEdit}
          >
            {isEditing ? 'Save' : 'Edit'}
          </button>
          {isEditing && (
            <button
              className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-400"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
          )}
          <button
            className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-400"
            onClick={logout}
          >
            Logout
          </button>
        </div>
      </div>
    </section>
  );
}

export default ProfilePage;