
import React, { useState } from 'react';
import { Question, Stack } from '../types';

interface QuizGameProps {
  questions: Question[];
  onFinish: (score: number, answers: { questionId: string; isCorrect: boolean }[]) => void;
  onBack: () => void;
  stack: Stack;
}

const QuizGame: React.FC<QuizGameProps> = ({ questions, onFinish, onBack, stack }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<{ questionId: string; isCorrect: boolean }[]>([]);

  // Safety check if questions are empty
  if (!questions || questions.length === 0) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center">
        <p className="text-white mb-4">Nenhuma pergunta encontrada para esta configuração.</p>
        <button onClick={onBack} className="text-cyber-cyan hover:underline">Voltar</button>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];

  const handleOptionClick = (index: number) => {
    if (isAnswered) return;

    setSelectedOption(index);
    setIsAnswered(true);

    const correct = index === currentQuestion.correctIndex;
    let newScore = score;
    if (correct) {
      newScore = score + 1;
      setScore(newScore);
    }

    const newAnswers = [...answers, { questionId: currentQuestion.id, isCorrect: correct }];
    setAnswers(newAnswers);

    // Transition delay
    const delay = 1500;

    // Auto advance
    setTimeout(() => {
      if (currentIndex < questions.length - 1) {
        setCurrentIndex((prev) => prev + 1);
        setSelectedOption(null);
        setIsAnswered(false);
      } else {
        onFinish(newScore, newAnswers);
      }
    }, delay);
  };

  // Stack specific colors
  const getColors = () => {
    switch (stack) {
      case 'HTML': return { text: 'text-cyber-orange', border: 'border-cyber-orange', bg: 'bg-cyber-orange' };
      case 'CSS': return { text: 'text-cyber-blue', border: 'border-cyber-blue', bg: 'bg-cyber-blue' };
      case 'JS': return { text: 'text-cyber-yellow', border: 'border-cyber-yellow', bg: 'bg-cyber-yellow' };
      case 'TS': return { text: 'text-cyber-ts', border: 'border-cyber-ts', bg: 'bg-cyber-ts' };
      case 'REACT': return { text: 'text-cyber-react', border: 'border-cyber-react', bg: 'bg-cyber-react' };
      case 'DEBUG': return { text: 'text-cyber-debug', border: 'border-cyber-debug', bg: 'bg-cyber-debug' };
      default: return { text: 'text-cyber-cyan', border: 'border-cyber-cyan', bg: 'bg-cyber-cyan' };
    }
  };

  const colors = getColors();

  return (
    <div className="w-full max-w-xl mx-auto p-4 flex flex-col h-full justify-center">
      
      {/* Header with Back Button */}
      <div className="flex justify-between items-center mb-6">
        <button 
          onClick={onBack}
          className="text-gray-400 hover:text-white text-sm font-medium transition-colors flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          VOLTAR
        </button>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between text-xs text-gray-400 font-mono mb-2">
          <span>QUESTÃO {currentIndex + 1} / {questions.length}</span>
          <span className={colors.text}>MODO {stack === 'DEBUG' ? 'DEBUG' : stack}</span>
        </div>
        <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
          <div 
            className={`h-full transition-all duration-300 ${colors.bg}`}
            style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Question Card */}
      <div className="glass-panel p-6 rounded-2xl shadow-lg mb-6 relative overflow-hidden group">
        <div className={`absolute top-0 left-0 w-1 h-full ${colors.bg}`}></div>
        
        <h2 className="text-xl md:text-2xl font-bold text-white mb-4 leading-tight">
          {currentQuestion.question}
        </h2>

        {currentQuestion.codeSnippet && (
          <div className="bg-[#1e1e1e] p-4 rounded-lg border border-gray-700 font-mono text-sm md:text-base text-gray-300 mb-4 overflow-x-auto shadow-inner">
            <pre><code>{currentQuestion.codeSnippet}</code></pre>
          </div>
        )}
      </div>

      {/* Options */}
      <div className="grid grid-cols-1 gap-3">
        {currentQuestion.options.map((option, idx) => {
          let stateStyles = "border-gray-700 bg-gray-800/50 hover:bg-gray-700/50 hover:border-gray-500 text-gray-300";
          
          if (isAnswered) {
            if (idx === currentQuestion.correctIndex) {
              stateStyles = "border-green-500 bg-green-500/20 text-green-400 shadow-[0_0_15px_rgba(34,197,94,0.3)]";
            } else if (idx === selectedOption) {
              stateStyles = "border-red-500 bg-red-500/20 text-red-400";
            } else {
              stateStyles = "opacity-50 border-gray-800";
            }
          }

          return (
            <button
              key={idx}
              onClick={() => handleOptionClick(idx)}
              disabled={isAnswered}
              className={`
                w-full p-4 rounded-xl border text-left transition-all duration-200
                font-medium relative overflow-hidden group
                ${stateStyles}
              `}
            >
              <div className="relative z-10 flex items-center">
                 <span className="w-6 h-6 rounded-full border border-current flex items-center justify-center text-xs mr-3 opacity-70">
                   {String.fromCharCode(65 + idx)}
                 </span>
                 {option}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default QuizGame;
