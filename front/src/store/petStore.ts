import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { Pet } from "../types";

const api = import.meta.env.VITE_API_URL;

interface PetStoreState {
  pets: Pet[];
  loading: boolean;
  error: string | null;
  fetchPets: () => Promise<void>;
}

type Action = {
  createPet: (pet: Pet) => Promise<Pet>;
  updatePet: (pet: Pet) => Promise<void>;
  deletePet: (petId: string) => Promise<void>;
};

const petStore = create<PetStoreState & Action>()(
  devtools(
    (set) => ({
      pets: [],
      loading: false,
      error: null,

      fetchPets: async () => {
        try {
          set({ loading: true });
          const response = await fetch(`${api}/pets`);
          if (!response.ok) {
            throw new Error("Error al obtener mascotas");
          }
          const data = await response.json();
          set({ pets: data, error: null });
        } catch (error) {
          set({ error: (error as Error).message });
        } finally {
          set({ loading: false });
        }
      },

      createPet: async (pet) => {
        const response = await fetch(`${api}/pets`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(pet),
        });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || "Error al crear mascota");
        }
        set((state) => ({
          pets: [...state.pets, data],
          error: null,
        }));
        return data;
      },

      updatePet: async (pet) => {
        const response = await fetch(`${api}/pets/${pet.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(pet),
        });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || "Error al actualizar mascota");
        }
        set((state) => ({
          pets: state.pets.map((p) => (p.id === data.id ? data : p)),
          error: null,
        }));
        return data;
      },

      deletePet: async (petId) => {
        const response = await fetch(`${api}/pets/${petId}`, {
          method: "DELETE",
        });
        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.message || "Error al eliminar mascota");
        }
        set((state) => ({
          pets: state.pets.filter((pet) => pet.id !== petId),
          error: null,
        }));
      },
    }),
    { name: "petStore" }
  )
);

export default petStore;
