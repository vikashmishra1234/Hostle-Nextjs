"use client";
import { Typography, Box, Paper } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchStudents } from "@/app/utils";
import { List } from "lucide-react";

const style1 = {
  width: "340px",
  margin: "10px",
  border: "1px solid lightgray",
  borderRadius: "10px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  cursor: "pointer",
  "&:hover": {
    background: "lightgray",
  },
};
const TomCom = () => {
  const router = useRouter();
  const [studentData, setStudentData] = useState<any>();
  const [feeNotSub, setFeeNot] = useState<any>([]);
  useEffect(() => {
    const getData = async () => {
      try {
        const fetch: any = await fetchStudents();
        if (fetch) {
          setStudentData(fetch);
          const notSubmitedFees = fetch.filter(
            (item: any) => item.feeStatus == false
          );
          setFeeNot(notSubmitedFees);
        }
      } catch (error: any) {
        console.log(error);
      }
    };
    getData();
  }, []);
  return (
    <Box>
      <Paper
        elevation={3}
        sx={{
          width: "100%",
          height: "200px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Box sx={style1}>
          <Typography sx={{ fontSize: "2.3rem" }} component={"span"}>
            {studentData && studentData.length}
          </Typography>
          <Typography
            sx={{ color: "brown", fontSize: "1.6rem", fontWeight: "bold" }}
            component={"span"}
          >
            Total students
          </Typography>
        </Box>
        <Box sx={style1}>
          <Typography sx={{ fontSize: "2.3rem" }} component={"span"}>
            {feeNotSub && feeNotSub.length}
          </Typography>
          <Typography
            sx={{ color: "brown", fontSize: "1.6rem", fontWeight: "bold" }}
            component={"span"}
          >
            Not payed yet
          </Typography>
        </Box>
        <Box
          sx={style1}
          onClick={() => {
            router.push("/admin/dashboard/addstudent");
          }}
        >
          <Typography sx={{ fontSize: "2.3rem" }} component={"span"}>
            +
          </Typography>
          <Typography
            sx={{ color: "brown", fontSize: "1.6rem", fontWeight: "bold" }}
            component={"span"}
          >
            Add New Student
          </Typography>
        </Box>
        <Box
          sx={style1}
          onClick={() => {
            router.push("/admin/dashboard/attendence");
          }}
        >
          <Typography sx={{ fontSize: "2.3rem" }} component={"span"}>
          <List />
          </Typography>
          <Typography
            sx={{ color: "brown", fontSize: "1.6rem", fontWeight: "bold" }}
            component={"span"}
          >
            Todays Attendence
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default TomCom;
