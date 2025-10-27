import mongoose, { Schema, Document } from "mongoose";

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
});

export default mongoose.model<IContent>("Content", ContentSchema);