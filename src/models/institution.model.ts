import mongoose, { Schema, Document } from "mongoose";

export interface IInstitution extends Document {
  name: string;
  address: string;
  phone: string;
  website?: string;
  city: string;
}

const InstitutionSchema = new Schema<IInstitution>({
  name: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: String, required: true },
  website: { type: String },
  city: { type: String, required: true },
},
{ versionKey: false} 
    
);  

export default mongoose.model<IInstitution>("Institution", InstitutionSchema);