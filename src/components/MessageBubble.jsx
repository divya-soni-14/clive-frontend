import React from "react";
import ReactMarkdown from "react-markdown";
import remarkBreaks from "remark-breaks";

const MessageBubble = ({ heading, text, className = "" }) => {
  let message = text;
  const regex = /Ignore previous instruction\..*/i; // Fixed regex
  message = message.replace(regex, '').trim();
  return (
    <div
      className={`message-bubble w-full max-w-3xl mx-auto my-3 p-6  rounded-xl order border-gray-100 ${className} ${heading == 'user' ? '' : ''}`}
    >
      {/* Heading Section */}
      <div className={`heading flex items-center justify-center mb-5 gap-3 ${heading == 'user' ? 'hidden' : ''}`}>
        <hr className="w-12 border-t-2 border-blue-400 opacity-80" />
        <h2 className="text-2xl font-semibold text-gray-800 tracking-wide">
          {heading}
        </h2>
        <hr className="w-12 border-t-2 border-blue-400 opacity-80" />
      </div>

      {/* Message Content */}
      <div className={`content text-gray-600 text-base leading-loose text-justify font-light ${heading == 'user' ? 'bg-white font-medium ml-16' : ''} p-4 rounded-lg`}>
        <ReactMarkdown remarkPlugins={[remarkBreaks]}>{message}</ReactMarkdown>
      </div>
    </div>
  );
};

export default MessageBubble;
