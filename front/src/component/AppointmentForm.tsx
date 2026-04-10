import { Form } from "./Forms/Form";
import { Field } from "./Forms/types";
import { useEffect, useState } from "react";
import { Appointment } from "../types";
import appointmentStore from "../store/appointmentStore";
import petStore from "../store/petStore";
import { useDrawerStore } from "../store/useDrawerStore";
import { toastSuccess, toastError } from "../utils/toast";

const statusOptions = [
  { value: "pending", label: "Pendiente" },
  { value: "confirmed", label: "Confirmado" },
  { value: "canceled", label: "Cancelado" },
];

export default function AppointmentFormPage({ onSuccess }: { onSuccess: () => void }) {
  const appointmentData = appointmentStore();
  const petData = petStore();
  const { createAppointment, updateAppointment, fetchAppointments } = appointmentData;
  const { pets, fetchPets } = petData;
  const { editingData, clearEditingData } = useDrawerStore();

  const isEditing = !!editingData;

  const [formData, setFormData] = useState<Omit<Appointment, 'id'>>({
    dateTime: new Date(),
    petId: "",
    veterinarianId: "",
    status: "pending",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPets();
  }, [fetchPets]);

  useEffect(() => {
    if (editingData) {
      const apt = editingData as Appointment;
      setFormData({
        dateTime: new Date(apt.dateTime),
        petId: apt.petId,
        veterinarianId: apt.veterinarianId,
        status: apt.status,
      });
    } else {
      setFormData({
        dateTime: new Date(),
        petId: "",
        veterinarianId: "",
        status: "pending",
      });
    }
  }, [editingData]);

  const handleSubmit = async (data: Omit<Appointment, 'id'>) => {
    setLoading(true);
    try {
      if (isEditing) {
        await updateAppointment({ ...data, id: (editingData as Appointment).id });
        toastSuccess("Turno actualizado correctamente");
      } else {
        await createAppointment(data);
        toastSuccess("Turno creado correctamente");
      }
      await fetchAppointments();
      clearEditingData();
      onSuccess();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Error al guardar";
      toastError(message);
    } finally {
      setLoading(false);
    }
  };

  const fields: Field<Omit<Appointment, 'id'>>[] = [
    {
      name: "dateTime",
      label: "Fecha y Hora",
      type: "datetime-local",
    },
    {
      name: "petId",
      label: "Mascota",
      type: "select",
      options: [
        { value: "", label: "Seleccionar mascota..." },
        ...pets.map((p) => ({
          value: p.id!,
          label: `${p.name} (${p.user?.firstName} ${p.user?.lastName})`,
        })),
      ],
    },
    {
      name: "status",
      label: "Estado",
      type: "select",
      options: [
        { value: "", label: "Seleccionar estado..." },
        ...statusOptions,
      ],
    },
  ];

  return (
    <div className="max-w-md mx-auto mt-10">
      <Form
        fields={fields}
        values={formData}
        onChange={setFormData}
        onSubmit={handleSubmit}
        loading={loading}
        submitLabel={isEditing ? "Actualizar" : "Crear Turno"}
      />
    </div>
  );
}
