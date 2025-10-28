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
{
    versionKey: false, 
    toJSON: {
      transform: (_doc, ret) => {
        const date = new Date(ret.createdAt);
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0"); 
        const year = date.getFullYear();

        ret.createdAt = `${day}/${month}/${year}`;
        return ret;
      },
    },
  }
);  

export default mongoose.model<IInstitution>("Institution", InstitutionSchema);