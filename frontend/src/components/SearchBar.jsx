import axios from 'axios';
import React, { useState, useCallback } from 'react';
import Input from './common/Input';

import { useSelector } from 'react-redux';

import { useDispatch } from 'react-redux';

import { useSocket } from '../context/SocketContext';

import { removeSentFriendRequest,addSentFriendRequest } from '../redux/UserSlice';

import FriendRequestNotifications from './Notification';

const useDebounce = (func, delay) => {

  const timeoutRef = React.useRef();
  const debouncedFunc = useCallback(
    (...args) => {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => func(...args), delay);
    },
    [func, delay]
  );

  return debouncedFunc;
};

const SearchBar = ({ onSearch }) => {

  const dispatch = useDispatch();

  const socket = useSocket();

  const [query, setQuery] = useState('');
  const [searchedUserData, setSearchedUserData] = useState([]);

  const { userData, receivedFriendRequests, sentFriendRequests, friends } = useSelector((state) => state.user);

  const isSearchedUserAlreadyFriends = (userId) => {
    if (!friends?.length) return false;
    return friends.some((user) => user === userId);
  };


  console.log("sent friend requests", sentFriendRequests);

  const isFriendRequestAlreadySent = (userId) => {

    if (sentFriendRequests.length === 0 || sentFriendRequests == null) {

      return false;

    }

    const isUserExists = sentFriendRequests.find((id) => id == userId);

    if (isUserExists !== undefined) {

      return true;

    }

    return false;

  };

  const fetchSearchResults = async (query) => {
    if (query === '') return;

    try {
      const response = await axios.get(`http://localhost:4000/api/searchUser/${query}`, {
        withCredentials: true,
      });
      setSearchedUserData(response.data.data.users);
    } catch (error) {
      console.error('Error fetching data from server', error);
    }
  };

  const debouncedSearch = useDebounce(fetchSearchResults, 500);

  const changeHandler = (e) => {
    setQuery(e.target.value);
    debouncedSearch(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  const handleSendRequest = async (receiverId) => {
    try {
      const response = await axios.post(
        `http://localhost:4000/api/friend-requests-send`,
        { receiverId },
        { withCredentials: true }
      );

      console.log("ss",receiverId);

      dispatch(addSentFriendRequest(receiverId));

      // console.log('Friend request sent successfully:', response.data);
    } catch (error) {
      console.error('Error sending friend request:', error);
    }
  };

  const handleCancelSentRequest = async (receiverId) => {
    try {
      const response = await axios.post(`http://localhost:4000/api/friend-requests/cancel`, {

        receiverId: receiverId
      }, {
        withCredentials: true,
      });

      console.log("hellow 1");

      dispatch(removeSentFriendRequest(receiverId));

    } catch (error) {
      console.error('Error canceling friend request:', error);
    }
  };

  return (
    <div className="flex flex-col">
      <form onSubmit={handleSearch} className="flex relative justify-center mb-4">
        <Input
          type="text"
          value={query}
          onChange={changeHandler}
          placeholder="Search for users..."
        />
        <button type="submit" className="bg-blue-500 p-2 rounded-r-md text-white">
          Search
        </button>
      </form>

      <div>
        {searchedUserData.length > 0 ? (
          searchedUserData.map((user) => (
            <div
              key={user._id}
              className="flex justify-between items-center p-2 bg-gray-100 rounded-lg shadow-md mb-2"
            >
              <p className="text-gray-800 font-medium">{user.username}</p>
              <div className="flex gap-2 items-center">
                {isSearchedUserAlreadyFriends(user._id) ? (
                  <p className="text-gray-500">Already Friends</p>
                ) : isFriendRequestAlreadySent(user._id) ? (
                  <div className="flex items-center gap-2">
                    <p className="text-yellow-600">Request Already Sent</p>
                    <button
                      onClick={() => handleCancelSentRequest(user._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded-md"
                    >
                      Cancel Request
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => handleSendRequest(user._id)}
                    className="bg-green-500 text-white px-3 py-1 rounded-md"
                  >
                    Send Request
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No users found</p>
        )}
      </div>

        <FriendRequestNotifications></FriendRequestNotifications>

    </div>
  );
};

export default SearchBar;
