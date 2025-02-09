"use client";
import axios from "axios";
import React, { useState } from "react";
import { Send } from "lucide-react";
import run from "./gemini";

interface Props {
  className: string;
}

const ChatBot: React.FC<Props> = ({ className }) => {
  const [userInput, setUserInput] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [response, setResponse] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleFind = async () => {
    if (!userInput.trim()) return;

    setLoading(true); // Start loading
    setResponse(""); // Clear previous response

    try {
      const res: any = await run(userInput);
      const formattedData = res
        .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") // Convert **text** to <strong>text</strong>
        .replace(/\n/g, "<br>");

      // Simulate word-by-word response
      displayResponseWordByWord(formattedData);
    } catch (error) {
      setError("Something went wrong. Please try again.");
      setLoading(false); // Stop loading if there is an error
    }
  };

  const displayResponseWordByWord = (formattedData: string) => {
    const words = formattedData.split(" ");
    let wordIndex = 0;
    const interval = setInterval(() => {
      setResponse((prev) => prev + " " + words[wordIndex]); // Add each word to response
      wordIndex++;
      if (wordIndex >= words.length) {
        clearInterval(interval); // Stop when all words are displayed
        setLoading(false); // Stop loading when the full response is shown
      }
    }, 50); // Adjust the delay to control the typing speed
  };

  return (
    <div className={`container mx-auto ${className}`}>
      <div className="w-[90%] max-w-2xl mx-auto bg-white  rounded-lg overflow-hidden">
        <div className="p-4 border-b">
          <h2 className="text-lg md:text-xl font-bold text-gray-800">
            Student Information ChatBot
          </h2>
        </div>  
        <div className="p-4 bg-gray-100 rounded-lg shadow-md">
          <div
            className="text-md leading-relaxed"
            dangerouslySetInnerHTML={{ __html: response }} // Render formatted HTML
          />
          {loading && <div className="text-gray-500 mt-2">Loading response...</div>} {/* Show loading message */}
        </div>       
        <div className="p-4 border-t">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleFind();
            }}
            className="flex items-center space-x-2"
          >
            <input
              type="text"
              placeholder="Type your query here..."
              value={userInput}
              onChange={(e) => {
                setUserInput(e.target.value);
                setError("");
              }}
              className="flex-grow px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              disabled={loading}
              className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              {loading ? "Loading..." : <Send className="h-5 w-5" />}
              <span className="sr-only">Send</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
