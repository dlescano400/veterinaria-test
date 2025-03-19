import { useState } from "react";

interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export function useCreateUser(url: string) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const createUser = async (userData: UserData) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) throw new Error("Error al crear el usuario");
  
      setSuccess(true);
      return true;
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "Error desconocido");
      } else {
        setError("Error desconocido");
      }
    } finally {
      setLoading(false);
    }
  };

  return { createUser, loading, error, success };
}
