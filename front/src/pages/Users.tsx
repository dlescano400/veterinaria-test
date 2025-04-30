import { Table } from '../component/Table';
import { useFetch } from '../hooks/useFetch';
import { useState } from 'react';
import { Drawer } from '../component/Drawer';
import CreateUserForm from '../component/FormsUser';

export default function Users() {
  const { data, loading, error, refetch } = useFetch('http://localhost:3000/api/users');
  const columns = ['firstName', 'lastName', 'email', 'phone'];
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <div className="flex gap-4 flex-col h-full relative">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold mb-4">Usuarios</h1>
        <button 
          onClick={() => setIsDrawerOpen(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          Nuevo Usuario
        </button>
      </div>
      <div className="flex-1">
        {loading ? 
          <p>Loading...</p>
          : <Table columns={columns} rows={data ? data : []} />
        }
        {error && <p>{error}</p>}
      </div>

      <Drawer 
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      >
        <div className="h-full p-6 overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Crear Usuario</h2>
            <button 
              onClick={() => setIsDrawerOpen(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <CreateUserForm onSuccess={() => {
            refetch();
            setIsDrawerOpen(false);
          }} />
        </div>
      </Drawer>
    </div>
  );
}