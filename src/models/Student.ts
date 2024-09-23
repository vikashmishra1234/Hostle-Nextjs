// models/Student.ts
import mongoose, { Document, Schema } from 'mongoose';

// Define an interface for the Student
interface IStudent extends Document {
  studentName: string;
  rollNumber: string;
  studentPhone: string;
  adminId: string;
  studentEmail: string;
  studentFatherName: string;
  studentAddress: string;
  studentYear: string;
  studentBranch: string;
  studentPassword: string;
  studentFatherPhone: string;
  feeStatus?:boolean;
}

// Create the Student schema
const StudentSchema: Schema = new Schema({
  studentName: { type: String, required: true },
  rollNumber: { type: String, required: true,unique:true },
  adminId: { type: String, required: true,unique:true },
  studentPhone: { type: String, required: true,unique:true },
  studentEmail: { type: String, required: true ,unique:true},
  studentFatherName: { type: String, required: true },
  studentAddress: { type: String, required: true },
  studentYear: { type: String, required: true },
  studentBranch: { type: String, required: true },
  studentFatherPhone: { type: String, required: true },
  studentPassword: { type: String, required: true },
  feeStatus: { type: Boolean, default:false },
},{
  timestamps:true
});

const Student = mongoose.models.Student || mongoose.model<IStudent>('Student', StudentSchema);

export default Student;
