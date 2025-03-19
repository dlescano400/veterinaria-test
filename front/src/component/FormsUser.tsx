import { useState } from "react";
import { useCreateUser } from "../hooks/useCreateUser";

interface CreateUserFormProps {
  onSuccess: () => void;
}

export default function CreateUserForm({ onSuccess }: CreateUserFormProps) {
  const { createUser, loading, error, success } = useCreateUser("http://localhost:3000/api/users");
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", phone: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await createUser(form);
    if (result) {
      onSuccess();
      setForm({ firstName: "", lastName: "", email: "", phone: "" });
    }
  };

  return (
    <div className="p-5 bg-white rounded shadow-md w-96">
      <h2 className="text-xl font-bold mb-4">Crear Usuario</h2>
      {success && <p className="text-green-600">¡Usuario creado con éxito!</p>}
      {error && <p className="text-red-600">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-3">
        <input type="text" name="firstName" placeholder="Nombre" value={form.firstName} onChange={handleChange} className="w-full p-2 border rounded" required />
        <input type="text" name="lastName" placeholder="Apellido" value={form.lastName} onChange={handleChange} className="w-full p-2 border rounded" required />
        <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} className="w-full p-2 border rounded" required />
        <input type="text" name="phone" placeholder="Teléfono" value={form.phone} onChange={handleChange} className="w-full p-2 border rounded" required />
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded" disabled={loading}>
          {loading ? "Enviando..." : "Crear Usuario"}
        </button>
      </form>
    </div>
  );
}
