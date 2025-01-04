// src/components/FriendRecommendation.jsx
import React from 'react';

const FriendRecommendation = ({ recommendations, onSendRequest }) => {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Friend Recommendations</h3>
      {recommendations.map((user) => (
        <div key={user._id} className="border p-4 rounded-lg shadow-md mb-4">
          <h3 className="text-xl font-semibold">{user.username}</h3>
          <button
            onClick={() => onSendRequest(user)}
            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            Send Friend Request
          </button>
        </div>
      ))}
    </div>
  );
};

export default FriendRecommendation;

