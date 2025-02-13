import { fetchStudents, getAllStudentComplaints, getFeedback, getStudentComplaint, getStudentDetails } from "@/app/utils";
import { Student } from "@/types/types";
import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API || 'your-api-key';
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

let chatSession: any = null; // Store chat session globally

const fetchStudentsAndInitChat = async () => {
  try {
    const students: Student[] | null = await fetchStudents();
    const complaints: any = await getAllStudentComplaints(true);
    const feedback: any = await getFeedback();

    if (!students || students.length === 0) {
      throw new Error("No students found.");
    }

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

    // Add complaints
    complaints.forEach((complaint: any) => {
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

    // Add feedback
    feedback.forEach((feedbackData: any) => {
      history.push({
        role: "user",
        parts: [
          {
            text: `
              **Student Name:** ${feedbackData.studentName}
              **Roll Number:** ${feedbackData.rollNumber}
              **Year:** ${feedbackData.studentYear}
              **Quality:** ${feedbackData.quality}  // Fix typo here
              **Feedback Description:** ${feedbackData.description}
            `,
          },
        ],
      });
    });

    // Start the chat session
    chatSession = model.startChat({
      generationConfig,
      history,
    });

    return { chatSession, history };
  } catch (error) {
    console.error("Error initializing chat:", error);
    return { chatSession: null, history: [] };
  }
};

// Function to initialize chatbot
const initializeStudentBot = async(studentId:string|null)=>{
  console.log("this is sutdel")
    const complaints = await getStudentComplaint(studentId,true);
    const aboutStudent:Student|null = await getStudentDetails(studentId);
    if(!complaints || !aboutStudent){
      return false;
    }
    const history = complaints.map((complaint:any) => ({
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
    }));

      history.push({
        role: "user",
        parts: [
          {
            text: `
              You have serve for students. following are my details
              **My Roll No:** ${aboutStudent.rollNumber}
              **My Name:** ${aboutStudent.studentName}
              **My Father Name:** ${aboutStudent.studentFatherName}
              **My Phone:** ${aboutStudent.studentPhone}
              **My Email:** ${aboutStudent.studentEmail}
              **Fee Submitted:** ${aboutStudent.feeStatus ? "Yes" : "No"}
              **My Address:** ${aboutStudent.studentAddress}
            `,
          },
        ],
      });


      chatSession = model.startChat({
        generationConfig,
        history,
      });
      if(!chatSession){
        return false
      }
      return true
  
    
    
}
const initializeChatbot = async () => {
  const { chatSession: session } = await fetchStudentsAndInitChat();
  if (!session) {
    console.error("Chat session could not be initialized.");
    return false;
  }
  return true;
};

// Function to send messages to chatbot
const run = async (input: string) => {
  if (!chatSession) {
    console.error("Chat session is not initialized.");
    return null;
  }

  const result = await chatSession.sendMessage(input);
  const responseText = await result.response.text(); // Fix text extraction

  return responseText;
};

// Export the chatbot functions
const obj = {
  initializeBot: initializeChatbot,
  initializeStudentBot,
  runBot: run,
};

export default obj;
