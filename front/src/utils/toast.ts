import { toast } from "sonner";

const baseStyle = {
  background: "#1e1e38",
  color: "#fff",
};

const successStyle = {
  ...baseStyle,
  border: "2px solid #22c55e",
  boxShadow: "0 0 20px rgba(34, 197, 94, 0.5)",
};

const errorStyle = {
  ...baseStyle,
  border: "2px solid #ef4444",
  boxShadow: "0 0 20px rgba(239, 68, 68, 0.5)",
};

export const toastSuccess = (message: string) => {
  toast.success(message, { style: successStyle });
};

export const toastError = (message: string) => {
  toast.error(message, { style: errorStyle });
};
