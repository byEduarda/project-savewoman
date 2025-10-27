import { Request, Response } from "express";
import Content from "../models/content.model";

export const getAllContents = async (req: Request, res: Response) => {
  try {
    const contents = await Content.find();
    if (contents.length === 0)
      return res.status(200).json({ message: "Nenhum conteúdo disponível no momento." });
    res.status(200).json(contents);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar conteúdos.", error });
  }
};

export const createContent = async (req: Request, res: Response) => {
  try {
    const { title, description, category, link } = req.body;
    if (!title || !description || !category || !link)
      return res.status(400).json({ message: "Preencha todos os campos obrigatórios." });

    const newContent = new Content({ title, description, category, link });
    await newContent.save();

    res.status(201).json({ message: "Conteúdo criado com sucesso!", content: newContent });
  } catch (error) {
    res.status(500).json({ message: "Erro ao criar conteúdo.", error });
  }
};