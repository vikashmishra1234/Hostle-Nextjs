import { Box, Container } from "@mui/material";
import Image from "next/image";
import React from "react";
import image from "@/assets/hostlergi.gif";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import Link from "next/link";
import FeedbackButton from "./FeedbackButton";
import { getStudentComplaint } from "@/app/utils";
import Complaints from "./Complaints";
import Attendence from "./Attendence";
import WelcomeContent from "./Welcome";

type User = {
  role?:string|undefined
    rollNumber?:string|undefined;
    studentYear:string|undefined
    studentName:string|undefined
}
const page = async () => {
  const session = await getServerSession(authOptions);
  const user = session?.user as User;
  const studentName = session?.user?.studentName || "Guest";
  const studentComplaints = await getStudentComplaint(user?.rollNumber);

  return (
    <>
      <Container sx={{ paddingBottom: "40px" }}>
       <WelcomeContent studentName={studentName}/>
        <FeedbackButton user={user} />
        <Attendence user={user}/>
        <Box>
          {studentComplaints ? (
            <Box>
              <Complaints complaints={studentComplaints} />
            </Box>
          ) : (
            ""
          )}
        </Box>
      </Container>
    </>
  );
};

export default page;
