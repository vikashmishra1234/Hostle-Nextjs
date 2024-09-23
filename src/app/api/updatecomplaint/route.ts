import connectToDatabase from "@/lib/dbConnect";
import Complaint from "@/models/Complaint";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest) {
  try {
    // Connect to the database
    await connectToDatabase();
    
    // Extract studentId from the query parameters
    const url = new URL(request.url);
    const complaintId = url.searchParams.get('complaintId');

    // Check if studentId is provided
    if (!complaintId) {
      return NextResponse.json({ error: 'Student ID is required' }, { status: 400 });
    }


    const existingComplaint = await Complaint.findById(complaintId);
    

    if (!existingComplaint) {
      return NextResponse.json({ error: 'Unable to find student' }, { status: 404 });
    }

    
    existingComplaint.status = "solved";
    await existingComplaint.save();

    return NextResponse.json({ success:true, message: 'complaint marked as solve!' });
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json({ error: 'Failed to mark as solved.',success:false }, { status: 500 });
  }
}
