import type { FC } from "react";
import { useState } from "react";
import type { Incident, IncidentType } from "../types/general-types";
import { Controller, useForm } from "react-hook-form";
import ErrorFieldForm from "../components/error-field-form";
import Menu from "../components/menu";

const VITE_API_URL = import.meta.env.VITE_API_URL;

const INCIDENT_TYPES: IncidentType[] = [
  "network",
  "hardware",
  "software",
  "security",
];

const IndexPage: FC = () => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Partial<Incident>>();

  const onSubmit = async (data: Partial<Incident>) => {
    const formData = new FormData();
    formData.append("title", data.title || "");
    formData.append("type", data.type || "");
    formData.append("description", data.description || "");
    formData.append("location", data.location || "");
    formData.append("image", data.image?.[0] || "");

    const result = await fetch(`${VITE_API_URL}/api/incidents`, {
      method: "POST",
      body: formData,
    });

    if (result.ok) {
      alert("Incident created successfully!");
    } else {
      alert("Error creating incident.");
    }
  };

  return (
    <div>
      <Menu />
      <div className="container max-w-xl mx-auto py-8 px-4">
        <h2 className="text-2xl font-bold mb-6 text-center">Create Incident</h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="forms flex flex-col gap-4 mb-8"
        >
          <div className="flex flex-col gap-1">
            <label className="font-medium">Title*</label>
            <input
              type="text"
              id="title"
              placeholder="Brief title of the incident"
              className="border rounded px-3 py-2 w-full"
              {...register("title", {
                required: "field required *",
              })}
            />
            <ErrorFieldForm
              item={errors.title}
              message={errors.title?.message}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="font-medium">Description</label>
            <textarea
              id="description"
              placeholder="Detailed description of the incident"
              className="border rounded px-3 py-2 w-full"
              {...register("description")}
            />
            <ErrorFieldForm
              item={errors.description}
              message={errors.description?.message}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="font-medium">Incident Type*</label>
            <Controller
              name="type"
              control={control}
              rules={{ required: "field required *" }}
              render={({ field }) => (
                <select
                  value={field.value || ""}
                  onChange={field.onChange}
                  className="border rounded px-3 py-2 w-full"
                >
                  <option value="">Select type</option>
                  {INCIDENT_TYPES.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              )}
            />
            <ErrorFieldForm item={errors.type} message={errors.type?.message} />
          </div>
          <div className="flex flex-col gap-1">
            <label className="font-medium">Location</label>
            <input
              type="text"
              placeholder="e.g. 123 Main St, City, Country"
              className="border rounded px-3 py-2 w-full"
              {...register("location")}
            />
            <ErrorFieldForm
              item={errors.location}
              message={errors.location?.message}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="font-medium">Image</label>
            <input
              type="file"
              id="image"
              accept="image/*"
              placeholder="Upload an image"
              className="border rounded px-3 py-2 w-full"
              {...register("image")}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setPreviewUrl(URL.createObjectURL(file));
                } else {
                  setPreviewUrl(null);
                }
              }}
            />
          </div>
          {previewUrl && (
            <div className="flex flex-col gap-1">
              <label className="font-medium">Preview:</label>
              <div className="flex justify-center">
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="max-w-xs rounded border"
                />
              </div>
            </div>
          )}
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            Create
          </button>
        </form>
      </div>
    </div>
  );
};

export default IndexPage;
