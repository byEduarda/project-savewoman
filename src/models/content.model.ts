import mongoose, { Schema, Document } from "mongoose";
import { version } from "os";

export interface IContent extends Document {
  title: string;
  description: string;
  category: string;
  link: string;
  createdAt: Date;
}

const ContentSchema = new Schema<IContent>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  link: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
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

export default mongoose.model<IContent>("Content", ContentSchema);