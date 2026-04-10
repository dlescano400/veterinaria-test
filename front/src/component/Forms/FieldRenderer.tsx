import React from "react";
import { Field } from "./types";

type Props<T> = {
  field: Field<T>;
  value: unknown;
  onChange: (value: unknown) => void;
};

export function FieldRenderer<T>({ field, value, onChange }: Props<T>) {
  const commonProps = {
    className: "w-full border border-pink-500/30 bg-[#252545] text-gray-200 px-3 py-2 rounded-lg focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500/50 transition-colors",
    value:
      typeof value === "string" ||
      typeof value === "number" ||
      Array.isArray(value)
        ? value
        : "",
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      onChange(e.target.value),
  };

  switch (field.type) {
    case "select":
      return (
        <div>
          <label className="block text-sm font-medium mb-1 text-pink-400">
            {field.label}
          </label>
          <select {...commonProps}>
            {field.options?.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      );
    default:
      return (
        <div>
          <label className="block text-sm font-medium mb-1 text-pink-400">
            {field.label}
          </label>
          <input type={field.type} {...commonProps} />
        </div>
      );
  }
}
