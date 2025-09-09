import type { FieldError } from "react-hook-form";

type ErrorFieldFormProps = {
  item?: FieldError;
  message?: string;
};

export default function ErrorFieldForm({ item, message }: ErrorFieldFormProps) {
  return <>{item && <p className="text-xs text-red-500">{message}</p>}</>;
}
