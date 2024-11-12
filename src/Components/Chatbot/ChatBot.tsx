'use client'

import axios from 'axios'
import React, { useState } from 'react'
import { Send } from 'lucide-react'

const ChatBot = () => {
  const [userInput, setUserInput] = useState<string>('')
  const [error, setError] = useState<string>('')
  const [studentData, setStudentData] = useState([])
  const [loading, setLoading] = useState<boolean>(false)

  // Define regex patterns
  const patterns = {
    greetings: /^(hello|hi|hey|greetings|good (morning|afternoon|evening|day)|what's up|howdy)\b/i,
    dataRequest: /(\b\w+\b\s+\b\w+\b)\s+(data|detail|details|record)/i,
    recordOf: /record of\s+(\b\w+\b)/i,
  }
  const feesPattern = /\bnot\b.*\bfees?\b|\bfees?\b.*\bnot\b/i;
  const handleFind = async () => {
    if (!userInput.trim()) return

    // Check for greeting
    if (patterns.greetings.test(userInput)) {
      setError("Hello! How can I assist you?");
      return
    }

    // Check for data 
     // Matches "not", "fee", or "fees" (case-insensitive)
    const fees = feesPattern.test(userInput);
    if(fees){
      try {
        setLoading(true)
        const res = await axios.get(`https://hostle-nextjs.vercel.app/api/get-withoutfees`);
        setStudentData(res.data.newStudents)
      } catch (error) {
        console.error(error)
        setError(`There was an issue fetching data for fees`)
      } finally {
        setLoading(false)
      }
      setError('')
      return
    }
    const data = userInput.match(patterns.recordOf) || userInput.match(patterns.dataRequest)
    if (data) {
      try {
        setLoading(true)
        const res = await axios.get(`https://hostle-nextjs.vercel.app/api/getstudentbyname?studentName=${data[1]}`)
        setStudentData(res?.data.students)
      } catch (error) {
        console.error(error)
        setError(`There was an issue fetching data for ${data[1]}`)
      } finally {
        setLoading(false)
      }
    } else {
      setError("Sorry! I didn't understand that. Please provide a more specific query.")
    }
  }

  return (
    <div className="container mx-auto p-4">
      <div className="w-full max-w-2xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-4 border-b">
          <h2 className="text-2xl font-bold text-gray-800">Student Information ChatBot</h2>
        </div>
        <div className="p-4 space-y-4">
          {studentData.map((data: any, ind: number) => (
            <div key={ind} className="bg-gray-100 p-4 rounded-lg">
              {ind === 0 && <h2 className="text-lg font-semibold mb-2">There are {studentData.length} students found.</h2>}
              {ind > 0 && <h3 className="text-md font-medium mb-2">Student {ind + 1} Data</h3>}
              <div className="grid grid-cols-2 gap-2">
                <p><span className="font-medium">Name:</span> {data?.studentName}</p>
                <p><span className="font-medium">Year:</span> {data?.studentYear}</p>
                <p><span className="font-medium">Phone:</span> {data.studentPhone}</p>
                <p><span className="font-medium">Father:</span> {data.studentFatherName}</p>
                <p><span className="font-medium">Address:</span> {data.studentAddress}</p>
              </div>
            </div>
          ))}
          {error && <p className="text-red-500">{error}</p>}
          {loading && <p className="text-blue-500">Fetching data...</p>}
        </div>
        <div className="p-4 border-t">
          <form onSubmit={(e) => { e.preventDefault(); handleFind(); }} className="flex items-center space-x-2">
            <input
              type="text"
              placeholder="Type your query here..."
              value={userInput}
              onChange={(e) => { setUserInput(e.target.value); setError(''); }}
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
  )
}

export default ChatBot
