import { Request, Response } from "express";
import Contact from "../models/contact.model";

export const createContact = async (req: Request, res: Response) => {
  try {
    const { categoria, nome, numero, descricao, link } = req.body;

    if (!categoria || !nome || !numero || !descricao) {
      return res.status(400).json({ error: "Todos os campos obrigatórios devem ser preenchidos." });
    }

    const contact = await Contact.create({ categoria, nome, numero, descricao, link });
    res.status(201).json(contact);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao criar contato útil." });
  }
};

export const getContacts = async (_req: Request, res: Response) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json(contacts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar contatos úteis." });
  }
};

export const getContactById = async (req: Request, res: Response) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ error: "Contato não encontrado." });
    res.status(200).json(contact);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar contato." });
  }
};

export const deleteContact = async (req: Request, res: Response) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) return res.status(404).json({ error: "Contato não encontrado." });
    res.status(200).json({ message: "Contato removido com sucesso." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao remover contato." });
  }
};
