import connectToDatabase from "@/lib/dbConnect";
import Complaint from "@/models/Complaint";
import { NextRequest, NextResponse } from "next/server";

// Define the type of expected request body (Optional, depending on your body structure)
interface ComplaintBody {
  complaintTitle: string;
  complaintDescription: string;
  imageUrl?: string;
}

export async function POST(request: NextRequest) {
  const studentId = "12345";
  const studentName = "vikash";
  const studentYear = "2"; // should be a number, not a string

  try {
    // Connect to the database
    await connectToDatabase();

    // Parse the request body with type safety
    const body: ComplaintBody = await request.json();

    // Create a new complaint using the Mongoose model
    const newComplaint = await Complaint.create({
      ...body,
      studentId,
      studentName,
      studentYear,
    });

    return NextResponse.json({ success: true,message:"complaint is added!", data: newComplaint });
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json(
      { error: "Failed to add complaint.", success: false },
      { status: 500 }
    );
  }
}
