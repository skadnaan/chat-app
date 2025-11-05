import { createContext, useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from './AuthContext';

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const { axios, socket, authUser, setOnlineUsers } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [unseenMessages, setUnseenMessages] = useState({});

  const getUsers = async () => {
    try {
      const { data } = await axios.get('/api/messages/users');
      if (data.success) {
        setUsers(data.users || data.message || []);
        setUnseenMessages(data.unseenMessages || {});
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  const getMessages = async (userId) => {
    try {
      const { data } = await axios.get(`/api/messages/${userId}`);
      if (data.success) setMessages(data.messages);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const sendMessage = async ({ text, image }) => {
    if (!selectedUser) return toast.error('Select a user first!');

    try {
      const { data } = await axios.post(
        `/api/messages/send/${selectedUser._id}`,
        { text, image }
      );

      if (data.success) setMessages((prev) => [...prev, data.newMessage]);
    } catch (err) {
      toast.error(err.message);
    }
  };

  useEffect(() => {
    if (!socket) return;

    socket.on('newMessage', (newMessage) => {
      if (selectedUser && newMessage.senderId === selectedUser._id) {
        setMessages((prev) => [...prev, newMessage]);
      } else {
        setUnseenMessages((prev) => ({
          ...prev,
          [newMessage.senderId]: (prev[newMessage.senderId] || 0) + 1,
        }));
      }
    });

    return () => socket.off('newMessage');
  }, [socket, selectedUser]);

  useEffect(() => {
    if (authUser && socket) {
      getUsers();
    }
  }, [authUser, socket]);

  return (
    <ChatContext.Provider
      value={{
        users,
        messages,
        selectedUser,
        unseenMessages,
        getUsers,
        getMessages,
        sendMessage,
        setSelectedUser,
        setUnseenMessages,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
