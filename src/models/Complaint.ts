// src/models/complaint.ts

import { Schema, model, models, Document } from 'mongoose';

// Define the TypeScript interface
export interface IComplaint extends Document {
  studentId: string;
  studentName: string;
  studentYear: string;
  complaintTitle: string;
  complaintDescription: string;
  status: string;
  imageUrl?: string; // Optional field
}

// Define the Mongoose schema
const ComplaintSchema = new Schema<IComplaint>({
  studentId: { type: String, required: true },
  studentName: { type: String, required: true },
  studentYear: { type: String, required: true },
  complaintTitle: { type: String, required: true },
  complaintDescription: { type: String, required: true },
  status: { type: String, default: "pending" },
  imageUrl: { type: String, default: '' }, 
},{
  timestamps:true
});

// Create the model
const Complaint = models.Complaint || model<IComplaint>('Complaint', ComplaintSchema);

export default Complaint;
