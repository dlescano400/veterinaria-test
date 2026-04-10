import { Table } from "../component/Table/Table";
import { TableRow } from "../component/Table/TableRow";
import { Column } from "../component/Table/types";

import { useEffect, useState } from "react";
import { Drawer } from "../component/Drawer";

import userStore from "../store/userStore";
import { useDrawerStore } from "../store/useDrawerStore";
import { User } from "../types";
import { toastSuccess, toastError } from "../utils/toast";

export default function Users() {
  const store = userStore();
  const drawerStore = useDrawerStore();
  const { setEditingData } = drawerStore;
  const { users, isLoggedIn, error, fetchUser, deleteUser } = store;

  const columns: Column<User>[] = [
    { key: "firstName", label: "Nombre" },
    { key: "lastName", label: "Apellido" },
    { key: "phone", label: "Teléfono" },
    { key: "email", label: "Correo" },
  ];

  const handleDelete = async (userId: string) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este usuario?")) {
      try {
        await deleteUser(userId);
        toastSuccess("Usuario eliminado correctamente");
      } catch (err: any) {
        toastError(err?.message || "Error al eliminar");
      }
    }
  };

  const buttonsActions = (user: User) => {
    return (
      <div className="flex gap-4 justify-end">
        <button
          onClick={() => {
            setIsDrawerOpen(true);
            setEditingData(user);
          }}
          className="text-pink-400 hover:text-pink-300 hover:underline transition-colors text-sm font-medium"
        >
          Editar
        </button>
        <button
          onClick={() => handleDelete(user.id)}
          className="text-red-400 hover:text-red-300 hover:underline transition-colors text-sm font-medium"
        >
          Eliminar
        </button>
      </div>
    );
  };

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <div className="flex gap-4 flex-col h-full relative">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-pink-400">Usuarios</h1>
        <button
          onClick={() => setIsDrawerOpen(true)}
          className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 hover:shadow-lg hover:shadow-pink-500/50 transition-all duration-200"
        >
          Nuevo Usuario
        </button>
      </div>
      <div className="flex-1">
        {isLoggedIn ? (
          <p>Loading...</p>
        ) : (
          <Table columns={columns} includeActions>
            {users.map((u, i) => (
              <TableRow
                key={u.id}
                data={u}
                columns={columns}
                actions={buttonsActions(u)}
                index={i}
              />
            ))}
          </Table>
        )}
        {error && <p>{error}</p>}
      </div>

      <Drawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
    </div>
  );
}
