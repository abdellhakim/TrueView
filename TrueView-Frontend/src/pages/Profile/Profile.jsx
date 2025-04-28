import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import axios from 'axios';

const Profile = () => {
  const [selectedSection, setSelectedSection] = useState('Profile');
  const [profile, setProfile] = useState({
    username: '',
    email: '',
    dateOfBirth: ''
  });
  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [profilePicture, setProfilePicture] = useState(null);
  const [currentProfilePictureUrl, setCurrentProfilePictureUrl] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('/api/user/profile', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        const data = response.data;
        setProfile({
          username: data.username || '',
          email: data.email || '',
          dateOfBirth: data.dateOfBirth || ''
        });
        setCurrentProfilePictureUrl(data.profilePictureUrl || null);
      } catch (error) {
        console.error('Failed to fetch profile:', error);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setProfile((prevProfile) => ({
      ...prevProfile,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put('/api/user/profile', profile, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });
      setProfile(response.data);
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Failed to update profile:', error);
      alert('Failed to update profile.');
    }
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswords((prevPasswords) => ({
      ...prevPasswords,
      [name]: value
    }));
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();

    if (passwords.newPassword !== passwords.confirmPassword) {
      alert('New password and confirm password do not match.');
      return;
    }

    try {
      const response = await axios.put(
        '/api/user/profile/password',
        {
          currentPassword: passwords.currentPassword,
          newPassword: passwords.newPassword
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.status === 200) {
        alert('Password updated successfully!');
        setPasswords({ currentPassword: '', newPassword: '', confirmPassword: '' });
      }
    } catch (error) {
      console.error('Failed to update password:', error);
      alert(error.response?.data || 'An error occurred while updating the password.');
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProfilePicture(file);
  };

  const handleUpdateProfilePicture = async () => {
    if (!profilePicture) {
      alert('Please select a file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('profilePicture', profilePicture);

    try {
      const response = await axios.put('/api/user/profile/picture', formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.status === 200) {
        alert('Profile picture updated successfully!');
        setCurrentProfilePictureUrl(URL.createObjectURL(profilePicture));
      }
    } catch (error) {
      console.error('Failed to update profile picture:', error);
      alert(error.response?.data || 'An error occurred while updating the profile picture.');
    }
  };

  const handleDeleteProfilePicture = async () => {
    try {
      const response = await axios.delete('/api/user/profile/picture', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.status === 200) {
        alert('Profile picture deleted successfully!');
        setCurrentProfilePictureUrl(null);
      }
    } catch (error) {
      console.error('Failed to delete profile picture:', error);
      alert(error.response?.data || 'An error occurred while deleting the profile picture.');
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-white text-black">
      <Navbar />

      <div className="content flex flex-1 pt-30">
        <div className="w-1/6 p-5 bg-white border-r border-gray-200">
          <h2 className="text-xl font-bold mb-6">Account Settings</h2>
          <ul className="space-y-4">
            {['Profile', 'Security'].map((section) => (
              <li
                key={section}
                className={`cursor-pointer hover:text-blue-500 ${selectedSection === section ? 'text-blue-500 font-bold' : 'text-gray-700'}`}
                onClick={() => setSelectedSection(section)}
              >
                {section}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex-1 p-10">
          <h1 className="text-2xl font-bold mb-6">{selectedSection}</h1>

          {/* Profile Section */}
          {selectedSection === 'Profile' && (
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="flex items-center mb-8">
                <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200 mr-4">
                  {currentProfilePictureUrl ? (
                    <img
                      src={currentProfilePictureUrl}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-white font-bold bg-gray-400">
                      {profile.username?.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>
                <div>
                  <label htmlFor="profilePicture" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mr-4 cursor-pointer">
                    Update Photo
                  </label>
                  <input
                    id="profilePicture"
                    type="file"
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                  />
                  <button
                    type="button"
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    onClick={handleDeleteProfilePicture}
                  >
                    Delete Photo
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                <input
                  type="text"
                  name="username"
                  value={profile.username || ''}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={profile.email || ''}
                  onChange={handleChange}
                  placeholder="email@example.com"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={profile.dateOfBirth || ''}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Save Changes
                </button>
              </div>
            </form>
          )}

          {/* Security Section */}
          {selectedSection === 'Security' && (
            <form className="space-y-6" onSubmit={handlePasswordUpdate}>
              <div>
                <label className="block text-sm font-medium text-gray-700">Current Password</label>
                <input
                  type="password"
                  name="currentPassword"
                  value={passwords.currentPassword}
                  onChange={handlePasswordChange}
                  placeholder="Enter current password"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">New Password</label>
                <input
                  type="password"
                  name="newPassword"
                  value={passwords.newPassword}
                  onChange={handlePasswordChange}
                  placeholder="Enter new password"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Confirm New Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={passwords.confirmPassword}
                  onChange={handlePasswordChange}
                  placeholder="Confirm new password"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                  onClick={() => setPasswords({ currentPassword: '', newPassword: '', confirmPassword: '' })}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Update Password
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      <footer className="bg-white-100 text-gray-700 py-10">
        <div className="w-full border-t border-gray-300 mt-8 pt-4 mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Footer content */}
        </div>
      </footer>
    </div>
  );
};

export default Profile;