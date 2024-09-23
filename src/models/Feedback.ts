// src/models/complaint.ts

import { Schema, model, models, Document } from 'mongoose';

// Define the TypeScript interface
export interface IFeedback extends Document {
    rollNumber: string;
  studentName: string;
  studentYear: string;
  qaulity:string;
  description:string;
}

// Define the Mongoose schema
const FeedbackSchema = new Schema<IFeedback>({
  rollNumber: { type: String, required: true },
  studentName: { type: String, required: true },
  studentYear: { type: String, required: true },
  qaulity:{type:String, required:true},
  description:{type:String,default:""}
},{
  timestamps:true
});

// Create the model
const Feedback = models.Feedback || model<IFeedback>('Feedback', FeedbackSchema);

export default Feedback;
