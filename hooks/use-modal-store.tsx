import { create } from "zustand";

type ModalType = "search" | "settings" | "coverImage";

type SearchStore = {
  url?: string;
  isOpen: boolean;
  type: ModalType | null;
  onOpen: (type: ModalType) => void;
  onClose: () => void;
  toggle: (type: ModalType) => void;
  onReplace: (url: string, type: ModalType) => void;
};

export const useModalStore = create<SearchStore>((set, get) => ({
  isOpen: false,
  type: null,
  onOpen: (type) => set({ type, isOpen: true, url: undefined }),
  onClose: () => set({ isOpen: false, url: undefined }),
  toggle: (type) => set({ type, isOpen: !get().isOpen, url: undefined }),
  onReplace: (url, type) => set({ isOpen: true, url, type }),
}));
