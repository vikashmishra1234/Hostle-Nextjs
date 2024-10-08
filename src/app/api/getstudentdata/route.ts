import connectToDatabase from "@/lib/dbConnect";
import Student from "@/models/Student";
import {NextResponse } from "next/server";

export async function GET() {
  try {
    await connectToDatabase();
    const students = await Student.find({})
    if (students.length<=0) {
      return NextResponse.json({ error: 'no student found' }, { status: 404 });
    }

    return NextResponse.json({ success:true, students });
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json({ error: 'Failed to update student.',success:false }, { status: 500 });
  }
}
