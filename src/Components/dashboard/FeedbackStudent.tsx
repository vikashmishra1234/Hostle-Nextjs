"use client"

import type React from "react"

interface FeedbackItem {
  _id: string
  studentName: string
  description: string
  studentYear: string
  qaulity: string // Assuming you meant "quality" instead of "qaulity"
}

interface FeedbackStudentProps {
  feedback: FeedbackItem[]
}

const FeedbackStudent: React.FC<FeedbackStudentProps> = ({ feedback }) => {
  const getQualityColor = (quality: string) => {
    switch (quality.toLowerCase()) {
      case "good":
        return "bg-emerald-100 text-emerald-800"
      case "satisfying":
        return "bg-sky-100 text-sky-800"
      case "poor":
        return "bg-rose-100 text-rose-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="w-full p-4">
      <h2 className="text-xl sm:text-2xl font-bold mb-4 text-gray-800">Student Feedback</h2>
      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="w-full border-collapse bg-white">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-4 py-2 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-4 py-2 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">
                Year
              </th>
              <th className="px-4 py-2 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">
                Feedback
              </th>
              <th className="px-4 py-2 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">
                Description
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {feedback.map((item) => (
              <tr key={item._id} className="hover:bg-gray-50">
                <td className="px-4 py-2 whitespace-nowrap text-sm sm:text-base text-gray-900">{item.studentName}</td>
                <td className="px-4 py-2 whitespace-nowrap text-sm sm:text-base text-gray-900">{item.studentYear}</td>
                <td className="px-4 py-2 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs sm:text-sm leading-5 font-semibold rounded-full ${getQualityColor(item.qaulity)}`}
                  >
                    {item.qaulity}
                  </span>
                </td>
                <td className="px-4 py-2 text-sm sm:text-base text-gray-500">
                  <div className="max-h-20 overflow-y-auto">{item.description}</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default FeedbackStudent

