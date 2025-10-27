import dotenv from "dotenv";
import app from "./app";
import { connectToMongoDB } from "./database/mongo.connect";

dotenv.config();

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await connectToMongoDB();
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  } catch (error) {
    console.error("Falha ao iniciar o servidor:", error);
  }
};

startServer();
