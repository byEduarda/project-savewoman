import { Request, Response } from "express";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const crisisKeywords = [
  "suicida",
  "suicídio",
  "me machucar",
  "sofrendo abuso",
  "violência",
  "ameaçado",
  "perigo",
  "não aguento",
  "crise emocional",
];

export const chatWithAI = async (req: Request, res: Response) => {
  try {
    const { message } = req.body;

    if (!message) return res.status(400).json({ message: "Envie uma pergunta." });

    const lower = message.toLowerCase();
    const isCrisis = crisisKeywords.some(k => lower.includes(k));

    if (isCrisis) {
      return res.status(200).json({
        reply:
          "Parece que você está em uma situação de risco! Sinto muito que você esteja passando por algo tão difícil. É importante não enfrentar isso sozinha. Busque ajuda ligando para 188 (CVV) ou 180 (Central de Atendimento à Mulher). Se possível, procure também um profissional de saúde mental — você merece cuidado e escuta."
      });
    }

    const endpoint =
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

    const response = await axios.post(
      `${endpoint}?key=${process.env.AI_STUDIO_API_KEY}`,
      {
        contents: [
          {
            parts: [
              {
                text: `Você é um assistente que ajuda com dúvidas emocionais, segurança e relacionamentos e saúde mental/emocional. Sempre sugira ajuda profissional quando necessário.\n\nUsuário: ${message}`,
              },
            ],
          },
        ],
      },
      { headers: { "Content-Type": "application/json" } }
    );

    const aiReply =
      response.data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Desculpe, não consegui gerar uma resposta no momento.";

    res.status(200).json({ reply: aiReply });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao processar a mensagem." });
  }
};
