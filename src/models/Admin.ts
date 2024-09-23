import mongoose, { Schema, Document } from 'mongoose';

// Define the interface for the model
interface IAdmin extends Document {
  adminId: string;
  password: string;
}

// Create the schema
const AdminSchema: Schema = new Schema({
  adminId: { type: String, required: true, unique: true },
  password: { type: String, required: true },
},{
  timestamps:true
});

// Create the model
const Admin = mongoose.models.Admin || mongoose.model<IAdmin>('Admin', AdminSchema);

export default Admin;
