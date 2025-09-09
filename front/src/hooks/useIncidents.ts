import { useEffect, useState } from "react";
import type { Incident } from "../types/general-types";

const VITE_API_URL = import.meta.env.VITE_API_URL;

export function useIncidents() {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchIncidents() {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`${VITE_API_URL}/api/incidents`);
        if (!response.ok) {
          throw new Error("Failed to fetch incidents");
        }
        const data = await response.json();
        setIncidents(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : String(err));
      } finally {
        setLoading(false);
      }
    }
    fetchIncidents();
  }, []);

  return { incidents, loading, error };
}
