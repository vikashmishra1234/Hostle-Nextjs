"use client"

import axios from "axios"
import { motion, AnimatePresence } from "framer-motion"
import type React from "react"
import { useState, useCallback } from "react"
import { ChevronDown, ChevronUp, CheckCircle, AlertTriangle } from "lucide-react"

interface Complaint {
  _id: string
  studentName: string
  studentYear: string
  status: string
  complaintTitle: string
  complaintDescription: string
  imageUrl: string
}

interface ComplaintsProps {
  complaints: Complaint[]
}

const Complaints: React.FC<ComplaintsProps> = ({ complaints }) => {
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [updatedStatuses, setUpdatedStatuses] = useState<Record<string, string>>({})

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id)
  }

  const updateStatus = useCallback(async (complaintId: string) => {
    try {
      const res = await axios.put<{ success: boolean }>(
        `/api/updatecomplaint/?complaintId=${complaintId}`,
      )
      if (res.data.success) {
        setUpdatedStatuses((prev) => ({ ...prev, [complaintId]: "solved" }))
      }
    } catch (error) {
      console.error("Error updating status:", error)
    }
  }, [])

  return (
    <div className="p-4 sm:p-6 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8 sm:mb-12"
      >
        <h1 className="text-xl sm:text-4xl font-bold text-gray-800">Complaints Dashboard</h1>
        <motion.div
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="h-[2px] md:h-1 bg-[brown] mx-auto mt-2 max-w-md"
        />
      </motion.div>

      <div className="space-y-4 sm:space-y-6 max-w-4xl mx-auto">
        {complaints.map((complaint, index) => (
          <motion.div
            key={complaint._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200"
          >
            <div className="p-4 sm:p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex-1">
                <h2 className="text-lg sm:text-xl font-semibold capitalize text-gray-800">{complaint.complaintTitle}</h2>
                <p className="text-sm text-gray-600 mt-1">
                  {complaint.studentName} ({complaint.studentYear} year)
                </p>
              </div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 w-full sm:w-auto">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    updatedStatuses[complaint._id] || complaint.status === "solved"
                      ? "bg-green-100 text-green-800"
                      : "bg-amber-100 text-amber-800"
                  }`}
                >
                  {updatedStatuses[complaint._id] || complaint.status}
                </span>
                <button
                  onClick={() => updateStatus(complaint._id)}
                  className={`px-4 py-2 rounded-lg text-white transition-colors duration-200 flex items-center gap-2 w-full sm:w-auto justify-center ${
                    updatedStatuses[complaint._id] === "solved" || complaint.status === "solved"
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-indigo-500 hover:bg-indigo-600"
                  }`}
                  disabled={updatedStatuses[complaint._id] === "solved" || complaint.status === "solved"}
                >
                  <CheckCircle size={18} />
                  <span className="hidden sm:inline">Mark as Solved</span>
                  <span className="sm:hidden">Solve</span>
                </button>
                <button
                  onClick={() => toggleExpand(complaint._id)}
                  className="p-2 text-gray-500 hover:text-gray-700 transition-colors duration-200"
                  aria-label={expandedId === complaint._id ? "Collapse details" : "Expand details"}
                >
                  {expandedId === complaint._id ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
                </button>
              </div>
            </div>
            <AnimatePresence>
              {expandedId === complaint._id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="border-t border-gray-200"
                >
                  <div className="p-4 sm:p-6">
                    <p className="text-gray-700 mb-4">{complaint.complaintDescription}</p>
                    {complaint.imageUrl ? (
                      <img
                        src={complaint.imageUrl.slice(5) || "/placeholder.svg"}
                        alt="Complaint image"
                        className="w-full max-w-2xl mx-auto rounded-lg shadow-md"
                      />
                    ) : (
                      <div className="flex items-center justify-center bg-gray-100 rounded-lg p-4">
                        <AlertTriangle className="text-amber-500 mr-2" />
                        <span className="text-gray-600">No image available</span>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default Complaints

