"use client";

import { useState, useEffect } from "react";
import UserLogin from "../components/UserLogin";
import ChatWindow from "../components/ChatWindow";

const ChatApp = () => {
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = typeof window !== "undefined" ? localStorage.getItem("userName") : null;
    setUser(storedUser);
  }, []);

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("userName");
    }
    setUser(null);
  };

  return user ? (
    <ChatWindow userName={user} onLogout={handleLogout} />
  ) : (
    <UserLogin setUser={setUser} />
  );
};

export default ChatApp;
