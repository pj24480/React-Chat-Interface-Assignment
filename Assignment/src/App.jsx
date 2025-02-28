import React from "react";
import Sidebar from "./components/Sidebar";
import Chat from "./components/chat";


const App = () => {
  return (
    <div className="flex h-screen w-screen">
      {/* Sidebar takes 20% */}
      <div className="w-1/5 h-full">
        <Sidebar />
      </div>
      {/* Chat window takes 80% */}
      <div className="w-4/5 h-full bg-gray-50 flex items-center justify-center">
        {/* Chat content centered to 60% of chat window */}
        <div className="w-3/5 h-full border-l border-gray-300">
          <Chat />
        </div>
      </div>
    </div>
  );
};

export default App;
