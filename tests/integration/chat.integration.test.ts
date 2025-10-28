import request from "supertest";
import app from "../../src/app";
import axios from "axios";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("Chat Routes - Integration", () => {
  it("POST /chat - should detect crisis message", async () => {
    const res = await request(app)
      .post("/chat")
      .send({ message: "Estou sofrendo abuso" });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("reply");
    expect(res.body.reply).toMatch(/você esteja passando por algo tão difícil/i);
  });

  it("POST /chat - should return AI reply when no crisis", async () => {
    mockedAxios.post.mockResolvedValueOnce({
      data: {
        candidates: [
          { content: { parts: [{ text: "Resposta gerada pela IA" }] } },
        ],
      },
    });

    const res = await request(app)
      .post("/chat")
      .send({ message: "Olá, tudo bem?" });

    expect(mockedAxios.post).toHaveBeenCalled();
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("reply", "Resposta gerada pela IA");
  });

  it("POST /chat - should return 400 if message missing", async () => {
    const res = await request(app).post("/chat").send({});
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("message", "Envie uma pergunta.");
  });
});
