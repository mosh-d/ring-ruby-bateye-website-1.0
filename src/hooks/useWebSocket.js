import { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';

// Configuration - uses environment variables with fallback
const SOCKET_URL = "https://five-clover-shared-backend.onrender.com";
const BRANCH_ID = import.meta.env.VITE_BRANCH_ID || '14';

export const useWebSocket = (onRoomsUpdated) => {
  const socketRef = useRef(null);
  const callbackRef = useRef(onRoomsUpdated);
  const [isConnected, setIsConnected] = useState(false);
  const [connectionError, setConnectionError] = useState(null);

  // Keep callback ref up to date
  useEffect(() => {
    callbackRef.current = onRoomsUpdated;
  }, [onRoomsUpdated]);

  useEffect(() => {
    console.log('🔌 Initializing WebSocket connection to:', SOCKET_URL);
    console.log('📍 Branch ID:', BRANCH_ID);

    // Initialize socket connection
    socketRef.current = io(SOCKET_URL, {
      transports: ['websocket', 'polling'],
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: 5,
    });

    // Connection event handlers
    socketRef.current.on('connect', () => {
      console.log('✅ WebSocket connected:', socketRef.current.id);
      setIsConnected(true);
      setConnectionError(null);
    });

    socketRef.current.on('disconnect', (reason) => {
      console.log('❌ WebSocket disconnected:', reason);
      setIsConnected(false);
    });

    socketRef.current.on('connect_error', (error) => {
      console.error('❌ WebSocket connection error:', error);
      setConnectionError(error.message);
      setIsConnected(false);
    });

    // Listen for room updates - use ref to always get latest callback
    socketRef.current.on('rooms_updated', (data) => {
      console.log('📢 Rooms updated event received:', data);
      console.log('📢 Event data type:', typeof data);
      console.log('📢 Event branch_id:', data.branch_id, 'Type:', typeof data.branch_id);
      console.log('📢 Our BRANCH_ID:', BRANCH_ID, 'Type:', typeof BRANCH_ID);
      console.log('📢 Comparison result:', data.branch_id === parseInt(BRANCH_ID));
      
      // Only process updates for this branch
      if (data.branch_id === parseInt(BRANCH_ID)) {
        console.log('✅ Update is for our branch (', BRANCH_ID, '), refreshing data...');
        if (callbackRef.current) {
          callbackRef.current(data);
        }
      } else {
        console.log('ℹ️ Update is for different branch (', data.branch_id, '), ignoring...');
      }
    });

    // Cleanup on unmount
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        console.log('🔌 WebSocket disconnected on cleanup');
      }
    };
  }, []); // Empty dependency array - only initialize once

  return {
    socket: socketRef.current,
    isConnected,
    connectionError,
  };
};
