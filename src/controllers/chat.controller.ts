import { Request, Response } from "express";

export const chatWithAI = async (req: Request, res: Response) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ message: "Envie uma pergunta." });
    }

    const reply = `Recebi sua pergunta: "${message}". Para orientação ou ajuda imediata, procure uma instituição local ou ligue para o 180 (Central de Atendimento à Mulher).`;

    res.status(200).json({ reply });
  } catch (error) {
    res.status(500).json({ message: "Erro ao processar a mensagem.", error });
  }
};