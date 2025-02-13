import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import FeedbackButton from "./FeedbackButton";
import { getStudentComplaint } from "@/app/utils";
import Complaints from "./Complaints";
import Attendence from "./Attendence";
import WelcomeContent from "./Welcome";
import ChatBot from "@/Components/Chatbot/ChatBot";

type User = {
  role?: string | undefined;
  rollNumber?: string | undefined;
  studentYear: string | undefined;
  studentName: string | undefined;
};

const Page = async () => {
  const session = await getServerSession(authOptions);
  const user = session?.user as User;
  const studentName = session?.user?.studentName || "Guest";
  const studentComplaints = await getStudentComplaint(user?.rollNumber,false);

  return (
    <div className="container mx-auto pb-10 px-4">
      <ChatBot className=""/>
      <WelcomeContent studentName={studentName} />
      <FeedbackButton user={user} />
      <Attendence user={user} />
      {studentComplaints && (
        <div>
          <Complaints complaints={studentComplaints} />
        </div>
      )}
    </div>
  );
};

export default Page;
