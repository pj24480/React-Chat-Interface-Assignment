# React-Chat-Interface-Assignment
# ChatGPT-like Chat Interface

A fully functional ChatGPT-like chat interface built with React, Vite, and TailwindCSS. This project includes API integration for chat responses (using OpenAI or Google Gemini), Markdown rendering, and conversation history maintained via React Context.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Setup Instructions](#setup-instructions)
- [Usage](#usage)
- [Design Decisions](#design-decisions)
- [API Integration & Environment Variables](#api-integration--environment-variables)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Chat Interface**: Mimics ChatGPT's layout with a sidebar and a chat window.
- **API Integration**: Integrated with chat APIs (OpenAI/Google Gemini).  
- **Markdown Rendering**: Messages support Markdown formatting via `react-markdown`.
- **Conversation History**: Managed globally using React Context and `useReducer`.
- **Responsive Layout**: Full viewport usage with a 20% sidebar and 80% chat window (centered content).
- **Searchable Conversations**: Sidebar includes a search bar to filter chat threads.
- **No Authentication Required**: Easy to use without login.

## Tech Stack

- **React** with functional components & hooks (useState, useReducer, useContext)
- **Vite** for fast development and bundling
- **TailwindCSS** for styling
- **react-markdown** for Markdown rendering
- **Axios** for API calls
- **React Context API** for state management (conversation history)
- **Optional**: Google Gemini / OpenAI for API integration

## Project Structure

chat-interface/ ├── node_modules/ ├── public/ │ └── vite.svg ├── src/ │ ├── components/ │ │ ├── Chat.jsx # Chat window component │ │ └── Sidebar.jsx # Sidebar component for conversations │ ├── context/ │ │ └── ConversationContext.jsx # Global conversation state │ ├── App.jsx # Main application layout │ ├── main.jsx # Vite entry point │ └── index.css # TailwindCSS & custom styles ├── .env # Environment variables (or key.env loaded via vite.config.js) ├── package.json └── README.md
## Setup Instructions

1. **Clone the Repository**

   ```bash
   git clone https://github.com/your-username/chat-interface.git
   cd chat-interface
2. npm i
3. npm run dev
