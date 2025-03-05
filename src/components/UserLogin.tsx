"use client"; 

import { useState } from "react";
import axios from "axios";

const UserLogin = ({ setUser }: { setUser: (user: string) => void }) => {
  const [name, setName] = useState("");

  const handleLogin = async () => {
    if (!name.trim()) return;

    try {
      const { data } = await axios.post("http://localhost:5000/api/users/login", { userName: name });

      if (typeof window !== "undefined") {
        localStorage.setItem("userName", data.userName);
      }

      setUser(data.userName);
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleLogin();
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-80 mx-auto">
      <h2 className="text-xl font-bold mb-4">Enter Your Name</h2>
      <input
        type="text"
        className="w-full p-2 border rounded mb-4"
        placeholder="Your name..."
        value={name}
        onChange={(e) => setName(e.target.value)}
        onKeyUp={handleKeyPress}
      />
      <button className="w-full bg-blue-500 text-white p-2 rounded" onClick={handleLogin}>
        Join Chat
      </button>
    </div>
  );
};

export default UserLogin;
