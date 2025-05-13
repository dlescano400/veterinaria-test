import { useState } from "react";
import userStore from "../store/userStore";

export default function CreateUserForm() {
  const store = userStore();
  const { createUser, error } = store;
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const result = await createUser(form);
    if (result) {
      setSuccess(true);
      setLoading(false);
      setForm({ firstName: "", lastName: "", email: "", phone: "" });
    }
  };

  return (
    <div className="p-5 bg-white rounded shadow-md w-full z-50">
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          name="firstName"
          placeholder="Nombre"
          value={form.firstName}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="lastName"
          placeholder="Apellido"
          value={form.lastName}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="phone"
          placeholder="Teléfono"
          value={form.phone}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded"
          disabled={loading}
        >
          {loading ? "Enviando..." : "Crear Usuario"}
        </button>
      </form>
      {success && <p className="text-green-600">¡Usuario creado con éxito!</p>}
      {error && <p className="text-red-600">{error}</p>}
    </div>
  );
}
