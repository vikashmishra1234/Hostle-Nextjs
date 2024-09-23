import connectToDatabase from "@/lib/dbConnect";
import Student from "@/models/Student";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest) {
  try {
    // Connect to the database
    await connectToDatabase();
    
    // Extract studentId from the query parameters
    const url = new URL(request.url);
    const studentId = url.searchParams.get('studentId');

    // Check if studentId is provided
    if (!studentId) {
      return NextResponse.json({ error: 'Student ID is required' }, { status: 400 });
    }

    console.log(studentId)
    const existingStudent = await Student.findById(studentId);
    
    // Handle case when student is not found
    if (!existingStudent) {
      return NextResponse.json({ error: 'Unable to find student' }, { status: 404 });
    }

    // Toggle feeStatus
    existingStudent.feeStatus = !existingStudent.feeStatus;
    await existingStudent.save();

    return NextResponse.json({ success:true, message: 'Student updated successfully!' });
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json({ error: 'Failed to update student.',success:false }, { status: 500 });
  }
}
