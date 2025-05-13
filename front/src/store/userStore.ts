import { create } from "zustand";
import { devtools } from "zustand/middleware";
const api = import.meta.env.VITE_API_URL;

type User = Record<string, unknown>; // Replace with your actual User type if available

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
  deleteUser: (userId: number) => Promise<void>;
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
        try {
          const response = await fetch(`${api}/users`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
          });
          if (!response.ok) {
            throw new Error("Failed to create user");
          }
          const newUser = await response.json();
          set((state) => ({
            users: [...state.users, newUser],
          }));
          return newUser;
        } catch (error) {
          set({ error: (error as Error).message });
        }
      },

      updateUser: async (user) => {
        try {
          const response = await fetch(`${api}/users/${user.id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
          });
          if (!response.ok) {
            throw new Error("Failed to update user");
          }
          const updatedUser = await response.json();
          set((state) => ({
            users: state.users.map((u) =>
              u.id === updatedUser.id ? updatedUser : u
            ),
          }));
        } catch (error) {
          set({ error: (error as Error).message });
        }
      },

      deleteUser: async (userId) => {
        try {
          const response = await fetch(`${api}/users/${userId}`, {
            method: "DELETE",
          });
          if (!response.ok) {
            throw new Error("Failed to delete user");
          }
          set((state) => ({
            users: state.users.filter((user) => user.id !== userId),
          }));
        } catch (error) {
          set({ error: (error as Error).message });
        }
      },
    }),
    // Adding the devtools middleware
    // This is optional and can be removed if you don't want to use Redux DevTools
    { name: "userStore" } // unique name
  )
);

export default userStore;
