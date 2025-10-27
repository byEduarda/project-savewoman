import { Request, Response } from "express";
import Institution from "../models/institution.model";

export const getInstitutions = async (req: Request, res: Response) => {
  try {
    const { city } = req.query;
    const query = city ? { city: { $regex: city, $options: "i" } } : {};

    const institutions = await Institution.find(query);
    if (institutions.length === 0)
      return res.status(200).json({ message: "Nenhuma instituição encontrada nesta área." });

    res.status(200).json(institutions);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar instituições.", error });
  }
};

export const createInstitution = async (req: Request, res: Response) => {
  try {
    const { name, address, phone, website, city } = req.body;
    if (!name || !address || !phone || !city)
      return res.status(400).json({ message: "Preencha todos os campos obrigatórios." });

    const newInstitution = new Institution({ name, address, phone, website, city });
    await newInstitution.save();

    res.status(201).json({ message: "Instituição cadastrada com sucesso!", institution: newInstitution });
  } catch (error) {
    res.status(500).json({ message: "Erro ao cadastrar instituição.", error });
  }
};

export const getInstitutionById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const institution = await Institution.findById(id);
    if (!institution)
      return res.status(404).json({ message: "Instituição não encontrada." });

    res.status(200).json(institution);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar instituição por ID.", error });
  }
};

export const deleteInstitutionById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const institution = await Institution.findByIdAndDelete(id);
    if (!institution)
      return res.status(404).json({ message: "Instituição não encontrada." });

    res.status(200).json({ message: "Instituição deletada com sucesso." });
  } catch (error) {
    res.status(500).json({ message: "Erro ao deletar instituição por ID.", error });
  }
};

export const updateInstitutionById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, address, phone, website, city } = req.body;

    const institution = await Institution.findById(id);
    if (!institution)
      return res.status(404).json({ message: "Instituição não encontrada." });

    institution.name = name || institution.name;
    institution.address = address || institution.address;
    institution.phone = phone || institution.phone;
    institution.website = website || institution.website;
    institution.city = city || institution.city;

    await institution.save();

    res.status(200).json({ message: "Instituição atualizada com sucesso.", institution });
  } catch (error) {
    res.status(500).json({ message: "Erro ao atualizar instituição por ID.", error });
  }
};

export const getInstitutionByCity = async (req: Request, res: Response) => {
  try {
    const { city } = req.params;
    const institutions = await Institution.find({ city: { $regex: city, $options: "i" } });
    if (institutions.length === 0)
      return res.status(200).json({ message: `Nenhuma instituição encontrada em: ${city}.` });

    res.status(200).json(institutions);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar instituições nessa localização.", error });
  }
};

