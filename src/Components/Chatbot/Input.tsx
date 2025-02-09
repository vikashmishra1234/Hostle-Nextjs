"use client"
import { Send } from 'lucide-react';
import React from 'react'

interface Props{
    handleFind: () => void; 
    setUserInput: (input: string) => void; 
    userInput: string; 
    setError: (error: string ) => void; 
    loading: boolean;
}

const Input:React.FC<Props> = ({handleFind,setUserInput,userInput,setError,loading}) => {
    
  return (
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
  )
}

export default Input