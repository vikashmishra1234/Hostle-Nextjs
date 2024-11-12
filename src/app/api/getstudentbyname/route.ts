import connectToDatabase from "@/lib/dbConnect";
import Student from "@/models/Student";
import {NextRequest, NextResponse } from "next/server";

export async function GET(request:NextRequest) {
  try {
    await connectToDatabase();
    // Extract studentId from the query parameters
    const url = new URL(request.url);
    const studentName = url.searchParams.get('studentName');

    const students = await Student.find({
      studentName: { $regex: studentName, $options: 'i' } // 'i' makes the search case-insensitive
    });
    if (students.length<=0) {
      return NextResponse.json({ error: 'no student found' }, { status: 404 });
    }

    return NextResponse.json({ success:true, students });
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json({ error: 'Failed to update student.',success:false }, { status: 500 });
  }
}
