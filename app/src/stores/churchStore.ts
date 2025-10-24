import { create } from 'zustand';
import { Church, Ministry } from '@/lib/types';
import { api } from '@/lib/api';

interface ChurchState {
  currentChurch: Church | null;
  ministries: Ministry[];
  isLoading: boolean;
  setCurrentChurch: (church: Church | null) => void;
  fetchChurch: (id: string) => Promise<void>;
  fetchMinistries: (churchId: string) => Promise<void>;
  createMinistry: (data: Partial<Ministry>) => Promise<Ministry>;
  updateMinistry: (id: string, data: Partial<Ministry>) => Promise<Ministry>;
  deleteMinistry: (id: string) => Promise<void>;
}

export const useChurchStore = create<ChurchState>((set, get) => ({
  currentChurch: null,
  ministries: [],
  isLoading: false,

  setCurrentChurch: (church) => {
    set({ currentChurch: church });
  },

  fetchChurch: async (id: string) => {
    set({ isLoading: true });
    try {
      const church = await api.getChurch(id);
      set({ currentChurch: church, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  fetchMinistries: async (churchId: string) => {
    set({ isLoading: true });
    try {
      const ministries = await api.getMinistries(churchId);
      set({ ministries, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  createMinistry: async (data: Partial<Ministry>) => {
    const ministry = await api.createMinistry(data);
    set((state) => ({ ministries: [...state.ministries, ministry] }));
    return ministry;
  },

  updateMinistry: async (id: string, data: Partial<Ministry>) => {
    const updatedMinistry = await api.updateMinistry(id, data);
    set((state) => ({
      ministries: state.ministries.map((m) => (m.id === id ? updatedMinistry : m)),
    }));
    return updatedMinistry;
  },

  deleteMinistry: async (id: string) => {
    await api.deleteMinistry(id);
    set((state) => ({
      ministries: state.ministries.filter((m) => m.id !== id),
    }));
  },
}));
