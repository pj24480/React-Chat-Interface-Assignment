import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import axios from "axios";
import { useConversations } from "../context/ConversationContext";

const Chat = () => {
  const { conversations, currentConversationId, addMessage } = useConversations();
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
  const API_URL = "https://api.openai.com/v1/chat/completions";

  // Find current conversation from context
  const currentConversation = conversations.find(
    (conv) => conv.id === currentConversationId
  );

  if (!currentConversation) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500">Please select or create a conversation.</p>
      </div>
    );
  }

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", text: input };
    // Update conversation name on first message if name is empty
    if (!currentConversation.name && userMessage.text) {
      currentConversation.name = userMessage.text;
    }
    addMessage(currentConversation.id, userMessage);
    setInput("");
    setLoading(true);

    try {
      const response = await axios.post(
        API_URL,
        {
          model: "gpt-3.5-turbo",
          messages: [...currentConversation.messages, userMessage],
        },
        {
          headers: {
            "Authorization": `Bearer ${API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );
      const botMessage = {
        role: "assistant",
        text: response.data.choices[0].message.content,
      };
      addMessage(currentConversation.id, botMessage);
    } catch (error) {
      console.error("API error:", error);
      addMessage(currentConversation.id, {
        role: "assistant",
        text: "Oops! Something went wrong.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Chat History */}
      <div className="flex-1 p-4 overflow-y-auto">
        {currentConversation.messages.map((msg, idx) => (
          <div
            key={idx}
            className={`mb-4 flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-md p-3 rounded-lg ${
                msg.role === "user" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"
              }`}
            >
              <ReactMarkdown>{msg.text}</ReactMarkdown>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start mb-4">
            <div className="max-w-md p-3 rounded-lg bg-gray-200 text-gray-800">Typing...</div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-gray-300 flex">
        <input
          type="text"
          className="flex-1 border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button
          onClick={handleSend}
          className="ml-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
