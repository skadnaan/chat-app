import React, { useContext } from 'react';
import assets from '../assets/assets';
import { ChatContext } from '../../context/ChatContext.jsx';
import { AuthContext } from '../../context/AuthContext.jsx';

const RightSideBar = () => {
  const { selectedUser, messages } = useContext(ChatContext);
  const { onlineUsers, logout } = useContext(AuthContext);

  // filter only images
  const images =
    messages?.filter((msg) => msg.image)?.map((m) => m.image) || [];

  if (!selectedUser) return null;

  return (
    <div className="hidden xl:flex flex-col h-full p-4 bg-white/10">
      {/* User */}
      <div className="flex flex-col items-center mb-4">
        <img
          src={selectedUser?.profilePic || assets.avatar_icon}
          className="w-20 h-20 rounded-full object-cover"
        />
        <div className="flex items-center gap-2 mt-2">
          <p className="text-white font-semibold text-lg">
            {selectedUser.fullName}
          </p>
          {onlineUsers.includes(selectedUser._id) && (
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
          )}
        </div>
        <p className="text-gray-300 text-sm">
          {selectedUser.bio || 'hi i am virat kohli'}
        </p>
      </div>

      <hr className="border-white/20 mb-4" />

      {/* Media */}
      <p className="text-white font-medium mb-2">Media</p>
      <div className="grid grid-cols-3 gap-2 overflow-y-auto max-h-[300px] pr-1">
        {images.length > 0 ? (
          images.map((img, i) => (
            <img
              key={i}
              src={img}
              className="w-full h-20 object-cover rounded-md"
            />
          ))
        ) : (
          <p className="text-gray-400 text-sm col-span-3">No media yet</p>
        )}
      </div>

      {/* Logout button at bottom */}
      <div className="mt-auto pt-4">
        <button
          onClick={logout}
          className="w-full py-2 rounded-lg bg-violet-500 text-white font-medium"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default RightSideBar;
