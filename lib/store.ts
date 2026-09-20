import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

export interface ModelConfig {
  provider: 'hybra' | 'openai' | 'anthropic' | 'google' | 'local' | 'custom';
  modelId: string;
  apiKey?: string;
  endpoint?: string;
  temperature?: number;
}

export interface Thread {
  id: string;
  title: string;
  messages: Message[];
  model: ModelConfig;
  createdAt: number;
  updatedAt: number;
}

interface VortexStore {
  threads: Thread[];
  currentThreadId: string | null;
  currentModel: ModelConfig;
  localModels: string[];
  sidebarOpen: boolean;

  createThread: (model: ModelConfig) => string;
  deleteThread: (id: string) => void;
  setCurrentThread: (id: string) => void;
  addMessage: (threadId: string, message: Message) => void;
  setCurrentModel: (model: ModelConfig) => void;
  setLocalModels: (models: string[]) => void;
  toggleSidebar: () => void;
}

export const useVortexStore = create<VortexStore>()(persist(
  (set, get) => ({
    threads: [],
    currentThreadId: null,
    currentModel: {
      provider: 'hybra',
      modelId: 'qwen3-8-flash',
      apiKey: 'femboysex',
      endpoint: 'https://hybra.lol/v1/chat/completions',
    },
    localModels: [],
    sidebarOpen: true,

    createThread: (model) => {
      const id = `thread-${Date.now()}`;
      const thread: Thread = {
        id,
        title: 'New Chat',
        messages: [],
        model,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };
      set((state) => ({
        threads: [...state.threads, thread],
        currentThreadId: id,
      }));
      return id;
    },

    deleteThread: (id) => {
      set((state) => ({
        threads: state.threads.filter((t) => t.id !== id),
        currentThreadId: state.currentThreadId === id ? null : state.currentThreadId,
      }));
    },

    setCurrentThread: (id) => {
      set({ currentThreadId: id });
    },

    addMessage: (threadId, message) => {
      set((state) => ({
        threads: state.threads.map((t) =>
          t.id === threadId
            ? { ...t, messages: [...t.messages, message], updatedAt: Date.now() }
            : t
        ),
      }));
    },

    setCurrentModel: (model) => {
      set({ currentModel: model });
    },

    setLocalModels: (models) => {
      set({ localModels: models });
    },

    toggleSidebar: () => {
      set((state) => ({ sidebarOpen: !state.sidebarOpen }));
    },
  }),
  {
    name: 'vortex-store',
  }
))