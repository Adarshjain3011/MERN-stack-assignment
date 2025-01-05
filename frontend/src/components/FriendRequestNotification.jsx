import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:4000"); // Replace with your backend URL

const FriendRequestNotifications = () => {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        // Register the user ID with the server
        const userId = "your-logged-in-user-id"; // Replace with actual user ID
        socket.emit("register", userId);

        // Listen for friend request notifications
        socket.on("friendRequestReceived", (data) => {
            console.log("New friend request received:", data);
            setNotifications((prev) => [...prev, data]);
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    return (
        <div>
            <h2>Friend Request Notifications</h2>
            <ul>
                {notifications.map((notification, index) => (
                    <li key={index}>
                        Friend request from {notification.senderName}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FriendRequestNotifications;
