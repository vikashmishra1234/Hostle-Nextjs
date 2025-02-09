"use server"
import connectToDatabase from "@/lib/dbConnect";
import Complaint from "@/models/Complaint";
import Feedback from "@/models/Feedback";
import Students from "@/models/Student";
import Attendence from "@/models/Attendence";
import { endOfDay, startOfDay, subDays } from "date-fns";
import { sendEmail } from "./utils/Nodemailer";
import { Student } from "@/types/types";

export const fetchStudents = async()=>{
  try {
    await connectToDatabase();
    const getData = await Students.find({});
    const studentData:Student[] = getData.map((student: any) => ({
      ...student.toObject(),
      _id: student._id.toString(),
    }));
    return studentData;
  } catch (error: any) {
    console.error('Error fetching student data:', error.message);
    return null;
  }
}

export const addFeedback = async(data:any):Promise<boolean>=>{
    try {
      await connectToDatabase();
      if(!data.rollNumber){
        console.log("studentId not found");
        return false
      }
      console.log(data)
      const newFeedback = new Feedback(data);
      await newFeedback.save();
      console.log("feedback added successfully")
      return true;
    } catch (error:any) {
      console.log(error)
      return false;
    }
}
export const RegisterComplaint = async(data:any):Promise<boolean>=>{
    try {
     
      await connectToDatabase();
      if(!data.studentId){
        console.log("studentId not found");
        return false
      }
      const isSent = await sendEmail(data.complaintTitle,data.complaintDescription,data.imageUrl)
      if(!isSent){
        console.log("email is not sent")
        return false
      }
      const newComplaint = new Complaint(data);
      await newComplaint.save();
      console.log("complaint added successfully")
      return true;
    } catch (error:any) {
      console.log(error)
      return false;
    }
}
export const getStudentComplaint = async(rollNumber:any):Promise<any>=>{
    try {
      await connectToDatabase();
      if(!rollNumber){
        console.log("rollNumber not found");
        return false
      }

         const today = new Date();
    const yesterday = subDays(today, 1); 

    const studentComplaint = await Complaint.find({
      studentId:rollNumber,
      createdAt: {
        $gte: startOfDay(yesterday), // Start of yesterday
        $lt: endOfDay(today), // End of today
      },
    });

      if(studentComplaint&&studentComplaint.length==0){
          return false;
      }
     const complaints = studentComplaint.map((comp: any) => ({
        ...comp.toObject(),
        _id: comp._id.toString(),
      }));
      return complaints;
    } catch (error:any) {
      console.log(error)
      return false;
    }
}

export const getAllStudentComplaints = async()=>{
  try {
    await connectToDatabase();

    const today = new Date();
    const yesterday = subDays(today, 7);

    const getData = await Complaint.find({
      createdAt: {
        $gte: startOfDay(yesterday),
        $lt: endOfDay(today), 
      },
    });
    if(getData&& (getData.length==0)){
      return false
    }
   const complaints = getData.map((comp: any) => ({
      ...comp.toObject(),
      _id: comp._id.toString(),
    }));
    return complaints
  } catch (error: any) {
    console.error('Error fetching complaints data:', error.message);
    return false
  }
}

export const getFeedback = async()=>{
  try {
    await connectToDatabase();
    const today = new Date();
    const yesterday = subDays(today,7)

    const feedbacks = await Feedback.find({
      createdAt: {
        $gte: startOfDay(yesterday),
        $lt: endOfDay(today), 
      },
    });
    if(feedbacks&& (feedbacks.length==0)){
      return false
    }
   const data = feedbacks.map((comp: any) => ({
      ...comp.toObject(),
      _id: comp._id.toString(),
    }));
    return data
  } catch (error:any) {
    console.log(error)
    return false
  }
}

export const MarkAttendece = async(rollNumber:string,studentName:string|undefined,studentYear:string|undefined)=>{
  try {
    if (!rollNumber) {
      return {
        message: 'Roll Number is undefined',
        success: false,
      };
    }

    await connectToDatabase();

    // Get the start and end of the current day to query attendance for today
    const start = startOfDay(new Date());
    const end = endOfDay(new Date());

    // Check if attendance is already marked for today
    const existingAttendance = await Attendence.findOne({
      rollNumber,
      createdAt: { $gte: start, $lte: end }, // Query for today's attendance
    });

    if (existingAttendance) {
      return {
        message: 'Attendance already marked for today',
        success: false,
      };
    }

    // Create new attendance entry
    const newAttendance = await Attendence.create({
      rollNumber,
      studentName,
      studentYear,
      isPresent: true,
    });

    console.log(newAttendance);
    console.log('Attendance marked');

    return {
      success: true,
      message: 'Attendance marked successfully',
    };
  } catch (error: any) {
    console.error(error);
    return {
      success: false,
      message: 'Something went wrong',
    };
  }
}


export const fetchTodaysAttendance = async () => {
  try {
  

    await connectToDatabase(); // Ensure the database connection is established

    const start = startOfDay(new Date());
    const end = endOfDay(new Date());

    // Query to find attendance for the provided roll number today
    const todaysAttendance = await Attendence.find({
      createdAt: { $gte: start, $lte: end }, // Attendance between start and end of today
    });

    if (todaysAttendance.length === 0) {
      return {
        success: true,
        message: "No attendance marked for today.",
        data: null,
      };
    }

    return {
      success: true,
      message: "Attendance fetched successfully.",
      data: todaysAttendance,
    };
  } catch (error: any) {
    console.error("Error fetching today's attendance:", error);
    return {
      success: false,
      message: "Something went wrong while fetching attendance.",
      data: null,
    };
  }
};
