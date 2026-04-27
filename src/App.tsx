import React, { useState } from 'react';
import { Header } from './components/Header';
import { AdvertorialArticle } from './components/AdvertorialArticle';
import { InteractiveQuiz } from './components/InteractiveQuiz';
import { Footer } from './components/Footer';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [view, setView] = useState<'article' | 'quiz'>('article');

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartQuiz = () => {
    setView('quiz');
    scrollToTop();
  };

  return (
    <div className="min-h-screen bg-[#f4f4f4] font-sans selection:bg-blue-100 selection:text-blue-900">
      <div className="max-w-[480px] mx-auto bg-white min-h-screen shadow-2xl flex flex-col relative">
        <Header />
        
        <main className="flex-1 pb-24 overflow-x-hidden">
          <AnimatePresence mode="wait">
            {view === 'article' ? (
              <motion.div
                key="article"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <AdvertorialArticle onStartQuiz={handleStartQuiz} />
              </motion.div>
            ) : (
              <motion.div
                key="quiz"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <InteractiveQuiz onClose={() => setView('article')} />
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Floating CTA for Mobile only when in article view */}
          {view === 'article' && (
            <motion.div 
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              transition={{ delay: 2, duration: 0.5 }}
              className="fixed bottom-6 left-1/2 -translate-x-1/2 w-full max-w-[440px] px-4 z-40"
            >
              <button 
                onClick={handleStartQuiz}
                className="w-full bg-[#1e40af] text-white py-4 rounded-xl font-black text-lg shadow-2xl shadow-blue-900/30 flex flex-col items-center justify-center border-2 border-white/20 active:scale-95 transition-transform"
              >
                <span className="text-xs opacity-90 font-bold uppercase tracking-widest mb-1">Descubra se este guia é para si</span>
                <span className="tracking-widest">INICIAR</span>
              </button>
            </motion.div>
          )}
        </main>

        <Footer />
      </div>
      
      {/* Global CSS for scrollbar and fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
        
        body {
          font-family: 'Inter', sans-serif;
          -webkit-font-smoothing: antialiased;
        }

        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
