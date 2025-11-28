
export type Stack = 'HTML' | 'CSS' | 'JS' | 'TS' | 'REACT' | 'DEBUG';
export type Difficulty = 'Junior' | 'Pleno' | 'Senior' | 'Special';
export type AppState = 'boot' | 'menu' | 'selection' | 'quiz' | 'result';

export interface Question {
  id: string;
  stack: Stack;
  difficulty: Difficulty;
  question: string;
  codeSnippet?: string;
  options: string[];
  correctIndex: number;
  explanation?: string;
}

export interface QuizState {
  currentQuestionIndex: number;
  score: number;
  answers: { questionId: string; isCorrect: boolean }[];
}

export interface GameConfig {
  stack: Stack | null;
  difficulty: Difficulty | null;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  conditionText: string;
}

export interface Rank {
  level: number;
  title: string;
  minXp: number;
  icon: string;
  subtitle: string;
}

export interface UserStats {
  syntax: number;
  logic: number;
  layout: number;
  semantic: number;
  debug: number;
}

export interface UserProfile {
  nickname: string;
  level: number;
  xp: number;
  stats: UserStats;
  badges: string[];
}
