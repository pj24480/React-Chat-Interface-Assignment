import React, { useState } from "react";
import { MdAdd } from "react-icons/md";
import { useConversations } from "../context/ConversationContext";

const Sidebar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const {
    conversations,
    currentConversationId,
    addConversation,
    setCurrentConversation,
  } = useConversations();

  // Filter conversations by search term
  const filteredConversations = conversations.filter((conv) =>
    conv.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Create a new conversation with no default name
  const handleNewConversation = () => {
    const newId = conversations.length + 1;
    const newConversation = {
      id: newId,
      name: "", // name can be set later after the first message
      messages: [],
    };
    addConversation(newConversation);
  };

  return (
    <div className="h-full bg-gray-800 text-white p-4 flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Conversations</h2>
        <div className="relative group">
          <button
            onClick={handleNewConversation}
            className="p-2 rounded hover:bg-gray-700"
            title="New Conversation"
          >
            <MdAdd className="w-6 h-6 text-black" />
          </button>
          <span className="absolute left-full top-1/2 transform -translate-y-1/2 ml-2 px-2 py-1 bg-gray-700 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            New Chat
          </span>
        </div>
      </div>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search chats..."
          className="w-full p-2 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <ul className="flex-1 overflow-y-auto">
        {filteredConversations.map((conv) => (
          <li
            key={conv.id}
            onClick={() => setCurrentConversation(conv.id)}
            className={`p-2 my-2 rounded cursor-pointer hover:bg-gray-700 ${
              conv.id === currentConversationId ? "bg-gray-700" : ""
            }`}
          >
            {conv.name || "New Chat"}
          </li>
        ))}
      </ul>
      <div className="text-xs text-gray-400 mt-4">No authentication required</div>
    </div>
  );
};

export default Sidebar;
