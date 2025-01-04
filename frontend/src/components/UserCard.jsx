// src/components/UserCard.jsx
import React from 'react';

const UserCard = ({ user, onSendRequest }) => {
  return (
    <div className="border p-4 rounded-lg shadow-md mb-4">
      <h3 className="text-xl font-semibold">{user.username}</h3>
      <div className="flex items-center mt-2">
        <p className="text-gray-600">Friends: {user.friendsCount}</p>
        <button
          onClick={() => onSendRequest(user)}
          className="ml-4 bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          Send Friend Request
        </button>
      </div>
    </div>
  );
};

export default UserCard;
