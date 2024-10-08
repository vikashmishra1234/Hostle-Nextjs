import connectToDatabase from "@/lib/dbConnect";
import Complaint from "@/models/Complaint";
import { NextRequest, NextResponse } from "next/server";

// Define the type of expected request body
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

    return NextResponse.json({ success: true, message: "Complaint is added!", data: newComplaint });
  } catch (error) {
    // Type safe error handling
    if (error instanceof Error) {
      console.log(error.message);
      return NextResponse.json(
        { error: "Failed to add complaint.", success: false },
        { status: 500 }
      );
    } else {
      // For non-Error types (just in case)
      console.log("Unexpected error:", error);
      return NextResponse.json(
        { error: "An unexpected error occurred.", success: false },
        { status: 500 }
      );
    }
  }
}
