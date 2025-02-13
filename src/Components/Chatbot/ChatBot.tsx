"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { Send, Bot, Loader2 } from "lucide-react"
import bot from "./gemini"
import { useSession } from "next-auth/react"
import { motion, AnimatePresence } from "framer-motion"

interface Props {
  className?: string
}

const ChatBot: React.FC<Props> = ({ className }) => {
  const [userInput, setUserInput] = useState<string>("")
  const [error, setError] = useState<string>("")
  const [response, setResponse] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)
  const [isChatbotInitialized, setIsInitialized] = useState<boolean>(false)
  const { data: session } = useSession()

  useEffect(() => {
    ;(async () => {
      if (session?.user.role == "user") {
        const rollNumber = session.user.rollNumber as string | null
        const isInit = await bot.initializeStudentBot(rollNumber)
        setIsInitialized(isInit)
      } else {
        const isInit = await bot.initializeBot()
        setIsInitialized(isInit)
      }
    })()
  }, [session])

  const handleFind = async () => {
    if (!userInput.trim()) return
    setLoading(true)
    setResponse("")

    try {
      const res: any = await bot.runBot(userInput)
      if (!res) {
        setLoading(false)
        return
      }
      const formattedData = res.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>").replace(/\n/g, "<br>")

      displayResponseWordByWord(formattedData)
    } catch (error) {
      setError("Something went wrong. Please try again.")
      setLoading(false)
    }
  }

  const displayResponseWordByWord = (formattedData: string) => {
    const words = formattedData.split(" ")
    let wordIndex = 0
    const interval = setInterval(() => {
      setResponse((prev) => prev + " " + words[wordIndex])
      wordIndex++
      if (wordIndex >= words.length) {
        clearInterval(interval)
        setLoading(false)
      }
    }, 50)
  }

  return (
    <div className={`container mx-auto mt-10 ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden"
      >
        <div className="p-6 bg-gradient-to-r from-blue-500 to-purple-600">
          <h2 className="text-2xl font-bold text-white flex items-center">
            <Bot className="mr-2" /> Student Information ChatBot
          </h2>
        </div>
        <div className="p-6 bg-gray-50">
          <AnimatePresence>
            {response && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-white p-4 rounded-lg shadow-md mb-4"
              >
                <div className="text-md leading-relaxed text-gray-700" dangerouslySetInnerHTML={{ __html: response }} />
              </motion.div>
            )}
          </AnimatePresence>
          {loading && (
            <div className="flex items-center text-gray-500 mt-2">
              <Loader2 className="animate-spin mr-2" />
              Thinking...
            </div>
          )}
        </div>
        <div className="p-6 bg-gray-100">
          <form
            onSubmit={(e) => {
              e.preventDefault()
              handleFind()
            }}
            className="flex items-center space-x-2"
          >
            <input
              type="text"
              placeholder={isChatbotInitialized ? "Type your query here..." : "Loading..."}
              value={userInput}
              onChange={(e) => {
                setUserInput(e.target.value)
                setError("")
              }}
              className="flex-grow px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
              disabled={!isChatbotInitialized}
            />
            <motion.button
              type="submit"
              disabled={loading || !isChatbotInitialized}
              className="p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
              <span className="sr-only">Send</span>
            </motion.button>
          </form>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>
      </motion.div>
    </div>
  )
}

export default ChatBot

