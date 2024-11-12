import connectToDatabase from "@/lib/dbConnect";
import Student from "@/models/Student";
import {NextRequest, NextResponse } from "next/server";

export async function GET(request:NextRequest) {
  try {
    await connectToDatabase();
   

    const students = await Student.find({})
    const newStudents = students.filter((student)=>!student.feeStatus)
    if (newStudents.length<=0) {
      return NextResponse.json({ error: 'no student found' }, { status: 404 });
    }

    return NextResponse.json({ success:true, newStudents });
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json({ error: 'Failed to update student.',success:false }, { status: 500 });
  }
}
