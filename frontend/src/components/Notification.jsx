import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useSocket } from '../context/SocketContext';

const FriendRequestNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const socket = useSocket();
  const { userData } = useSelector((state) => state.user);

  useEffect(() => {
    if (!socket || !userData) return;

    const userId = userData._id;

    // Emit the 'login' event with the userId
    socket.emit('login', userId);

    // Listen for friend request notifications
    const handleFriendRequestReceived = (data) => {
      console.log('New friend request received:', data);
      setNotifications((prev) => [...prev, data]);

      // Show browser notification
      if (Notification.permission === 'granted') {
        new Notification(`Friend request from ${data.senderName}`);
      } else if (Notification.permission !== 'denied') {
        Notification.requestPermission().then((permission) => {
          if (permission === 'granted') {
            new Notification(`Friend request from ${data.senderName}`);
          }
        });
      }
    };

    socket.on('friendRequestReceived', handleFriendRequestReceived);

    // Clean up the event listener on component unmount or change in socket
    return () => {
      socket.off('friendRequestReceived', handleFriendRequestReceived);
    };
  }, [socket, userData]);

  return (
    <div>
      <h2>Friend Request Notifications</h2>
      <ul className='flex flex-col'>
        {notifications && notifications.map((notification, index) => (

            <div className='flex flex-col gap-4 border'>

                <p>{notification.senderId}</p>

                <p>{notification.senderName}</p>

            </div>
        
        ))}
      </ul>
    </div>
  );
};

export default FriendRequestNotifications;
