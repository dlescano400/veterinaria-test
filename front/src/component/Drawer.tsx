import { useLocation } from "react-router-dom";
import UserFormPage from "./UserForm";
import PetFormPage from "./PetForm";
import { useDrawerStore } from "../store/useDrawerStore";

interface DrawerComponentProps {
  onSuccess: () => void;
}

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}

const DRAWER_CONTENT: {
  [key: string]: {
    component: React.ComponentType<DrawerComponentProps>;
    createTitle: string;
    editTitle: string;
  };
} = {
  "/users": {
    component: UserFormPage,
    createTitle: "Nuevo Usuario",
    editTitle: "Editar Usuario",
  },
  "/pets": {
    component: PetFormPage,
    createTitle: "Nueva Mascota",
    editTitle: "Editar Mascota",
  },
  "/appointments": {
    component: () => <div className="text-gray-300 mt-10">Formulario de Cita</div>,
    createTitle: "Nueva Cita",
    editTitle: "Editar Cita",
  },
  "/payments": {
    component: () => <div className="text-gray-300 mt-10">Formulario de Pago</div>,
    createTitle: "Nuevo Pago",
    editTitle: "Editar Pago",
  },
};

export const Drawer = ({ isOpen, onClose }: DrawerProps) => {
  const location = useLocation();
  const currentPath = location.pathname;
  const currentDrawer = DRAWER_CONTENT[currentPath];
  const { editingData } = useDrawerStore();

  if (!currentDrawer) return null;

  const ContentComponent = currentDrawer.component;
  const isEditing = !!editingData;

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 transition-opacity z-40"
          onClick={onClose}
        />
      )}

      <div
        className={`fixed inset-y-0 right-0 max-w-md bg-[#1e1e38] border-l-2 border-pink-500 shadow-lg shadow-pink-500/30 transform transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="h-full p-6 overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-pink-400">
              {isEditing ? currentDrawer.editTitle : currentDrawer.createTitle}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-pink-400 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <ContentComponent onSuccess={onClose} />
        </div>
      </div>
    </>
  );
};
