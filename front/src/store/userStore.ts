import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { User } from "../types";

const api = import.meta.env.VITE_API_URL;

interface UserStoreState {
  users: User[];
  isLoggedIn: boolean;
  error: string | null;
  fetchUser: () => Promise<void>;
  loading?: boolean;
}

const initialUserState: Pick<UserStoreState, "users" | "isLoggedIn" | "error"> =
  {
    users: [],
    isLoggedIn: false,
    error: null,
  };

type Action = {
  fetUsers: () => Promise<void>;
  createUser: (user: User) => Promise<unknown>;
  updateUser: (user: User) => Promise<void>;
  deleteUser: (userId: string) => Promise<void>;
};

const userStore = create<UserStoreState & Action>()(
  devtools(
    (set) => ({
      ...initialUserState,
      fetchUser: async () => {
        try {
          set({ loading: true });
          const response = await fetch(`${api}/users`);
          if (!response.ok) {
            throw new Error("Failed to fetch user");
          }
          const data = await response.json();
          set({ users: data });
        } catch (error) {
          set({ error: (error as Error).message });
        } finally {
          set({ loading: false });
        }
      },

      createUser: async (user) => {
        const response = await fetch(`${api}/users`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || "Error al crear usuario");
        }
        set((state) => ({
          users: [...state.users, data],
          error: null,
        }));
        return data;
      },

      updateUser: async (user) => {
        const response = await fetch(`${api}/users/${user.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || "Error al actualizar usuario");
        }
        set((state) => ({
          users: state.users.map((u) =>
            u.id === data.id ? data : u
          ),
          error: null,
        }));
        return data;
      },

      deleteUser: async (userId) => {
        const response = await fetch(`${api}/users/${userId}`, {
          method: "DELETE",
        });
        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.message || "Error al eliminar usuario");
        }
        set((state) => ({
          users: state.users.filter((user) => user.id !== userId),
          error: null,
        }));
      },
    }),
    // Adding the devtools middleware
    // This is optional and can be removed if you don't want to use Redux DevTools
    { name: "userStore" } // unique name
  )
);

export default userStore;
