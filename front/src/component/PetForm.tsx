import { Form } from "./Forms/Form";
import { Field } from "./Forms/types";
import { useEffect, useState } from "react";
import { Pet } from "../types";
import petStore from "../store/petStore";
import userStore from "../store/userStore";
import { useDrawerStore } from "../store/useDrawerStore";
import { toastSuccess, toastError } from "../utils/toast";

const fields: Field<Pet>[] = [
  { name: "name", label: "Nombre", type: "text" },
  {
    name: "species",
    label: "Especie",
    type: "select",
    options: [
      { value: "", label: "Seleccionar especie..." },
      { value: "perro", label: "Perro" },
      { value: "gato", label: "Gato" },
      { value: "pajaro", label: "Pájaro" },
      { value: "pez", label: "Pez" },
      { value: "conejo", label: "Conejo" },
      { value: "hamster", label: "Hámster" },
    ],
  },
  { name: "breed", label: "Raza", type: "text" },
  { name: "age", label: "Edad (años)", type: "number" },
];

export default function PetFormPage({ onSuccess }: { onSuccess: () => void }) {
  const petStoreData = petStore();
  const userStoreData = userStore();
  const { createPet, updatePet, fetchPets } = petStoreData;
  const { users, fetchUser } = userStoreData;
  const { editingData, clearEditingData } = useDrawerStore();

  const isEditing = !!editingData;

  const [formData, setFormData] = useState<Pet>({
    name: "",
    species: "",
    breed: "",
    age: 0,
    userId: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  useEffect(() => {
    if (editingData) {
      setFormData(editingData as Pet);
    } else {
      setFormData({ name: "", species: "", breed: "", age: 0, userId: "" });
    }
  }, [editingData]);

  const handleSubmit = async (data: Pet) => {
    setLoading(true);
    try {
      if (isEditing) {
        await updatePet({ ...data, id: editingData!.id });
        toastSuccess("Mascota actualizada correctamente");
      } else {
        await createPet(data);
        toastSuccess("Mascota creada correctamente");
      }
      await fetchPets();
      clearEditingData();
      setFormData({ name: "", species: "", breed: "", age: 0, userId: "" });
      onSuccess();
    } catch (err: any) {
      toastError(err?.message || "Error al guardar");
    } finally {
      setLoading(false);
    }
  };

  const ownerField: Field<Pet> = {
    name: "userId",
    label: "Dueño",
    type: "select",
    options: [
      { value: "", label: "Seleccionar dueño..." },
      ...users.map((u) => ({
        value: u.id!,
        label: `${u.firstName} ${u.lastName}`,
      })),
    ],
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <Form
        fields={[...fields, ownerField]}
        values={formData}
        onChange={setFormData}
        onSubmit={handleSubmit}
        loading={loading}
        submitLabel={isEditing ? "Actualizar" : "Crear Mascota"}
      />
    </div>
  );
}
