'use client'; // Mark the file as a client-side component

import React, { useState } from 'react';
import { getPhoneNumber } from './utils';

interface Props {
  inputValue: string;
}

const InputButton: React.FC<Props> = ({ inputValue }) => {
  const [newMessage, setMessage] = useState<string>(inputValue);

  const handleRegex = async() => {
    // Check if the message contains the phrase "phone number" (case-insensitive)
    if (/phone number/i.test(newMessage)) {
      // If it contains "phone number", find the word before 'phone'
      const regex = /(\w+)\s+phone/i; // (\w+) captures the word before 'phone'
      
      const result = newMessage.match(regex); // Use match to find the word before 'phone'
      
      if (result) {
        const wordBeforePhone = result[1]; // The captured word is in the first capturing group
        const res = await getPhoneNumber(wordBeforePhone)
      } else {
        console.log("No word found before 'phone' in the message.");
      }
    } else {
      console.log("The message does not contain the phrase 'phone number'.");
    }
  };

  return (
    <div>
      <input
        value={newMessage}
        onChange={(e) => setMessage(e.target.value)}
        type="text"
        placeholder="Enter something here"
      />
      <button onClick={handleRegex}>Submit</button>
    </div>
  );
};

export default InputButton;
