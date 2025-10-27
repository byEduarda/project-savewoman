import express from "express";
import cors from "cors";

import chatRoutes from "./routes/chat.routes";
import institutionRoutes from "./routes/institution.routes";
import contentRoutes from "./routes/content.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send("🌸Save Woman no ar!"));

app.use("/contents", contentRoutes);
app.use("/institutions", institutionRoutes);
app.use("/chat", chatRoutes);


export default app;
