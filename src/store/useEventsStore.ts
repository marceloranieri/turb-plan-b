import { create } from 'zustand';

interface EventsStore {
  events: any[];
  mobileNavigationVisible: boolean;
  sidebarVisible: boolean;
  setEvents: (events: any[]) => void;
  openMobileNavigation: () => void;
  closeMobileNavigation: () => void;
  resetMobileNavigation: () => void;
  openSidebar: () => void;
  closeSidebar: () => void;
  resetSidebar: () => void;
}

export const useEventsStore = create<EventsStore>((set) => ({
  events: [],
  mobileNavigationVisible: false,
  sidebarVisible: false,
  setEvents: (events) => set({ events }),
  openMobileNavigation: () => set({ mobileNavigationVisible: true }),
  closeMobileNavigation: () => set({ mobileNavigationVisible: false }),
  resetMobileNavigation: () => set({ mobileNavigationVisible: false }),
  openSidebar: () => set({ sidebarVisible: true }),
  closeSidebar: () => set({ sidebarVisible: false }),
  resetSidebar: () => set({ sidebarVisible: false }),
}));

export default useEventsStore; 