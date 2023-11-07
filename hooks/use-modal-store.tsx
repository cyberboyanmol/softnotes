import { create } from "zustand";

type ModalType = "search" | "settings";

type SearchStore = {
  isOpen: boolean;
  type: ModalType | null;
  onOpen: (type: ModalType) => void;
  onClose: () => void;
  toggle: (type: ModalType) => void;
};

export const useModalStore = create<SearchStore>((set, get) => ({
  isOpen: false,
  type: null,
  onOpen: (type) => set({ type, isOpen: true }),
  onClose: () => set({ isOpen: false }),
  toggle: (type) => set({ type, isOpen: !get().isOpen }),
}));
