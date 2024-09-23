import connectToDatabase from "@/lib/dbConnect";
import Student from "@/models/Student";
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import bcrypt, { genSalt } from 'bcryptjs'

export async function POST(request: NextRequest) {
  try {
    connectToDatabase()
    const body = await request.json();  // Parse the request body
    const { studentEmail, studentPhone, rollNumber } = body;
    const existingStudent = await Student.findOne({
      $or: [{ studentEmail }, { studentPhone },{ rollNumber }]
    });

    if (existingStudent) {
      return NextResponse.json({ error: 'Student with this email or phone or rollNumber already exists.' },{status:409});
    }
    const token = await getToken({req:request,secret:"vikash mishra"})
    if(!token){
      return NextResponse.json({
        error:"unathorized"
      },{
        status:401
      }
    )
    }
    body.adminId = token.adminId
    const hashPass = await bcrypt.hash(body.studentPassword,10);
    body.studentPassword = hashPass;
    const student = new Student(body);
    await student.save();

    return NextResponse.json({ message: 'Student created successfully!', student });
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json({ error: 'Failed to add student.' });
  }
}
