import { Box, Container } from "@mui/material";
import Image from "next/image";
import React from "react";
import image from "@/assets/hostlergi.gif";
import AnimatedText from "@/Components/clientComponents/AnimatedText";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import Link from "next/link";
import FeedbackButton from "./FeedbackButton";
import { getStudentComplaint } from "@/app/utils";
import Complaints from "./Complaints";

const page = async () => {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  const studentName = session?.user?.studentName || "Guest";
  const studentComplaints = await getStudentComplaint(user?.rollNumber);

  return (
    <>
      <Container sx={{ paddingBottom: "40px" }}>
        <div className="h-fit pb-[100px] pt-[100px]">
          <div className="h-[65%] pb-[40px] flex flex-col md:flex-row gap-10 items-center justify-between">
            <h4 className="text-[2.4rem]  sm:text-[3rem]  text-center whitespace-pre-wrapfont-bold">
              Welcome back,
              <AnimatedText name={studentName} />
            </h4>
            <div>
              <Image height={400} width={350} src={image} alt="image" />
            </div>
          </div>
          <Link
            href={{
              pathname: "/hostler/registercomplaint",
              query: { user: JSON.stringify(user) }, 
            }}
            className="bg-[#d85a5a] text-[19px] px-[20px] py-[7px] rounded-[5px] text-white"
          >
            Register Complaint
          </Link>
        </div>
        <FeedbackButton user={user} />
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
