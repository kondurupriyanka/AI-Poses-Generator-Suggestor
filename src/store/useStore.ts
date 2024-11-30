import create from 'zustand';

interface State {
  language: 'ASL' | 'BSL';
  confidence: number;
  translation: string;
  suggestions: string[];
  isRecording: boolean;
  darkMode: boolean;
  handDetected: boolean;
  setLanguage: (lang: 'ASL' | 'BSL') => void;
  setConfidence: (conf: number) => void;
  setTranslation: (text: string) => void;
  setSuggestions: (sugs: string[]) => void;
  toggleRecording: () => void;
  toggleDarkMode: () => void;
  setHandDetected: (detected: boolean) => void;
}

export const useStore = create<State>((set) => ({
  language: 'ASL',
  confidence: 98,
  translation: '',
  suggestions: [],
  isRecording: false,
  darkMode: false,
  handDetected: false,
  setLanguage: (lang) => set({ language: lang }),
  setConfidence: (conf) => set({ confidence: conf }),
  setTranslation: (text) => set({ translation: text }),
  setSuggestions: (sugs) => set({ suggestions: sugs }),
  toggleRecording: () => set((state) => ({ isRecording: !state.isRecording })),
  toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
  setHandDetected: (detected) => set({ handDetected: detected }),
}));