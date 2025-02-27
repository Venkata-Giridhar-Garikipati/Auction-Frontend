import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const NotificationContext = createContext(null);

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  // Check for new bids periodically
  useEffect(() => {
    const checkForNewBids = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
          const response = await fetch(`http://localhost:8080/notifications/${user.id}`);
          const data = await response.json();
          
          if (data.data && data.data.length > 0) {
            data.data.forEach(notification => {
              toast.info(notification.message, {
                position: "bottom-right"
              });
            });
            
            // Mark notifications as read
            await fetch(`http://localhost:8080/notifications/mark-read/${user.id}`, {
              method: 'POST'
            });
          }
        }
      } catch (error) {
        console.error('Error checking notifications:', error);
      }
    };

    const interval = setInterval(checkForNewBids, 30000); // Check every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const addNotification = (message, type = 'info') => {
    setNotifications(prev => [...prev, { message, type, id: Date.now() }]);
    toast[type](message);
  };

  return (
    <NotificationContext.Provider value={{ notifications, addNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};
