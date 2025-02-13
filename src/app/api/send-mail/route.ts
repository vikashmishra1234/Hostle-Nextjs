import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/app/utils/Nodemailer";

export async function POST(request: NextRequest) {
  try {
   
    const body = await request.json(); 
    const {name,message,email} = body;
    await sendEmail(name,message,"",email)

    return NextResponse.json({ message: 'message send ' });
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json({ error: 'Failed to sendt message.' });
  }
}
