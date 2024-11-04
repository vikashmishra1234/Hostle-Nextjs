import mongoose, { Schema, Document, Model } from 'mongoose';

// Define the interface for the model
interface IATTENDANCE extends Document {
  rollNumber: string;
  isPresent: boolean;
  studentName:string;
  studentYear:string;
}

// Create the schema
const AttendanceSchema: Schema<IATTENDANCE> = new Schema(
  {
    rollNumber: { type: String, required: true,unique:false },
    studentName: { type: String, required: true },
    studentYear: { type: String, required: true },
    isPresent: { type: Boolean, required: true,default:false }, 
  },
  {
    timestamps: true,
  }
);

// Create the model
const Attendance: Model<IATTENDANCE> =
  mongoose.models.Attendance || mongoose.model<IATTENDANCE>('Attendance', AttendanceSchema);

export default Attendance;
