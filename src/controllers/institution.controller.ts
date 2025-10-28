import { Request, Response } from 'express';
import Institution from '../models/institution.model';

export const createInstitution = async (req: Request, res: Response) => {
  try {
    const content = await Institution.create(req.body);
    res.status(201).json({ content, message: 'Instituição cadastrada com sucesso!' });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao cadastrar instituição', error: err });
  }
};

export const getAllInstitutions = async (req: Request, res: Response) => {
  try {
    const content = await Institution.find();
    res.status(200).json({ content, message: 'Instituições listadas com sucesso' });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao listar instituições', error: err });
  }
};

export const getInstitutionById = async (req: Request, res: Response) => {
  try {
    const content = await Institution.findById(req.params.id);
    if (!content) return res.status(404).json({ message: 'Instituição não encontrada' });
    res.status(200).json({ content, message: 'Instituição encontrada' });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar instituição', error: err });
  }
};

export const getInstitutionsByCity = async (req: Request, res: Response) => {
  try {
    const content = await Institution.find({ city: req.params.city });
    res.status(200).json({ content, message: 'Instituições por cidade' });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar instituições por cidade', error: err });
  }
};

export const updateInstitution = async (req: Request, res: Response) => {
  try {
    const content = await Institution.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ content, message: 'Instituição atualizada com sucesso' });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao atualizar instituição', error: err });
  }
};

export const deleteInstitution = async (req: Request, res: Response) => {
  try {
    await Institution.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Instituição removida com sucesso' });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao deletar instituição', error: err });
  }
};
