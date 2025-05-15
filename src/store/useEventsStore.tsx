import { create } from "zustand";

type Store = {
    isActiveSidebar: boolean;
    openSidebar: () => void;
    closeSidebar: () => void;
    toggleSidebar: () => void;
    resetSidebar: () => void;
    isNewPost: boolean;
    closeNewPost: () => void;
    toggleNewPost: () => void;
    isOpenIcons: boolean;
    closeIcons: () => void;
    toggleIcons: () => void;
    isShowMobileNavigation: boolean;
    openMobileNavigation: () => void;
    closeMobileNavigation: () => void;
    toggleMobileNavigation: () => void;
    resetMobileNavigation: () => void;
};

const useEventsStore = create<Store>()((set) => ({
    isActiveSidebar: false,
    openSidebar: () => set({ isActiveSidebar: true }),
    closeSidebar: () => set({ isActiveSidebar: false }),
    toggleSidebar: () => {
        set((state) => ({ isActiveSidebar: !state.isActiveSidebar }));
    },
    resetSidebar: () => set({ isActiveSidebar: false }),
    isNewPost: false,
    closeNewPost: () => set({ isNewPost: false }),
    toggleNewPost: () => {
        set((state) => ({ isNewPost: !state.isNewPost }));
    },
    isOpenIcons: false,
    closeIcons: () => set({ isOpenIcons: false }),
    toggleIcons: () => {
        set((state) => ({ isOpenIcons: !state.isOpenIcons }));
    },
    isShowMobileNavigation: true,
    openMobileNavigation: () => set({ isShowMobileNavigation: true }),
    closeMobileNavigation: () => set({ isShowMobileNavigation: false }),
    toggleMobileNavigation: () => {
        set((state) => ({
            isShowMobileNavigation: !state.isShowMobileNavigation,
        }));
    },
    resetMobileNavigation: () => set({ isShowMobileNavigation: true }),
}));

export default useEventsStore;
