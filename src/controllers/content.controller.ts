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


export const getContentsByCategory = async (req: Request, res: Response) => {
  try {
    const { category } = req.params;
    const contents = await Content.find({ category: { $regex: category, $options: "i" } });
    if (contents.length === 0)
      return res.status(200).json({ message: `Nenhum conteúdo encontrado na categoria: ${category}.` });

    res.status(200).json(contents);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar conteúdos por categoria.", error });
  }
};


export const getContentById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const content = await Content.findById(id);
    if (!content)
      return res.status(404).json({ message: "Conteúdo não encontrado." });

    res.status(200).json(content);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar conteúdo por ID.", error });
  }
};


export const deleteContentById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedContent = await Content.findByIdAndDelete(id);
    if (!deletedContent)
      return res.status(404).json({ message: "Conteúdo não encontrado para exclusão." });

    res.status(200).json({ message: "Conteúdo excluído com sucesso!", content: deletedContent });
  } catch (error) {
    res.status(500).json({ message: "Erro ao excluir conteúdo por ID.", error });
  }
};


export const updateContentById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, description, category, link } = req.body;

    const updatedContent = await Content.findByIdAndUpdate(
      id,
      { title, description, category, link },
      { new: true }
    );

    if (!updatedContent)
      return res.status(404).json({ message: "Conteúdo não encontrado para atualização." });

    res.status(200).json({ message: "Conteúdo atualizado com sucesso!", content: updatedContent });
  } catch (error) {
    res.status(500).json({ message: "Erro ao atualizar conteúdo por ID.", error });
  }
};


