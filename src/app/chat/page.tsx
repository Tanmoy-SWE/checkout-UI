"use client";

import { useState } from "react";
import ChatBox from "./ChatBox";

export default function ChatPage() {
  const [messages, setMessages] = useState([]);

  const clearChat = async () => {
    try {
      const response = await fetch("https://checkout-chatapp-2922efef3720.herokuapp.com/new_chat/", {
        // const response = await fetch("http://localhost:8000/new_chat/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to reset chat");
      }

      // ✅ Reset messages in frontend
      setMessages([]);
    } catch (error) {
      console.error("Error clearing chat:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {/* ✅ Pass messages and setMessages to ChatBox */}
      <ChatBox />

      {/* New Chat Button */}
      <button
        onClick={clearChat}
        className="mb-4 px-6 py-2 bg-red-500 text-white rounded-full shadow-md hover:bg-red-600 transition-all"
      >
        🗑️ New Chat
      </button>
    </div>
  );
}
