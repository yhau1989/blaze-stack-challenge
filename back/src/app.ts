const cors = require("cors");
import express from "express";
import incidentsRouter from "./routes/incidents";

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
const allowedOrigins = ["http://localhost:8081", "http://localhost:8082"];
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

app.use("/api/incidents", incidentsRouter);
app.use("/uploads", express.static("uploads"));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
