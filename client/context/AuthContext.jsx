import { createContext, useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { io } from 'socket.io-client';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const AuthContext = createContext();

// Axios instance
const axiosInstance = axios.create({
  baseURL: backendUrl,
});

// Attach token to every request
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const AuthProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [socket, setSocket] = useState(null);

  const login = async (state, credentials) => {
    try {
      const { data } = await axiosInstance.post(
        `/api/auth/${state}`,
        credentials
      );

      if (data.success) {
        localStorage.setItem('token', data.token);
        setAuthUser(data.userData);
        connectSocket(data.userData);
        toast.success(data.message);
      } else toast.error(data.message);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setAuthUser(null);
    setOnlineUsers([]);
    if (socket) socket.disconnect();
    toast.success('Logged out');
  };

  const updateProfile = async (body) => {
    try {
      const { data } = await axiosInstance.put(
        '/api/auth/update-profile',
        body
      );
      if (data.success) {
        setAuthUser(data.user);
        toast.success('Profile updated');
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  const checkAuth = async () => {
    try {
      const { data } = await axiosInstance.get('/api/auth/check');
      if (data.success) {
        setAuthUser(data.user);
        connectSocket(data.user);
      }
    } catch (err) {
      // Only show error if token exists (prevents 401 on first page load)
      if (localStorage.getItem('token')) {
        toast.error(err.response?.data?.message || err.message);
      }
    }
  };

  const connectSocket = (user) => {
    if (!user) return;

    const newSocket = io(backendUrl, {
      auth: { userId: user._id },
    });

    newSocket.on('getOnlineUsers', (userIds) => {
      setOnlineUsers(userIds.map((id) => String(id)));
    });

    setSocket(newSocket);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      checkAuth();
    }
  }, []);

  const value = useMemo(
    () => ({
      axios: axiosInstance,
      authUser,
      onlineUsers,
      socket,
      login,
      logout,
      updateProfile,
      setOnlineUsers,
    }),
    [authUser, onlineUsers, socket]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
