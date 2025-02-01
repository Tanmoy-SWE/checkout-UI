"use client";
import { useState, useRef, useEffect } from "react";
import ChatCard from "./ChatCard";

interface Restaurant {
  name: string;
  cuisine: string;
  address?: string;
  ratings?: string;
  website?: string;
  phone?: string;
  googleMapsUrl: string;
}

interface ChatMessage {
  question: string;
  reply: {
    message: string;
    data?: Restaurant[];
    question?: string;
  };
}

const ChatBox = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);

  const sendMessage = async () => {
    if (!input.trim()) return;
  
    // Add user message immediately
    const userMessage: ChatMessage = { question: input, reply: { message: "Thinking..." } };
    setMessages((prev) => [...prev, userMessage]);
  
    setInput(""); // Clear input field right after sending
  
    try {
      const response = await fetch("https://checkout-bd-85e160a01ddd.herokuapp.com/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: input }),
      });
  
      if (!response.ok) throw new Error("Failed to fetch response");
  
      const data = await response.json();
  
      // Update the last message with actual bot reply
      setMessages((prev) =>
        prev.map((msg, i) =>
          i === prev.length - 1 ? { ...msg, reply: data } : msg
        )
      );
    } catch (error) {
      console.error("Error fetching response:", error);
      setMessages((prev) =>
        prev.map((msg, i) =>
          i === prev.length - 1
            ? { ...msg, reply: { message: "Error fetching response. Try again!" } }
            : msg
        )
      );
    }
  };
  const isJson = (message: string) => {
    try {
      const match = message.match(/```json([\s\S]*?)```/);
      return match && JSON.parse(match[1].trim());
    } catch (e) {
      return false;
    }
  };
  
  const parseJson = (message: string) => {
    const match = message.match(/```json([\s\S]*?)```/);
    return match ? JSON.parse(match[1].trim()) : [];
  };

  const clearChat = async () => {
    try {
      const response = await fetch("http://localhost:8000/new_chat/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
  
      if (!response.ok) throw new Error("Failed to reset chat");
  
      // Reset chat messages in frontend
      setMessages([]);
    } catch (error) {
      console.error("Error clearing chat:", error);
    }
  };
  
  
  

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col w-full max-w-2xl mx-auto h-screen bg-gray-100 shadow-lg rounded-lg p-4">
      {/* Chat Container */}
      <div className="flex flex-col flex-grow p-4 space-y-4 overflow-y-auto bg-white rounded-lg shadow-md h-[550px]">
        {messages.map((msg, index) => (
          <div key={index} className="flex flex-col">
            {/* User Message */}
            <div className="self-end">
              <div className="bg-blue-500 text-white p-3 rounded-2xl max-w-xs text-sm shadow-md">
                {msg.question}
              </div>
            </div>
            {/* Bot Reply */}
        {/* Bot Reply */}
        <div className="self-start mt-2">
        <div className="bg-gray-200 text-black p-3 rounded-2xl max-w-xs text-sm shadow-md">
            {isJson(msg.reply.message) ? ( 
            <ChatCard data={parseJson(msg.reply.message)
            }
            />
            ) : (
            msg.reply.message
            )}
        </div>
        </div>

            {/* Restaurant Cards (if available) */}
            {msg.reply.data && <ChatCard data={msg.reply.data} />}
            {/* Follow-up Question */}
            {msg.reply.question && (
              <div className="self-start text-gray-800 mt-2 text-sm italic">
                {msg.reply.question}
              </div>
            )}
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>
      
      

      {/* Input Box */}
      <div className="p-4 flex items-center bg-white rounded-lg shadow-md mt-4">
        <input
          type="text"
          className="flex-1 p-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-400 outline-none shadow-sm text-black"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          onClick={sendMessage}
          className="ml-3 bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full shadow-md transition-all"
        >
          Send
        </button>
      </div>




    </div>

    
    
  );
};

export default ChatBox;
