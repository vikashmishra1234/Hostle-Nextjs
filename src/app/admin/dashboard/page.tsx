import Complaints from "@/Components/dashboard/Complaints";
import Feedbackchart from "@/Components/dashboard/FeedbackChart";
import FeedbackStudent from "@/Components/dashboard/FeedbackStudent";
import StudentTable from "@/Components/dashboard/Table";
import TomCom from "@/Components/dashboard/TopCom";
import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { fetchStudents, getAllStudentComplaints, getFeedback } from "@/app/utils";
import ChatBot from "@/Components/Chatbot/ChatBot";
import { LayoutDashboard } from "lucide-react";
import { Student } from "@/types/types";

const page = async () => {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  if (!user || !(user.role == "admin")) {
    return <div>unable to show anything</div>;
  }

  const complaints = await getAllStudentComplaints();
  const feedbacks = await getFeedback();
  const students:Student[]|null = await fetchStudents();

  return (
    <div className="bg-gray-100 py-5">
      <h2 className="flex items-center md:hidden  w-[80%] mx-auto gap-2 py-4  text-2xl sm:text-2xl md:text-3xl md:py-12 lg:text-5xl font-bold text-[#861e1e]">
        <LayoutDashboard className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-10 lg:h-10" />
        <span>Dashboard</span>
      </h2>
      {user && user.role == "admin" && (
        <div>
          <ChatBot className="my-10" />
          <TomCom />
          <StudentTable studentData = {students} />
          {feedbacks && (
            <div className="flex justify-between items-center flex-col md:flex-row gap-16 max-w-7xl mx-auto py-10">
              <Feedbackchart feedback={feedbacks} />
              <FeedbackStudent feedback={feedbacks} />
            </div>
          )}
          {complaints && <Complaints complaints={complaints} />}
        </div>
      )}
    </div>
  );
};

export default page;
