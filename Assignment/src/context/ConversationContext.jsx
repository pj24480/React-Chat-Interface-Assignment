import React, { createContext, useReducer, useContext } from "react";

// Initial state
const initialState = {
  conversations: [], // Each conversation: { id, name, messages: [] }
  currentConversationId: null,
};

// Reducer to handle actions
const conversationReducer = (state, action) => {
  switch (action.type) {
    case "ADD_CONVERSATION":
      return {
        ...state,
        conversations: [...state.conversations, action.payload],
        currentConversationId: action.payload.id,
      };
    case "SET_CURRENT_CONVERSATION":
      return {
        ...state,
        currentConversationId: action.payload,
      };
    case "ADD_MESSAGE":
      return {
        ...state,
        conversations: state.conversations.map((conv) =>
          conv.id === action.payload.conversationId
            ? { ...conv, messages: [...conv.messages, action.payload.message] }
            : conv
        ),
      };
    default:
      return state;
  }
};

// Create context
const ConversationContext = createContext();

// Provider component
export const ConversationProvider = ({ children }) => {
  const [state, dispatch] = useReducer(conversationReducer, initialState);

  // Helper actions
  const addConversation = (conversation) =>
    dispatch({ type: "ADD_CONVERSATION", payload: conversation });
  const setCurrentConversation = (id) =>
    dispatch({ type: "SET_CURRENT_CONVERSATION", payload: id });
  const addMessage = (conversationId, message) =>
    dispatch({ type: "ADD_MESSAGE", payload: { conversationId, message } });

  return (
    <ConversationContext.Provider
      value={{
        conversations: state.conversations,
        currentConversationId: state.currentConversationId,
        addConversation,
        setCurrentConversation,
        addMessage,
      }}
    >
      {children}
    </ConversationContext.Provider>
  );
};

// Custom hook to use the conversation context
export const useConversations = () => {
  return useContext(ConversationContext);
};
