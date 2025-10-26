import express from "express";
import cors from "cors";

import contentRoutes from "./routes/content.routes";
import institutionRoutes from "./routes/institution.routes";
import chatRoutes from "./routes/chat.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/contents", contentRoutes);
app.use("/institutions", institutionRoutes);
app.use("/chat", chatRoutes);

if (process.env.ENABLE_USER_ROUTES === "true") {
  const userRoutes = require("./routes/user.routes").default;
  app.use("/users", userRoutes);
}

app.get("/", (req, res) => res.send("🌸Save Woman no ar!"));

export default app;
