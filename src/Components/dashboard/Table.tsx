"use client";
import { fetchStudents } from "@/app/utils";
import axios from "axios";
import type React from "react";
import { useContext, useEffect, useState } from "react";
import { Search, ChevronDown, ChevronUp } from "lucide-react";
import { Student } from "@/types/types";

const Table: React.FC<any> = ({ studentData }) => {
  // const [studentData, setStudentData] = useState<any>([])
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortColumn, setSortColumn] = useState<string>("");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
 
  const handleChange = async (studentId: string) => {

    try {
      const res: any = await axios.put(
        `/api/updatefees/?studentId=${studentId}`
      );
      if (res && res.data.message) {
        alert(res.data.message);
      }

    } catch (error: any) {
      alert("Unable to update");
      console.log(error);
    }
  };

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const sortedData = [...studentData].sort((a, b) => {
    if (a[sortColumn] < b[sortColumn]) return sortDirection === "asc" ? -1 : 1;
    if (a[sortColumn] > b[sortColumn]) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  const filteredData = sortedData.filter((student: Student) =>
    Object.values(student).some((value: any) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="container  max-w-7xl mx-auto px-4 py-8">
      <div className="mb-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search students..."
            className="w-full p-2 pl-10 pr-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={20}
          />
        </div>
      </div>
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="w-full table-auto">
          <thead className="bg-gray-50">
            <tr>
              {[
                "Rollno.",
                "Name",
                "Father Name",
                "Student Phone",
                "Email",
                "Father Phone",
                "Branch",
                "Year",
                "Address",
                "Fee Status",
              ].map((header, index) => (
                <th
                  key={index}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() =>
                    handleSort(header.toLowerCase().replace(" ", ""))
                  }
                >
                  <div className="flex items-center">
                    {header}
                    {sortColumn === header.toLowerCase().replace(" ", "") &&
                      (sortDirection === "asc" ? (
                        <ChevronUp size={16} />
                      ) : (
                        <ChevronDown size={16} />
                      ))}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredData.map((student: any) => (
              <tr key={student._id} className="hover:bg-gray-50">
                <td className="px-6 text-sm py-4 whitespace-nowrap">
                  {student.rollNumber}
                </td>
                <td className="px-6 capitalize text-sm py-4 whitespace-nowrap">
                  {student.studentName}
                </td>
                <td className="px-6 capitalize text-sm py-4 whitespace-nowrap">
                  {student.studentFatherName}
                </td>
                <td className="px-6 text-sm py-4 whitespace-nowrap">
                  {student.studentPhone}
                </td>
                <td className="px-6 text-sm py-4 whitespace-nowrap">
                  {student.studentEmail}
                </td>
                <td className="px-6 text-sm py-4 whitespace-nowrap">
                  {student.studentFatherPhone}
                </td>
                <td className="px-6 uppercase text-sm py-4 whitespace-nowrap">
                  {student.studentBranch}
                </td>
                <td className="px-6 capitalize text-sm py-4 whitespace-nowrap">
                  {student.studentYear}
                </td>
                <td className="px-6 text-sm py-4">{student.studentAddress}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <input
                    type="checkbox"
                    checked={student.feeStatus}
                    onChange={() => handleChange(student._id)}
                    className="form-checkbox h-5 w-5 text-blue-600"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
