import fs from "fs";
import path from "path";
import { Incident } from "../types/general-types";

const DATA_PATH = path.join(__dirname, "../../data/incidents.json");

export function readIncidents(): Promise<Incident[]> {
  return new Promise((resolve, reject) => {
    fs.readFile(DATA_PATH, "utf8", (err, data) => {
      if (err) return reject(err);
      try {
        const incidents: Incident[] = JSON.parse(data);
        incidents.sort((a, b) => b.id - a.id);
        resolve(incidents);
      } catch (e) {
        reject(e);
      }
    });
  });
}

export function writeIncidents(items: Incident[]): Promise<void> {
  return new Promise((resolve, reject) => {
    fs.writeFile(DATA_PATH, JSON.stringify(items, null, 2), (err) => {
      if (err) return reject(err);
      resolve();
    });
  });
}
