export type Field<T> = {
  name: keyof T;
  label: string;
  type: "text" | "email" | "number" | "select" | "date";
  options?: { value: string; label: string }[]; // para selects
};
