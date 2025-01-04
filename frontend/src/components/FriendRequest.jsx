// src/components/FriendRequest.jsx
import React from 'react';

const FriendRequest = ({ request, onAccept, onReject }) => {
  return (
    <div className="border p-4 rounded-lg shadow-md mb-4">
      <h3 className="text-xl font-semibold">{request.username} sent you a friend request</h3>
      <div className="flex items-center mt-2">
        <button
          onClick={() => onAccept(request)}
          className="bg-green-500 text-white px-4 py-2 rounded-lg mr-4"
        >
          Accept
        </button>
        <button
          onClick={() => onReject(request)}
          className="bg-red-500 text-white px-4 py-2 rounded-lg"
        >
          Reject
        </button>
      </div>
    </div>
  );
};

export default FriendRequest;

