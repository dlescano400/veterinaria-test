import React from "react";
import { Field } from "./types";
import { FieldRenderer } from "./FieldRenderer";

type FormProps<T> = {
  fields: Field<T>[];
  values: T;
  onChange: (values: T) => void;
  onSubmit: (values: T) => void | Promise<void>;
  loading?: boolean;
  submitLabel?: string;
};

export function Form<T>({
  fields,
  values,
  onChange,
  onSubmit,
  loading,
  submitLabel = "Enviar",
}: FormProps<T>) {
  const handleInputChange = (name: keyof T, value: unknown) => {
    onChange({ ...values, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(values);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {fields.map((field) => (
        <FieldRenderer
          key={String(field.name)}
          field={field}
          value={values[field.name]}
          onChange={(val) => handleInputChange(field.name, val)}
        />
      ))}
      <button
        type="submit"
        className="w-full bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 hover:shadow-lg hover:shadow-pink-500/50 transition-all duration-200 font-medium mt-6"
        disabled={loading}
      >
        {loading ? "Enviando..." : submitLabel}
      </button>
    </form>
  );
}
