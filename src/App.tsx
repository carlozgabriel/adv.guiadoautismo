import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { AdvertorialArticle } from './components/AdvertorialArticle';
import { InteractiveQuiz } from './components/InteractiveQuiz';
import { LandingPage } from './components/LandingPage';
import { FunnelAnalyticsDashboard } from './components/FunnelAnalyticsDashboard';
import { Footer } from './components/Footer';
import { motion, AnimatePresence } from 'motion/react';
import { 
  updateUrlStep, 
  trackAdvertorialView, 
  trackQuizStart, 
  trackLandingPageView 
} from './utils/tracking';

export default function App() {
  const [view, setView] = useState<'article' | 'quiz' | 'landing' | 'analytics'>('article');
  const [quizCategory, setQuizCategory] = useState<string>('');

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Suporte a acesso interno restrito via URL: /trackeamento, ?view=trackeamento, ?step=lp ou #oferta
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname.toLowerCase();
      const params = new URLSearchParams(window.location.search);
      const stepParam = params.get('step') || params.get('view');
      
      if (path.includes('/trackeamento') || stepParam === 'trackeamento' || window.location.hash === '#trackeamento') {
        setView('analytics');
      } else if (stepParam === 'lp' || stepParam === 'landing' || window.location.hash === '#oferta') {
        setView('landing');
        trackLandingPageView(false);
      } else if (stepParam === 'quiz') {
        setView('quiz');
        trackQuizStart();
      } else {
        trackAdvertorialView();
      }
    }
  }, []);

  const handleStartQuiz = () => {
    setView('quiz');
    updateUrlStep('quiz');
    trackQuizStart();
    scrollToTop();
  };

  const handleCloseQuiz = () => {
    setView('article');
    updateUrlStep('article');
    scrollToTop();
  };

  const handleFinishQuiz = (category?: string) => {
    if (category) setQuizCategory(category);
    setView('landing');
    updateUrlStep('landing');
    trackLandingPageView(true, category);
    scrollToTop();

    // Rolar suavemente para a oferta personalizada
    setTimeout(() => {
      const ofertaEl = document.getElementById('oferta');
      if (ofertaEl) {
        ofertaEl.scrollIntoView({ behavior: 'smooth' });
      }
    }, 450);
  };

  const handleBackFromAnalytics = () => {
    setView('article');
    if (typeof window !== 'undefined') {
      window.history.pushState({}, '', '/');
    }
    scrollToTop();
  };

  return (
    <div className="min-h-screen bg-[#f4f4f4] font-sans selection:bg-blue-100 selection:text-blue-900">
      <AnimatePresence mode="wait">
        {view === 'analytics' ? (
          <motion.div
            key="analytics-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full"
          >
            <FunnelAnalyticsDashboard onBackToFunnel={handleBackFromAnalytics} />
          </motion.div>
        ) : view === 'landing' ? (
          <motion.div
            key="landing-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="w-full"
          >
            <LandingPage 
              fromQuiz={!!quizCategory} 
              quizCategory={quizCategory}
              onBackToArticle={() => {
                setView('article');
                updateUrlStep('article');
                scrollToTop();
              }}
            />
          </motion.div>
        ) : (
          <motion.div
            key="article-flow"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="max-w-[480px] mx-auto bg-white min-h-screen shadow-2xl flex flex-col relative"
          >
            <Header />
            
            <main className="flex-1 pb-24 overflow-x-hidden">
              <AnimatePresence mode="wait">
                {view === 'article' ? (
                  <motion.div
                    key="article"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                  >
                    <AdvertorialArticle onStartQuiz={handleStartQuiz} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="quiz"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <InteractiveQuiz 
                      onClose={handleCloseQuiz} 
                      onComplete={handleFinishQuiz}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
              
              {/* Floating CTA for Mobile only when in article view */}
              {view === 'article' && (
                <motion.div 
                  initial={{ y: 100 }}
                  animate={{ y: 0 }}
                  transition={{ delay: 1.5, duration: 0.5 }}
                  className="fixed bottom-6 left-1/2 -translate-x-1/2 w-full max-w-[440px] px-4 z-40"
                >
                  <button 
                    onClick={handleStartQuiz}
                    className="w-full bg-[#1e40af] text-white py-4 rounded-xl font-black text-lg shadow-2xl shadow-blue-900/30 flex flex-col items-center justify-center border-2 border-white/20 active:scale-95 transition-transform cursor-pointer"
                  >
                    <span className="text-xs opacity-90 font-bold uppercase tracking-widest mb-1">Descubra se este guia é para si</span>
                    <span className="tracking-widest">INICIAR</span>
                  </button>
                </motion.div>
              )}
            </main>

            <Footer />
          </motion.div>
        )}
      </AnimatePresence>

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
