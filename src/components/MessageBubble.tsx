interface MessageBubbleProps {
    message: {
      userName: string;
      messageBody: string;
      timeStamp: string;
    };
    isOwn: boolean;
  }
  
  const MessageBubble = ({ message, isOwn }: MessageBubbleProps) => {
    return (
      <div className={`flex ${isOwn ? "justify-end" : "justify-start"} mb-2`}>
        <div className={`p-2 rounded-lg ${isOwn ? "bg-blue-500 text-white" : "bg-gray-200 text-black"}`}>
          <p className="text-sm font-semibold">{message.userName}</p>
          <p>{message.messageBody}</p>
        </div>
      </div>
    );
  };
  
  export default MessageBubble;
  