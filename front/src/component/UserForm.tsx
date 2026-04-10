import { Form } from "./Forms/Form";
import { Field } from "./Forms/types";
import { useEffect, useState } from "react";
import { User } from "../types";
import userStore from "../store/userStore";
import { useDrawerStore } from "../store/useDrawerStore";
import { toastSuccess, toastError } from "../utils/toast";

const fields: Field<User>[] = [
  { name: "firstName", label: "Nombre", type: "text" },
  { name: "lastName", label: "Apellido", type: "text" },
  { name: "email", label: "Correo", type: "email" },
  { name: "phone", label: "Teléfono", type: "text" },
];

export default function UserFormPage({ onSuccess }: { onSuccess: () => void }) {
  const store = userStore();
  const { createUser, updateUser, fetchUser, error } = store;
  const { editingData, clearEditingData } = useDrawerStore();

  const [formData, setFormData] = useState<User>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const [loading, setLoading] = useState(false);

  const isEditing = !!editingData;

  useEffect(() => {
    if (editingData) {
      setFormData(editingData as User);
    } else {
      setFormData({ firstName: "", lastName: "", email: "", phone: "" });
    }
  }, [editingData]);

  const handleSubmit = async (data: User) => {
    setLoading(true);
    try {
      if (isEditing) {
        await updateUser({ ...data, id: editingData!.id });
        toastSuccess("Usuario actualizado correctamente");
      } else {
        await createUser(data);
        toastSuccess("Usuario creado correctamente");
      }
      await fetchUser();
      clearEditingData();
      setFormData({ firstName: "", lastName: "", email: "", phone: "" });
      onSuccess();
    } catch (err: any) {
      const errorMsg = err?.message || "Error al guardar";
      toastError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <Form
        fields={fields}
        values={formData}
        onChange={setFormData}
        onSubmit={handleSubmit}
        loading={loading}
        submitLabel={isEditing ? "Actualizar" : "Crear Usuario"}
      />
    </div>
  );
}
