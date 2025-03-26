import { create } from "zustand";

interface IQuestion {
  color: string;
  answers: string[];
  correctAnswer: string; // Store correct answer
}

interface IQuizStore {
  count: number;
  questions: IQuestion[];
  answers: string[];
  correctAnswers: string[]; // Store correct answers
  isFinished: boolean;
  setQuizId: () => void;
  setQuestions: () => void;
  setQuizIdDefault: () => void;
  setAnswers: (newAnswer: string, correctAnswer: string) => void;
  setAnswersDefault: () => void;
  finishQuiz: () => void;
}

const useQuizStore = create<IQuizStore>((set) => ({
  count: 0,
  questions: [],
  answers: [],
  correctAnswers: [],
  isFinished: false,

  setAnswers: (newAnswer: string, correctAnswer: string) =>
    set((state) => ({
      answers: [...state.answers, newAnswer],
      correctAnswers: [...state.correctAnswers, correctAnswer],
    })),

  setAnswersDefault: () =>
    set(() => ({ answers: [], correctAnswers: [], isFinished: false })),

  setQuizId: () => set((state) => ({ count: state.count + 1 })),

  setQuizIdDefault: () => set(() => ({ count: 0, isFinished: false })),

  setQuestions: async () => {
    try {
      const response = await fetch("https://random-colors-lovat.vercel.app/");
      const data = await response.json();
      set({
        questions: data.map((q: any) => ({
          ...q,
          correctAnswer: q.answers[0],
        })),
      });
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  },

  finishQuiz: () => set(() => ({ isFinished: true })),
}));

export default useQuizStore;
