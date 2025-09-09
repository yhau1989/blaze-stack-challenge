import type { FC } from "react";
import { useIncidents } from "../hooks/useIncidents";
import { formatDate } from "../utils/general-utils";
import Menu from "../components/menu";
const VITE_API_URL = import.meta.env.VITE_API_URL;

const DashboardPage: FC = () => {
  const { incidents, loading, error } = useIncidents();
  return (
    <div>
      <Menu />
      <div className="container mx-auto py-8 px-4">
        <h2 className="text-xl font-bold mb-4 text-center">
          Incidents Dashboard
        </h2>
        {loading ? (
          <div className="text-center text-gray-500">Loading incidents...</div>
        ) : error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : incidents.length === 0 ? (
          <div className="text-center text-gray-500">
            No incidents submitted yet.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200 rounded-lg shadow-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 text-left font-semibold text-gray-700">
                    ID
                  </th>
                  <th className="px-4 py-2 text-left font-semibold text-gray-700">
                    Title
                  </th>
                  <th className="px-4 py-2 text-left font-semibold text-gray-700">
                    Type
                  </th>
                  <th className="px-4 py-2 text-left font-semibold text-gray-700">
                    Location
                  </th>
                  <th className="px-4 py-2 text-left font-semibold text-gray-700">
                    Created
                  </th>
                  <th className="px-4 py-2 text-left font-semibold text-gray-700">
                    Image
                  </th>
                  <th className="px-4 py-2 text-left font-semibold text-gray-700">
                    Description
                  </th>
                </tr>
              </thead>
              <tbody>
                {incidents.map((incident) => (
                  <tr key={incident.id} className="border-t">
                    <td className="px-4 py-2">{incident.id}</td>
                    <td className="px-4 py-2">{incident.title}</td>
                    <td className="px-4 py-2 capitalize">{incident.type}</td>
                    <td className="px-4 py-2">{incident.location ?? "-"}</td>
                    <td className="px-4 py-2">
                      {formatDate(incident.createdAt)}
                    </td>
                    <td className="px-4 py-2">
                      {incident.image && (
                        <a
                          href={`${VITE_API_URL}/${incident.image}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <img
                            src={`${VITE_API_URL}/${incident.image}`}
                            alt="incident image"
                            width={40}
                            height={40}
                          />
                        </a>
                      )}
                    </td>
                    <td className="px-4 py-2">{incident.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
