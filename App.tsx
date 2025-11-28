
import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import QuizGame from './components/QuizGame';
import { QUESTIONS } from './constants';
import { AppState, GameConfig, Stack, Difficulty } from './types';

function App() {
  const [appState, setAppState] = useState<AppState>('menu');
  const [config, setConfig] = useState<GameConfig>({ stack: null, difficulty: null });
  const [finalScore, setFinalScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);

  const getFilteredQuestions = () => {
    // For Debug mode, ignore difficulty filtering
    if (config.stack === 'DEBUG') {
        return QUESTIONS.filter(q => q.stack === config.stack);
    }
    // For normal stacks, filter by both
    return QUESTIONS.filter(q => q.stack === config.stack && q.difficulty === config.difficulty);
  };

  const handleFinishQuiz = (score: number) => {
    const questions = getFilteredQuestions();
    const count = questions.length;
    
    setFinalScore(score);
    setTotalQuestions(count);
    
    setAppState('result');
  };

  const handleBackFromQuiz = () => {
    setAppState('selection');
  };

  const resetGame = () => {
    setConfig({ stack: null, difficulty: null });
    setAppState('menu');
  };

  const retryGame = () => {
    if (config.stack === 'DEBUG') {
        setAppState('quiz');
    } else {
        setAppState('selection'); 
    }
  };

  const getStackStyle = (stack: Stack) => {
    switch (stack) {
      case 'HTML': return 'hover:border-cyber-orange hover:shadow-[0_0_20px_rgba(255,107,0,0.2)] text-cyber-orange';
      case 'CSS': return 'hover:border-cyber-blue hover:shadow-[0_0_20px_rgba(41,101,241,0.2)] text-cyber-blue';
      case 'JS': return 'hover:border-cyber-yellow hover:shadow-[0_0_20px_rgba(247,223,30,0.2)] text-cyber-yellow';
      case 'TS': return 'hover:border-cyber-ts hover:shadow-[0_0_20px_rgba(49,120,198,0.2)] text-cyber-ts';
      case 'REACT': return 'hover:border-cyber-react hover:shadow-[0_0_20px_rgba(97,218,251,0.2)] text-cyber-react';
      case 'DEBUG': return 'hover:border-cyber-debug hover:shadow-[0_0_20px_rgba(239,68,68,0.2)] text-cyber-debug border-cyber-debug/30';
      default: return '';
    }
  };

  // --- RENDER HELPERS ---

  const renderMenu = () => (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 animate-[fadeIn_0.5s_ease-out]">
      <h1 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyber-cyan to-cyber-purple mb-2 text-center tracking-tighter drop-shadow-[0_0_10px_rgba(188,19,254,0.5)]">
        ARENA<br/>FRONT-END
      </h1>
      <p className="text-gray-400 font-mono mb-12 text-sm tracking-widest"> MAIS DE 1.000 PERGUNTAS </p>

      <div className="flex flex-col gap-4 w-full max-w-xs">
        <button 
          onClick={() => setAppState('selection')}
          className="group relative px-8 py-4 bg-cyber-card border border-cyber-cyan/30 rounded-full text-cyber-cyan font-bold tracking-wider hover:bg-cyber-cyan hover:text-black transition-all duration-300 shadow-[0_0_20px_rgba(0,243,255,0.1)] hover:shadow-[0_0_30px_rgba(0,243,255,0.6)]"
        >
          <span className="relative z-10">INICIAR MISSÃO</span>
        </button>
      </div>
    </div>
  );

  const renderSelection = () => (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 w-full max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold text-white mb-8 font-mono">
        <span className="text-cyber-purple mr-2">{'>'}</span>
        {config.stack ? 'ESCOLHA A DIFICULDADE' : 'ESCOLHA A MISSÃO'}
      </h2>

      {!config.stack ? (
        <div className="w-full flex flex-col gap-8 animate-[fadeIn_0.3s]">
          {/* Main Stacks */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 w-full">
            {(['HTML', 'CSS', 'JS', 'TS', 'REACT'] as Stack[]).map((stack) => {
              const style = getStackStyle(stack);
              return (
                <button
                  key={stack}
                  onClick={() => setConfig({ ...config, stack })}
                  className={`
                    aspect-square rounded-2xl glass-panel border border-white/5 p-4 flex flex-col items-center justify-center gap-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg
                    ${style}
                  `}
                >
                  <div className="font-black text-2xl md:text-3xl tracking-tight">
                    {stack}
                  </div>
                  <div className="text-[10px] md:text-xs text-gray-400 font-mono uppercase opacity-70">MÓDULO</div>
                </button>
              );
            })}
          </div>

          {/* Special Modes */}
          <div className="w-full">
            <h3 className="text-gray-500 text-xs font-mono uppercase tracking-widest mb-4 border-b border-gray-800 pb-2">OPERAÇÕES ESPECIAIS</h3>
            <div className="grid grid-cols-1">
                 {/* DEBUG MODE */}
                <button
                  onClick={() => {
                      setConfig({ stack: 'DEBUG', difficulty: 'Special' });
                      setAppState('quiz');
                  }}
                  className={`
                    relative overflow-hidden group p-6 rounded-2xl glass-panel border flex items-center justify-between gap-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg
                    ${getStackStyle('DEBUG')}
                  `}
                >
                   <div className="flex flex-col items-start">
                     <span className="font-black text-2xl tracking-tight">DEBUG MODE</span>
                     <span className="text-xs text-gray-400 font-mono mt-1">CAÇA AOS BUGS • CÓDIGO QUEBRADO</span>
                   </div>
                   <div className="text-4xl opacity-50 group-hover:opacity-100 group-hover:rotate-12 transition-all">
                     🐛
                   </div>
                </button>
            </div>
          </div>
          
          <button 
            onClick={resetGame}
            className="self-center mt-4 text-gray-500 hover:text-white text-sm"
          >
            ← MENU PRINCIPAL
          </button>
        </div>
      ) : (
        // Difficulty Selection (Only for standard stacks)
        <div className="flex flex-col gap-4 w-full max-w-sm animate-[fadeIn_0.3s]">
          {(['Junior', 'Pleno', 'Senior'] as Difficulty[]).map((diff) => (
             <button
             key={diff}
             onClick={() => {
               setConfig({ ...config, difficulty: diff });
               setTimeout(() => setAppState('quiz'), 100);
             }}
             className="relative overflow-hidden group p-5 rounded-xl border border-gray-700 bg-gray-800/30 hover:bg-gray-700/50 hover:border-cyber-cyan transition-all text-left"
           >
             <div className="flex justify-between items-center relative z-10">
               <span className="text-xl font-bold text-white">{diff}</span>
               <span className={`text-xs px-2 py-1 rounded bg-black/50 font-mono
                 ${diff === 'Junior' ? 'text-green-400' : diff === 'Pleno' ? 'text-yellow-400' : 'text-red-500'}
               `}>
                 {diff === 'Junior' ? 'FÁCIL' : diff === 'Pleno' ? 'MÉDIO' : 'DIFÍCIL'}
               </span>
             </div>
             {/* Hover Glow */}
             <div className="absolute inset-0 bg-gradient-to-r from-cyber-cyan/0 via-cyber-cyan/10 to-cyber-cyan/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
           </button>
          ))}
           <button 
            onClick={() => setConfig({ ...config, stack: null })}
            className="mt-4 text-gray-500 hover:text-white text-sm"
          >
            ← VOLTAR PARA TECNOLOGIA
          </button>
        </div>
      )}
    </div>
  );

  const renderResult = () => {
    const percentage = totalQuestions > 0 ? (finalScore / totalQuestions) * 100 : 0;
    const data = [
      { name: 'Corretas', value: finalScore },
      { name: 'Erradas', value: totalQuestions - finalScore },
    ];
    
    let message = '';
    let subMessage = '';
    if (percentage === 100) {
      message = 'NÍVEL DIVINO';
      subMessage = 'Execução de código perfeita.';
    } else if (percentage >= 70) {
      message = 'DESENVOLVEDOR SÊNIOR';
      subMessage = 'Ótimo trabalho, integridade alta.';
    } else if (percentage >= 40) {
      message = 'DESENVOLVEDOR JÚNIOR';
      subMessage = 'Continue treinando sua rede neural.';
    } else {
      message = 'ERRO DE SINTAXE';
      subMessage = 'Falha no sistema. Estudo necessário.';
    }

    const COLORS = ['#00f3ff', '#334155'];

    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-6 animate-[fadeIn_0.5s]">
        <h2 className="text-3xl font-bold text-white mb-8 tracking-widest">RESULTADOS</h2>
        
        <div className="w-64 h-64 relative mb-8">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={80}
                outerRadius={100}
                startAngle={90}
                endAngle={-270}
                dataKey="value"
                stroke="none"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-5xl font-black text-white">{Math.round(percentage)}%</span>
            <span className="text-xs text-gray-400 font-mono">PRECISÃO</span>
          </div>
        </div>

        <h3 className={`text-2xl font-bold mb-2 text-center ${percentage >= 70 ? 'text-green-400' : percentage >= 40 ? 'text-yellow-400' : 'text-red-500'}`}>
          {message}
        </h3>
        <p className="text-gray-400 mb-12 text-center">{subMessage}</p>

        <div className="flex gap-4 w-full max-w-sm">
           <button 
             onClick={retryGame}
             className="flex-1 py-3 bg-cyber-card border border-white/10 rounded-xl hover:bg-white/5 transition-colors font-bold text-white text-sm md:text-base"
           >
             TENTAR NOVAMENTE
           </button>
           <button 
             onClick={resetGame}
             className="flex-1 py-3 bg-cyber-cyan text-black rounded-xl font-bold hover:bg-cyan-400 transition-colors shadow-[0_0_15px_rgba(0,243,255,0.4)] text-sm md:text-base"
           >
             MENU PRINCIPAL
           </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-cyber-dark text-white font-sans selection:bg-cyber-purple selection:text-white">
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyber-purple/10 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-cyber-cyan/10 blur-[120px] rounded-full"></div>
      </div>

      <div className="relative z-10">
        {appState === 'menu' && renderMenu()}
        {appState === 'selection' && renderSelection()}
        {appState === 'quiz' && config.stack && (
          <QuizGame 
            questions={getFilteredQuestions()} 
            onFinish={handleFinishQuiz}
            onBack={handleBackFromQuiz}
            stack={config.stack}
          />
        )}
        {appState === 'result' && renderResult()}
      </div>
    </div>
  );
}

export default App;
