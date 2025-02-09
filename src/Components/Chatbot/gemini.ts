import { fetchStudents, getAllStudentComplaints, getFeedback } from "@/app/utils";
import { Student } from "@/types/types";
import { GoogleGenerativeAI } from "@google/generative-ai"; 

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API ||'your-api key';
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

// A function to fetch student data, complaints, and feedbacks and initialize the chat session
const fetchStudentsAndInitChat = async () => {
  try {
    const students: Student[] | null = await fetchStudents(); 
    const complaints:any = await getAllStudentComplaints();
    const feedback:any = await getFeedback();

    if (!students || students.length === 0) {
      throw new Error("No students found.");
    }

    // Format the student data for chat history
    const history = students.map((studentData) => ({
      role: "user",
      parts: [
        {
          text: `
            **Student Roll No:** ${studentData.rollNumber}
            **Name:** ${studentData.studentName}
            **Father Name:** ${studentData.studentFatherName}
            **Phone:** ${studentData.studentPhone}
            **Email:** ${studentData.studentEmail}
            **Fee Submitted:** ${studentData.feeStatus ? "Yes" : "No"}
            **Student Address:** ${studentData.studentAddress}
          `,
        },
      ],
    }));

    // Add complaints to the history
    complaints.forEach((complaint:any) => {
      history.push({
        role: "user",
        parts: [
          {
            text: `
              **Complaint Title:** ${complaint.complaintTitle}
              **Student Name:** ${complaint.studentName}
              **Year:** ${complaint.studentYear}
              **Complaint Description:** ${complaint.complaintDescription}
              **Status:** ${complaint.status}
              ${complaint.imageUrl ? `**Image URL:** ${complaint.imageUrl}` : ""}
            `,
          },
        ],
      });
    });

    // Add feedback to the history
    feedback.forEach((feedbackData:any) => {
      history.push({
        role: "user",
        parts: [
          {
            text: `
              **Student Name:** ${feedbackData.studentName}
              **Roll Number:** ${feedbackData.rollNumber}
              **Year:** ${feedbackData.studentYear}
              **Quality:** ${feedbackData.qaulity}
              **Feedback Description:** ${feedbackData.description}
            `,
          },
        ],
      });
    });

    // Start the chat session with the initial history
    const chatSession = model.startChat({
      generationConfig,
      history,
    });

    return { chatSession, history };
  } catch (error) {
    console.error("Error fetching students or initializing chat:", error);
    return { chatSession: null, history: [] };
  }
};

const run = async (input: string) => {
   
  const { chatSession, history } = await fetchStudentsAndInitChat();

  if (!chatSession) {
    console.error("Chat session could not be initialized.");
    return;
  }

  // Send user input to the model and get the response
  const result = await chatSession.sendMessage(input);

  // Append the latest user input and response to the history
  history.push(
    { role: "user", parts: [{ text: input }] },
    { role: "assistant", parts: [{ text: result.response.text() }] }
  );

  console.log(result.response.text());
  return result.response.text();
};

export default run;
