"use server"
import connectToDatabase from "@/lib/dbConnect";
import Complaint from "@/models/Complaint";
import Feedback from "@/models/Feedback";
import Student from "@/models/Student";
import { endOfDay, startOfDay, subDays } from "date-fns";
import { sendEmail } from "./utils/Nodemailer";

export const fetchStudents = async()=>{
  try {
    await connectToDatabase();
    const getData = await Student.find({});
    const studentData = getData.map((student: any) => ({
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
    const yesterday = subDays(today, 1);

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

    const feedbacks = await Feedback.find({
      createdAt: {
        $gte: startOfDay(today),
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
