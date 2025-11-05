import React from 'react';
import SideBar from '../components/SideBar.jsx';
import ChatContainer from '../components/ChatContainer.jsx';
import RightSideBar from '../components/RightSideBar.jsx';
import { ChatContext } from '../../context/ChatContext.jsx';

import { useContext } from 'react';
const HomePage = () => {
  const { selectedUser } = useContext(ChatContext);
  return (
    <div className="w-full h-screen bg-cover bg-center bg-no-repeat flex justify-center items-center p-4 sm:px[15%] sm:py[5%] md:p-8">
      <div
        className={`backdrop-blur-xl border-2 text-gray-600 border-gray-800 rounded-2xl overflow-hidden h-full w-full max-w-6xl grid grid-cols-1 relative ${
          selectedUser
            ? 'md:grid-cols-[1fr_1.5fr] xl:grid-cols-[1fr_2fr_1fr]'
            : 'md:grid-cols-2'
        }`}
      >
        <SideBar />
        <ChatContainer />
        <RightSideBar />
      </div>
    </div>
  );
};

export default HomePage;
