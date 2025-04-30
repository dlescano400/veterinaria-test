import { useLocation } from 'react-router-dom';
import CreateUserForm from './FormsUser';

interface DrawerComponentProps {
  onSuccess: () => void;
}

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const DRAWER_CONTENT: { [key: string]: { title: string; component: React.ComponentType<DrawerComponentProps> } } = {
  '/users': {
    title: 'Crear Usuario',
    component: CreateUserForm
  },
  '/pets': {
    title: 'Crear Mascota',
    component: () => <div>Formulario de Mascota</div> // Placeholder
  },
  '/appointments': {
    title: 'Crear Cita',
    component: () => <div>Formulario de Cita</div> // Placeholder
  },
  '/payments': {
    title: 'Crear Pago',
    component: () => <div>Formulario de Pago</div> // Placeholder
  }
};

export const Drawer = ({ isOpen, onClose }: DrawerProps) => {
  const location = useLocation();
  const currentPath = location.pathname;
  const currentDrawer = DRAWER_CONTENT[currentPath];

  if (!currentDrawer) return null;

  const ContentComponent = currentDrawer.component;

  return (
    <>
      {/* Overlay oscuro */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-[#0000001c] bg-opacity-10 transition-opacity z-40"
          onClick={onClose}
        />
      )}

      {/* Drawer/Modal deslizable */}
      <div className={`fixed inset-y-0 right-0 max-w-md bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="h-full p-6 overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">{currentDrawer.title}</h2>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <ContentComponent onSuccess={onClose} />
        </div>
      </div>
    </>
  );
};