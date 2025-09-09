import { Router, Request } from "express";
import multer from "multer";
import { IncidentSchema } from "../types/incident-zod";
import { readIncidents, writeIncidents } from "../utils/incidents-storage";

const router = Router();

// Configuración de multer para guardar archivos en uploads/
const storage = multer.diskStorage({
  destination: function (
    req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, destination: string) => void
  ) {
    cb(null, "uploads/");
  },
  filename: function (
    req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, filename: string) => void
  ) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});
const upload = multer({ storage });

router.get("/", async (_, res) => {
  try {
    const incidents = await readIncidents();
    res.json(incidents);
  } catch {
    res.status(500).json({ error: "Error reading data" });
  }
});

router.post("/", upload.single("image"), async (req: Request, res) => {
  const file = (req as any).file as Express.Multer.File | undefined;
  const incidentData = {
    ...req.body,
    image: file ? file.path : undefined,
  };
  const parseResult = IncidentSchema.safeParse(incidentData);
  if (!parseResult.success) {
    if (file) {
      const fs = require("fs");
      fs.unlink(file.path, () => {});
    }
    return res.status(400).json({
      error: "Invalid Incident object",
      details: parseResult.error.issues,
    });
  }
  try {
    const incidents = await readIncidents();
    const newIncident = {
      id: incidents.length + 1,
      ...parseResult.data,
      createdAt: new Date(),
    };
    incidents.push(newIncident);
    await writeIncidents(incidents);
    res.status(201).json(newIncident);
  } catch {
    res.status(500).json({ error: "Error saving data" });
  }
});

export default router;
