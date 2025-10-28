import { Request, Response } from 'express';
import Content from '../models/content.model';

export const createContent = async (req: Request, res: Response) => {
  try {
    const content = await Content.create(req.body);
    res.status(201).json({ content, message: 'Conteúdo criado com sucesso!' });
  } catch (err: any) {
    res.status(500).json({ message: 'Erro ao criar conteúdo'});
  }
};

export const getAllContents = async (req: Request, res: Response) => {
  try {
    const content = await Content.find();
    res.status(200).json({ content, message: 'Conteúdos listados com sucesso!' });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao listar conteúdos'});
  }
};

export const getContentById = async (req: Request, res: Response) => {
  try {
    const content = await Content.findById(req.params.id);
    if (!content) return res.status(404).json({ message: 'Conteúdo não encontrado' });
    res.status(200).json({ content, message: 'Conteúdo encontrado' });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar conteúdo'});
  }
};

export const getContentsByCategory = async (req: Request, res: Response) => {
  try {
    const content = await Content.find({ category: req.params.category });
    res.status(200).json({ content, message: 'Conteúdos por categoria' });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar conteúdos por categoria', error: err });
  }
};

export const updateContent = async (req: Request, res: Response) => {
  try {
    const content = await Content.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ content, message: 'Conteúdo atualizado com sucesso' });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao atualizar conteúdo' });
  }
};

export const deleteContent = async (req: Request, res: Response) => {
  try {
    await Content.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Conteúdo removido com sucesso' });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao deletar conteúdo' });
  }
};
