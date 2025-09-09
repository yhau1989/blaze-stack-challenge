export type IncidentType = "network" | "hardware" | "software" | "security";

export interface Incident {
  id: number;
  title: string;
  description?: string;
  type: IncidentType;
  location?: string;
  image?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
