import { create, StateCreator } from "zustand";

interface LoginModalState {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

const useLoginModal = create<LoginModalState>(
  ((set) => ({
    isOpen: false,
    open: () => set({ isOpen: true }),
    close: () => set({ isOpen: false }),
  })) as StateCreator<LoginModalState>
);

export default useLoginModal;
