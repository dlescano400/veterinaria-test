import { Pet } from "../types";

interface PetCardProps {
  pet: Pet;
  onEdit: () => void;
  onDelete: () => void;
}

const speciesIcons: Record<string, string> = {
  perro: "🐕",
  gato: "🐱",
  pajaro: "🐦",
  pez: "🐟",
  conejo: "🐰",
  hamster: "🐹",
  default: "🐾",
};

export function PetCard({ pet, onEdit, onDelete }: PetCardProps) {
  const icon = speciesIcons[pet.species?.toLowerCase()] || speciesIcons.default;
  const ownerName = pet.user
    ? `${pet.user.firstName} ${pet.user.lastName}`
    : "Sin dueño";

  return (
    <div className="bg-[#1e1e38] border border-pink-500/30 rounded-xl p-5 hover:shadow-lg hover:shadow-pink-500/20 transition-all duration-200 hover:border-pink-500/50">
      <div className="flex items-center gap-3 mb-4">
        <span className="text-3xl">{icon}</span>
        <h3 className="text-xl font-bold text-pink-400">{pet.name}</h3>
      </div>

      <div className="space-y-2 text-gray-300 mb-4">
        <div className="flex items-center gap-2">
          <span className="text-pink-400/70">🐾</span>
          <span>{pet.breed || "Sin raza"}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-pink-400/70">📅</span>
          <span>
            {pet.age} {pet.age === 1 ? "año" : "años"}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-pink-400/70">👤</span>
          <span>{ownerName}</span>
        </div>
      </div>

      <div className="flex gap-4 justify-end pt-3 border-t border-pink-500/20">
        <button
          onClick={onEdit}
          className="text-pink-400 hover:text-pink-300 hover:underline transition-colors text-sm font-medium"
        >
          Editar
        </button>
        <button
          onClick={onDelete}
          className="text-red-400 hover:text-red-300 hover:underline transition-colors text-sm font-medium"
        >
          Eliminar
        </button>
      </div>
    </div>
  );
}
