import React from "react";
import { useEffect, useState } from "react";
import errorIcon from "../assets/error.png"; // Adjust path as needed
import arrowIcon from "../assets/arrow2.png"; // Adjust path as needed

const ConversationInput = ({ message, error, onChange, onSubmit, noSpoilers, setNoSpoilers }) => {

  function autoHeight(element) {
    element.style.height = "5px";
    element.style.height = element.scrollHeight + "px";
    console.log("auto height ran");
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // Prevent newline
      onSubmit(e); // Trigger form submission
    }
  };


  const handleToggleNoSpoilers = () => {
    setNoSpoilers((prev) => !prev);
    console.log("No Spoilers toggled:", !noSpoilers); // Debug log
  };

  useEffect(() => {
    autoHeight(document.getElementById("message-input"));
  }, []);

  return (
    <form
      onSubmit={onSubmit}
      className="flex p-4 flex-col items-center fixed bottom-0 w-full"
    >
      <div className="max-w-3xl w-full p-1 bg-white flex flex-col  border-gray-300 border-1 rounded-4xl">
        <label htmlFor="message" className="sr-only">
          Enter your message
        </label>
        <textarea
          type="text"
          onKeyDown={handleKeyDown}
          id="message-input"
          name="message"
          autoComplete="off"
          value={message}
          onLoad={(e) => autoHeight(e.target)}
          onChange={(e) => {
            onChange(e.target.value);
            autoHeight(e.target);
          }}
          placeholder="What more do you want to know about the video?"
          className="w-full box-border p-4 mb-[-1rem] resize-none overflow-hidden text-base text-gray-900 text-base focus:outline-none text-md rounded-t-md"
        />
        <div className="flex flex-row justify-between items-center px-4">
          {/* Error div */}
          <div className="left-side flex flex-row">
            {error.length && (
              <div className="flex flex-row error-div text-gray-800 text-sm px-3 pt-1">
                <img
                  src={errorIcon}
                  width="20px"
                  height="20px"
                  alt="Sparkles"
                ></img>
                <p className="ml-2">{error}</p>
              </div>
            )}
            {/* No Spoilers Switch */}
            <label className="flex items-center border space-x-2 cursor-pointer">
              <span className="text-sm text-gray-700 font-medium">
                No Spoilers
              </span>
              <div className="relative inline-block w-10 h-5">
                <input
                  type="checkbox"
                  id="no-spoilers"
                  checked={noSpoilers}
                  onChange={handleToggleNoSpoilers}
                  className="absolute opacity-0 w-0 h-0"
                />
                <span
                  className={`block w-10 h-5 rounded-full transition-colors duration-200 ease-in-out ${
                    noSpoilers ? "bg-blue-500" : "bg-gray-300"
                  }`}
                ></span>
                <span
                  className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow-sm transform transition-transform duration-200 ease-in-out ${
                    noSpoilers ? "translate-x-5" : "translate-x-0"
                  }`}
                ></span>
              </div>
            </label>
          </div>
          <button
            type="submit"
            className="m-2 bg-blue-500 text-white p-1.5 rounded-full  focus:ring-4 focus:ring-blue-300 transition-all duration-200 disabled:bg-gray-300 hover:cursor-pointer disabled:cursor-default"
            disabled={!message} // Disable if input is empty
          >
            <img
              src={arrowIcon}
              width="30px"
              height="30px"
              alt="Sparkles"
              className="p-1.5"
            ></img>
          </button>
        </div>
      </div>
    </form>
  );
};

export default ConversationInput;
