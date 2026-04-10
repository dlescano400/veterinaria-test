import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { Appointment, CalendarEvent } from "../types";

const api = import.meta.env.VITE_API_URL;

interface AppointmentStoreState {
  appointments: Appointment[];
  loading: boolean;
  error: string | null;
  fetchAppointments: () => Promise<void>;
}

type Action = {
  createAppointment: (appointment: Omit<Appointment, 'id'>) => Promise<Appointment>;
  updateAppointment: (appointment: Appointment) => Promise<void>;
  deleteAppointment: (appointmentId: string) => Promise<void>;
  getCalendarEvents: () => CalendarEvent[];
};

const appointmentStore = create<AppointmentStoreState & Action>()(
  devtools(
    (set, get) => ({
      appointments: [],
      loading: false,
      error: null,

      fetchAppointments: async () => {
        try {
          set({ loading: true });
          const response = await fetch(`${api}/appointments`);
          if (!response.ok) {
            throw new Error("Error al obtener turnos");
          }
          const data = await response.json();
          const appointments = data.map((apt: Appointment) => ({
            ...apt,
            dateTime: new Date(apt.dateTime),
          }));
          set({ appointments, error: null });
        } catch (error) {
          set({ error: (error as Error).message });
        } finally {
          set({ loading: false });
        }
      },

      createAppointment: async (appointment) => {
        const response = await fetch(`${api}/appointments`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...appointment,
            dateTime: new Date(appointment.dateTime).toISOString(),
          }),
        });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || "Error al crear turno");
        }
        const newAppointment = {
          ...data,
          dateTime: new Date(data.dateTime),
        };
        set((state) => ({
          appointments: [...state.appointments, newAppointment],
          error: null,
        }));
        return newAppointment;
      },

      updateAppointment: async (appointment) => {
        const response = await fetch(`${api}/appointments/${appointment.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...appointment,
            dateTime: new Date(appointment.dateTime).toISOString(),
          }),
        });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || "Error al actualizar turno");
        }
        const updatedAppointment = {
          ...data,
          dateTime: new Date(data.dateTime),
        };
        set((state) => ({
          appointments: state.appointments.map((apt) =>
            apt.id === data.id ? updatedAppointment : apt
          ),
          error: null,
        }));
        return updatedAppointment;
      },

      deleteAppointment: async (appointmentId) => {
        const response = await fetch(`${api}/appointments/${appointmentId}`, {
          method: "DELETE",
        });
        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.message || "Error al eliminar turno");
        }
        set((state) => ({
          appointments: state.appointments.filter((apt) => apt.id !== appointmentId),
          error: null,
        }));
      },

      getCalendarEvents: () => {
        const { appointments } = get();
        return appointments.map((apt) => {
          const endTime = new Date(apt.dateTime);
          endTime.setMinutes(endTime.getMinutes() + 30);
          
          let backgroundColor = '#ff1493';
          let borderColor = '#ff1493';
          if (apt.status === 'confirmed') {
            backgroundColor = '#00ff7f';
            borderColor = '#00ff7f';
          } else if (apt.status === 'canceled') {
            backgroundColor = '#ff4444';
            borderColor = '#ff4444';
          }
          
          return {
            id: apt.id!,
            title: apt.pet?.name || `Turno #${apt.id?.slice(0, 6)}`,
            start: new Date(apt.dateTime),
            end: endTime,
            backgroundColor,
            borderColor,
            textColor: '#ffffff',
            extendedProps: {
              appointment: apt,
            },
          };
        });
      },
    }),
    { name: "appointmentStore" }
  )
);

export default appointmentStore;
