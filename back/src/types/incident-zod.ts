import { z } from "zod";

export const IncidentTypeEnum = z.enum([
  "network",
  "hardware",
  "software",
  "security",
]);

export const IncidentSchema = z.object({
  title: z.string().min(1, { message: "'tittle' field is required" }),
  description: z.string().optional(),
  type: IncidentTypeEnum,
  location: z.string().optional(),
  image: z.string().optional(),
});
