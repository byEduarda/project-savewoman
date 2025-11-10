import { Schema, model, Document } from "mongoose";

export interface IContact extends Document {
  categoria: string;
  nome: string;
  numero: string;
  descricao: string;
  link?: string;
  createdAt: Date;
}

const ContactSchema = new Schema<IContact>({
  categoria: { type: String, required: true },
  nome: { type: String, required: true },
  numero: { type: String, required: true },
  descricao: { type: String, required: true },
  link: { type: String },
  createdAt: { type: Date, default: Date.now }
});

export default model<IContact>("Contact", ContactSchema);
