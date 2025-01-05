import React, { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';

// Create a context for the socket
const SocketContext = createContext(null);

// Custom hook to use the SocketContext
export const useSocket = () => {
  return useContext(SocketContext);
};

// SocketProvider component to manage the socket connection
export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Initialize the socket connection
    const newSocket = io('http://localhost:4000', {
    //   autoConnect: false, // Prevent automatic connection,
      transports: ['websocket'],
    });

    // Connect to the socket server
    newSocket.connect();

    // Event listeners for connection events
    newSocket.on('connect', () => {
      console.log('Connected to socket server:', newSocket.id);
    });

    newSocket.on('disconnect', (reason) => {
      console.log('Disconnected from socket server:', reason);
      // Handle reconnection logic if necessary
    });

    newSocket.on('connect_error', (error) => {
      console.error('Connection error:', error);
      // Handle connection errors appropriately
    });

    // Set the socket instance in state
    setSocket(newSocket);

    // Cleanup function to disconnect the socket on unmount
    return () => {
      newSocket.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};
