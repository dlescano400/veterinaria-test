import { useEffect, useState } from "react";
import { Drawer } from "../component/Drawer";
import { PetCard } from "../component/PetCard";
import petStore from "../store/petStore";
import { useDrawerStore } from "../store/useDrawerStore";
import { toastSuccess, toastError } from "../utils/toast";

export default function Pets() {
  const store = petStore();
  const { setEditingData, editingData } = useDrawerStore();
  const { pets, fetchPets, deletePet } = store;

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    fetchPets();
  }, [fetchPets]);

  const handleEdit = (pet: typeof pets[0]) => {
    setEditingData(pet);
    setIsDrawerOpen(true);
  };

  const handleDelete = async (petId: string) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar esta mascota?")) {
      try {
        await deletePet(petId);
        toastSuccess("Mascota eliminada correctamente");
      } catch (err: any) {
        toastError(err?.message || "Error al eliminar");
      }
    }
  };

  return (
    <div className="flex gap-4 flex-col h-full relative">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-pink-400">Mascotas</h1>
        <button
          onClick={() => {
            setEditingData(null);
            setIsDrawerOpen(true);
          }}
          className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 hover:shadow-lg hover:shadow-pink-500/50 transition-all duration-200"
        >
          Nueva Mascota
        </button>
      </div>

      <div className="flex-1">
        {pets.length === 0 ? (
          <p className="text-gray-400 text-center py-10">
            No hay mascotas registradas
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {pets.map((pet) => (
              <PetCard
                key={pet.id}
                pet={pet}
                onEdit={() => handleEdit(pet)}
                onDelete={() => handleDelete(pet.id!)}
              />
            ))}
          </div>
        )}
      </div>

      <Drawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
    </div>
  );
}