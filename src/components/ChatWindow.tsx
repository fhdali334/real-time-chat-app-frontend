"use client"; 

import { useState, useEffect } from "react";
import socket from "../utils/socket";
import MessageBubble from "./MessageBubble";
import MessageInput from "./MessageInput";

interface Message {
  userName: string;
  messageBody: string;
  timeStamp: string;
}

const ChatWindow = ({ userName, onLogout }: { userName: string; onLogout: () => void }) => {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    socket.emit("join", userName);

    socket.on("loadMessages", (prevMessages: Message[]) => {
      setMessages(prevMessages);
    });

    socket.on("receiveMessage", (msg: Message) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off("loadMessages");
      socket.off("receiveMessage");
    };
  }, [userName]);

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("userName");
    }
    onLogout();
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full">
      <div className="flex justify-between items-center p-2">
        <h2 className="text-xl font-bold mb-4">Group Chat</h2>
        <button onClick={handleLogout} className="mb-4 p-2 bg-red-500 text-white rounded cursor-pointer">
          Logout
        </button>
      </div>
      <div className="h-96 overflow-y-auto border rounded-xl p-2 mb-4">
        {messages.length === 0 ? <p className="text-gray-500">No messages yet.</p> : null}
        {messages.map((msg, idx) => (
          <MessageBubble key={idx} message={msg} isOwn={msg.userName === userName} />
        ))}
      </div>
      <MessageInput userName={userName} />
    </div>
  );
};

export default ChatWindow;
