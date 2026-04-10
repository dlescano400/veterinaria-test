import { create } from "zustand";

type DrawerStore = {
  editingData: unknown | null;
  setEditingData: (data: unknown) => void;
  clearEditingData: () => void;
};

export const useDrawerStore = create<DrawerStore>((set) => ({
  editingData: null,
  setEditingData: (data) => set({ editingData: data }),
  clearEditingData: () => set({ editingData: null }),
}));
