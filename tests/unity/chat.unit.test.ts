import { chatWithAI } from "../../src/controllers/chat.controller";
import axios from "axios";
import { Request, Response } from "express";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("Chat Controller - Unit", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    jest.clearAllMocks();
  });

  it("should detect crisis keywords and return support message", async () => {
    req.body = { message: "Estou pensando em me machucar" };

    await chatWithAI(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        reply: expect.stringMatching(/você esteja passando por algo tão difícil/i),
      })
    );
  });

  it("should call AI API and return AI reply if not crisis", async () => {
    req.body = { message: "Olá, tudo bem?" };

    mockedAxios.post.mockResolvedValueOnce({
      data: {
        candidates: [
          { content: { parts: [{ text: "Olá! Estou bem, e você?" }] } },
        ],
      },
    });

    await chatWithAI(req as Request, res as Response);

    expect(mockedAxios.post).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        reply: "Olá! Estou bem, e você?",
      })
    );
  });

  it("should return 400 if message is missing", async () => {
    req.body = {}; 

    await chatWithAI(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ message: "Envie uma pergunta." })
    );
  });

  it("should handle errors gracefully", async () => {
    req.body = { message: "Oi" };
    mockedAxios.post.mockRejectedValueOnce(new Error("Erro de rede"));

    await chatWithAI(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ message: "Erro ao processar a mensagem." })
    );
  });
});
