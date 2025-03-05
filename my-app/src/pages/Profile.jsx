import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FaUser, FaEnvelope, FaPhone, FaArrowLeft, FaEdit, FaTrash } from "react-icons/fa";
import { toast } from 'react-toastify';
import { deleteUser } from '../services/authService';

const Profile = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: ""
  });

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        phone: user.phone || ""
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8080/users/${user.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        toast.success('Profile updated successfully!');
        setIsEditing(false);
      } else {
        toast.error('Failed to update profile');
      }
    } catch (error) {
      toast.error('Error updating profile: ' + error.message);
    }
  };

  const handleDeleteAccount = async () => {
    const confirmed = window.confirm(
      "Warning: Deleting your account will:\n\n" +
      "1. Remove all your bids\n" +
      "2. Delete all your auctions\n" +
      "3. Permanently delete your account\n\n" +
      "This action cannot be undone. Are you sure you want to continue?"
    );

    if (confirmed) {
      try {
        await deleteUser(user.id);
        toast.success('Account and all associated data deleted successfully');
        localStorage.removeItem('user');
        navigate('/signin');
      } catch (error) {
        console.error('Delete account error:', error);
        toast.error(error.message || 'Unable to delete account. Please try again later.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <button 
          onClick={() => navigate('/dashboard')} 
          className="flex items-center text-gray-600 hover:text-primary-600 transition-colors mb-6"
        >
          <FaArrowLeft className="mr-2" /> Back to Dashboard
        </button>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="p-8">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                Your Profile
              </h2>
              <div className="flex gap-4">
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="flex items-center gap-2 px-6 py-2 bg-theme-gradient text-white rounded-full hover:opacity-90 transition-all shadow-md"
                >
                  <FaEdit /> {isEditing ? "Cancel Edit" : "Edit Profile"}
                </button>
                <button
                  onClick={handleDeleteAccount}
                  className="flex items-center gap-2 px-6 py-2 border-2 border-danger-500 text-danger-500 rounded-full hover:bg-danger-50 transition-colors"
                >
                  <FaTrash /> Delete Account
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="flex items-center gap-2 text-gray-700 text-sm font-medium mb-2">
                    <FaUser className="text-primary-500" /> First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:bg-gray-50"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-gray-700 text-sm font-medium mb-2">
                    <FaUser className="text-primary-500" /> Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:bg-gray-50"
                  />
                </div>
              </div>

              <div>
                <label className="flex items-center gap-2 text-gray-600 mb-2">
                  <FaEnvelope /> Email
                  <span className="text-xs text-gray-500">(Cannot be changed)</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  disabled={true}
                  className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-600 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-gray-700 text-sm font-medium mb-2">
                  <FaPhone className="text-primary-500" /> Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:bg-gray-50"
                />
              </div>

              {isEditing && (
                <div className="flex gap-4 mt-8">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="w-1/2 py-3 bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200 transition-colors font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="w-1/2 py-3 bg-theme-gradient text-white rounded-full hover:opacity-90 transition-opacity font-medium"
                  >
                    Save Changes
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
