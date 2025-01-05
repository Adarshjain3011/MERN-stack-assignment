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
    <div className="relative bg-gradient-to-br from-blue-50 to-gray-100">
    
      <Navbar></Navbar>

      <div className="relative mt-20 z-20">
        {/* Search Bar */}
        <div className="bg-white relative shadow-lg rounded-lg p-4">
          <SearchBar onSearch={setSearchQuery} />
        </div>

      </div>
    </div>
  );
};

export default HomePage;
