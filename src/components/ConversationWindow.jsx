import React, { useState, useEffect } from "react";
import ConversationInput from "./ConversationInput";
import MessageBubble from "./MessageBubble";
import { useLocation, useParams } from "react-router-dom";

const ConversationWindow = ({ onMessageSubmit }) => {
  const [message, setMessage] = useState(""); // State for input message
  const [error, setError] = useState(""); // State for error message
  const [conversation, setConversation] = useState([]); // State for conversation
  const [text, setText] = useState("");
  const location = useLocation();
  const [sessionId, setSessionId] = useState(null);
  const videoData = location.state?.videoData || null;
  const [noSpoilers, setNoSpoilers] = useState(false); // State for no-spoilers switch
  console.log(videoData, "Video Data");
  // Handle input change
  const handleChange = (value) => {
    setMessage(value);
    setError(""); // Clear error when user types
  };

  const scrollDown = () => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  }

  useEffect(() => {
    console.log("useffect ran");
    setSessionId(videoData?.sessionId);
    setText(videoData.response);
    setConversation(videoData.conversation);
    setNoSpoilers(location.state.noSpoilers);
    console.log("Video Data: ", videoData);
    console.log("NoSpoilers: ");
    scrollDown();
  }, [videoData]);

  useEffect(() => {
    scrollDown();
  }, [conversation])


  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const userMessage = { role: "user", parts: [{ text: message }] };
    const updatedConversation = [...conversation, userMessage];
    setConversation(updatedConversation);
    setMessage("");
    scrollDown();
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/conversation?sessionId=${sessionId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            sessionId: videoData?.sessionId,
            message: message,
            noSpoilers: noSpoilers,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("API request failed");
      }

      const data = await response.json();
      setConversation(data.conversation);
      setMessage(""); // Clear input after submission
      scrollDown();
    } catch (error) {
      console.error("Error calling the api", error);
    }
  };

  return (
    <div className="conversation-window flex flex-col items-center">
      <div className="convo-space pb-38">
        {
          // Map through conversation array and render message bubbles
          conversation
            .filter((message, index) => index != 0)
            .map((message, index) => (
              <MessageBubble
                key={index}
                heading={message.role}
                text={message.parts[0].text}
                className={message.role}
              />
            ))
        }
      </div>
      <ConversationInput
        message={message}
        error={error}
        onChange={handleChange}
        onSubmit={handleSubmit}
        noSpoilers={noSpoilers}
        setNoSpoilers={setNoSpoilers}
      />
    </div>
  );
};

export default ConversationWindow;
