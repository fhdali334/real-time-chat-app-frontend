import { useState } from "react";
import socket from "../utils/socket";

const MessageInput = ({ userName }: { userName: string }) => {
  const [message, setMessage] = useState("");

  const sendMessage = () => {
    if (!message.trim()) return;

    socket.emit("sendMessage", { userName, messageBody: message });
    setMessage("");
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div className="flex">
      <input
        type="text"
        className="flex-1 p-2 border rounded-l"
        placeholder="Type a message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyPress} 
      />
      <button className="bg-blue-500 text-white px-4 py-2 rounded-r cursor-pointer" onClick={sendMessage}>
        Send
      </button>
    </div>
  );
};

export default MessageInput;
