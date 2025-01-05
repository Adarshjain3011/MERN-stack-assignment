import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBar from '../components/SearchBar';
import UserCard from '../components/UserCard';
import FriendRequest from '../components/FriendRequest';
import FriendRecommendation from '../components/FriendRecommendation';
import { useSelector } from 'react-redux';

import Navbar from "../components/common/Navbar";

const HomePage = () => {
  const [users, setUsers] = useState([]);
  const [friendRequests, setFriendRequests] = useState([]);
  const [friendRecommendations, setFriendRecommendations] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const userData = useSelector((state) => state.user.data);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/api/users');
        setUsers(response.data);
      } catch (err) {
        console.error('Error fetching users:', err);
      }
    };

    const fetchFriendRequests = async () => {
      try {
        const response = await axios.get('/api/friend-requests');
        setFriendRequests(response.data);
      } catch (err) {
        console.error('Error fetching friend requests:', err);
      }
    };

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 py-8 px-4">
    
      <Navbar></Navbar>

      <div className="container mx-auto max-w-4xl space-y-8">
        {/* Search Bar */}
        <div className="bg-white shadow-lg rounded-lg p-4">
          <SearchBar onSearch={setSearchQuery} />
        </div>

        {/* Friend Requests */}
        {friendRequests.length > 0 && (
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Friend Requests</h2>
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
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Users</h2>
          {filteredUsers.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filteredUsers.map((user) => (
                <UserCard
                  key={user._id}
                  user={user}
                  onSendRequest={handleSendFriendRequest}
                />
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No users found</p>
          )}
        </div>

        {/* Friend Recommendations */}
        {friendRecommendations.length > 0 && (
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Friend Recommendations</h2>
            <FriendRecommendation
              recommendations={friendRecommendations}
              onSendRequest={handleSendFriendRequest}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
