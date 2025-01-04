// src/pages/HomePage.jsx
import React, { useState, useEffect } from 'react';
import axios from '../axios';
import SearchBar from '../components/SearchBar';
import UserCard from '../components/UserCard';
import FriendRequest from '../components/FriendRequest';
import FriendRecommendation from '../components/FriendRecommendation';

const HomePage = () => {
  const [users, setUsers] = useState([]);
  const [friendRequests, setFriendRequests] = useState([]);
  const [friendRecommendations, setFriendRecommendations] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Fetch all users
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/api/users');
        setUsers(response.data);
      } catch (err) {
        console.error('Error fetching users:', err);
      }
    };

    // Fetch friend requests
    const fetchFriendRequests = async () => {
      try {
        const response = await axios.get('/api/friend-requests');
        setFriendRequests(response.data);
      } catch (err) {
        console.error('Error fetching friend requests:', err);
      }
    };

    // Fetch friend recommendations
    const fetchFriendRecommendations = async () => {
      try {
        const response = await axios.get('/api/friend-recommendations');
        setFriendRecommendations(response.data);
      } catch (err) {
        console.error('Error fetching friend recommendations:', err);
      }
    };

    fetchUsers();
    fetchFriendRequests();
    fetchFriendRecommendations();
  }, []);

  const handleSendFriendRequest = async (user) => {
    try {
      await axios.post('/api/friend-requests', { userId: user._id });
      setFriendRequests([...friendRequests, { username: user.username }]);
    } catch (err) {
      console.error('Error sending friend request:', err);
    }
  };

  const handleAcceptFriendRequest = async (request) => {
    try {
      await axios.post('/api/friend-requests/accept', { username: request.username });
      setFriendRequests(friendRequests.filter((r) => r.username !== request.username));
    } catch (err) {
      console.error('Error accepting friend request:', err);
    }
  };

  const handleRejectFriendRequest = async (request) => {
    try {
      await axios.post('/api/friend-requests/reject', { username: request.username });
      setFriendRequests(friendRequests.filter((r) => r.username !== request.username));
    } catch (err) {
      console.error('Error rejecting friend request:', err);
    }
  };

  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <h1 className="text-3xl font-semibold text-center mb-8">Welcome to the MERN Friends App</h1>

      {/* Search Bar */}
      <SearchBar onSearch={setSearchQuery} />

      {/* Friend Requests */}
      {friendRequests.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Friend Requests</h2>
          {friendRequests.map((request) => (
            <FriendRequest
              key={request.username}
              request={request}
              onAccept={handleAcceptFriendRequest}
              onReject={handleRejectFriendRequest}
            />
          ))}
        </div>
      )}

      {/* Users List */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Users</h2>
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <UserCard
              key={user._id}
              user={user}
              onSendRequest={handleSendFriendRequest}
            />
          ))
        ) : (
          <p className="text-gray-500">No users found</p>
        )}
      </div>

      {/* Friend Recommendations */}
      {friendRecommendations.length > 0 && (
        <div>
          <h2 className="text-2xl font-semibold mb-4">Friend Recommendations</h2>
          <FriendRecommendation
            recommendations={friendRecommendations}
            onSendRequest={handleSendFriendRequest}
          />
        </div>
      )}
    </div>
  );
};

export default HomePage;


