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