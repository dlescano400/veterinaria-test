export type Field<T> = {
  name: keyof T;
  label: string;
  type: "text" | "email" | "number" | "select" | "date" | "datetime-local";
  options?: { value: string; label: string }[];
};
