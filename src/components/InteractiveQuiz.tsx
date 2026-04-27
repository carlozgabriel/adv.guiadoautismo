import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, CheckCircle2, AlertCircle, ArrowRight, X, Star, BookOpen, ShieldCheck, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Option {
  label: string;
  feedback: string;
}

interface Question {
  id: number;
  text: string;
  options: Option[];
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    text: "Qual é o seu perfil principal em relação ao autismo?",
    options: [
      { label: "🏠 Pai/Mãe ou Familiar", feedback: "O Guia de Autismo 2026 foi desenhado especificamente para os desafios do ambiente doméstico, oferecendo o suporte prático que as famílias portuguesas tanto precisam." },
      { label: "🏫 Profissional de Educação", feedback: "Este guia traz as estratégias pedagógicas mais avançadas de 2026, transformando a sua sala de aula num exemplo de inclusão real e eficiente." },
      { label: "🩺 Terapeuta/Saúde", feedback: "O conteúdo deste guia complementa a prática clínica com abordagens práticas que os pacientes podem aplicar em casa, acelerando os resultados terapêuticos." },
      { label: "💡 Interesso-me pelo tema", feedback: "O Guia é a porta de entrada mais completa para quem deseja dominar o tema com base nas descobertas mais recentes e humanas de 2026." }
    ]
  },
  {
    id: 2,
    text: "Qual é a faixa etária da criança ou pessoa que acompanha?",
    options: [
      { label: "🧸 0-5 anos (Primeira Infância)", feedback: "Nesta fase, a plasticidade cerebral é máxima. O Guia foca na intervenção precoce para aproveitar cada janela de oportunidade no desenvolvimento." },
      { label: "📚 6-12 anos (Escolar)", feedback: "A fase escolar exige estratégias de socialização e foco. O Guia oferece métodos testados para garantir que a aprendizagem aconteça sem traumas." },
      { label: "🎒 13-18 anos (Adolescência)", feedback: "A adolescência traz desafios de autonomia e identidade. O Guia ajuda a navegar nesta transição com ferramentas de comunicação e autoconfiança." },
      { label: "👔 Adulto", feedback: "O suporte no autismo adulto é raro em Portugal. O Guia preenche esta lacuna com estratégias de organização e qualidade de vida para a maturidade." }
    ]
  },
  {
    id: 3,
    text: "Qual é o maior desafio que enfrenta atualmente?",
    options: [
      { label: "🧩 Diagnóstico e Primeiros Passos", feedback: "O Guia é o seu mapa após o diagnóstico. Ele elimina a confusão e entrega um passo a passo claro para começar a agir hoje mesmo." },
      { label: "📝 Dificuldades na Escola", feedback: "O Guia contém protocolos de adaptação escolar que garantem que a criança seja compreendida e apoiada em todo o seu potencial académico." },
      { label: "⛈️ Comportamento e Crises", feedback: "O Guia ensina a ler os sinais antes da crise. São técnicas práticas de regulação emocional que devolvem a paz e a harmonia à sua casa." },
      { label: "🤝 Inclusão Social", feedback: "O Guia fornece as ferramentas para construir uma rede de apoio sólida e ensinar a criança a navegar em contextos sociais com segurança." }
    ]
  },
  {
    id: 4,
    text: "Já conhece os novos direitos e apoios de 2026?",
    options: [
      { label: "❌ Não, ainda não conheço", feedback: "Este é o ponto mais forte do Guia: ele detalha todos os novos direitos e subsídios de 2026 para que não perca nenhum benefício por falta de informação." },
      { label: "🔍 Quero saber mais", feedback: "O Guia mergulha fundo nas atualizações legislativas de 2026, garantindo que tenha o conhecimento necessário para lutar pelos direitos da sua criança." },
      { label: "✅ Sim, estou a par", feedback: "Excelente! O Guia vai além da teoria e mostra como aplicar esses direitos na prática, garantindo que o sistema funcione a seu favor em 2026." }
    ]
  }
];

interface InteractiveQuizProps {
  onClose: () => void;
}

export const InteractiveQuiz: React.FC<InteractiveQuizProps> = ({ onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [isFinished, setIsFinished] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);

  const handleOptionSelect = (option: Option) => {
    setSelectedOption(option);
    setShowFeedback(true);
  };

  const handleConfirmFeedback = () => {
    if (selectedOption) {
      const newAnswers = [...answers, selectedOption.label];
      setAnswers(newAnswers);
      setShowFeedback(false);
      setSelectedOption(null);
      
      if (currentStep < QUESTIONS.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        setIsFinished(true);
      }
    }
  };

  const handleBack = () => {
    if (showFeedback) {
      setShowFeedback(false);
      setSelectedOption(null);
      return;
    }

    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      const newAnswers = [...answers];
      newAnswers.pop();
      setAnswers(newAnswers);
    } else {
      onClose();
    }
  };

  if (isFinished) {
    return (
      <div className="fixed inset-0 z-[100] bg-white flex flex-col items-center p-6 animate-in fade-in duration-500 overflow-y-auto">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors z-10"
        >
          <X size={24} />
        </button>

        <div className="max-w-2xl w-full text-center py-10">
          {/* Header de Sucesso */}
          <div className="flex justify-center mb-6">
            <div className="px-4 py-1.5 bg-green-50 text-green-700 rounded-full text-xs font-black uppercase tracking-widest flex items-center gap-2 border border-green-100">
              <CheckCircle2 size={14} /> Análise Concluída com Sucesso
            </div>
          </div>

          <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-6 tracking-tight leading-none">
            O Guia do Autismo é pra você ! <span className="text-blue-600">Podemos reservar o seu guia?</span>
          </h2>
          
          <p className="text-lg text-gray-600 mb-10 max-w-xl mx-auto leading-relaxed">
            Com base nas suas respostas, identificamos que o <strong>Guia do Autismo</strong> é a ferramenta ideal para superar os desafios de {answers[2]?.toLowerCase() || 'comportamento'} e garantir os direitos da sua criança em Portugal.
          </p>

          {/* Imagem do Produto Mockup */}
          <div className="relative mb-12 group">
            <div className="absolute inset-0 bg-blue-600/10 blur-3xl rounded-full transform -rotate-12 scale-75 group-hover:scale-90 transition-transform duration-700"></div>
            <img 
              src="/001.png" 
              alt="Guia do Autismo 2026" 
              className="relative w-full max-w-lg mx-auto rounded-2xl shadow-2xl transform transition-transform duration-500 hover:scale-[1.02]"
            />
            <div className="absolute -bottom-6 -right-4 md:right-10 bg-yellow-400 text-gray-900 font-black px-6 py-4 rounded-2xl shadow-xl transform rotate-3 flex flex-col items-center">
              <span className="text-[10px] uppercase tracking-tighter opacity-70">OFERTA LIMITADA</span>
              <span className="text-2xl">-10€ OFF</span>
            </div>
          </div>

          {/* Seção de Preço e Oferta */}
          <div className="bg-blue-50/50 p-8 rounded-[2.5rem] border border-blue-100 mb-12">
            <p className="text-blue-900 font-medium mb-6 text-lg">
              Para que você consiga acessar o seu guia sem dificuldades liberamos um <strong>super desconto de 10 euros</strong>. Clique no botão abaixo:
            </p>
            
            <div className="flex flex-col items-center gap-2 mb-6">
              <span className="text-gray-400 line-through text-xl font-bold">de 47€</span>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl md:text-6xl font-black text-green-600 tracking-tighter">37€</span>
                <span className="text-sm font-bold text-green-600 uppercase">Pagamento Único</span>
              </div>
              <p className="text-blue-900/60 text-sm font-medium">Acesso imediato ao Guia</p>
            </div>

            <a 
              href="https://guiadoautismopt.vercel.app/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full bg-green-600 hover:bg-green-700 text-white font-black py-6 rounded-3xl text-2xl shadow-2xl shadow-green-900/40 transition-all transform hover:scale-[1.02] active:scale-[0.98] flex flex-col items-center justify-center gap-1 group"
            >
              <span className="flex items-center gap-2 uppercase">
                INICIAR AGORA <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </span>
            </a>
          </div>

          {/* Características do Livro */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16 text-left">
            {[
              { icon: <BookOpen />, title: "100+ Páginas", desc: "Conteúdo prático e direto ao ponto." },
              { icon: <Zap />, title: "Estratégias 2026", desc: "Atualizado com as leis vigentes em Portugal." },
              { icon: <ShieldCheck />, title: "Protocolos de Crise", desc: "Passo a passo para regulação emocional." },
              { icon: <Star />, title: "Método Comprovado", desc: "Focado em resultados reais no dia a dia." }
            ].map((feature, i) => (
              <div key={i} className="flex gap-4 p-4 rounded-2xl border border-gray-100 bg-white shadow-sm">
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center shrink-0">
                  {React.cloneElement(feature.icon as React.ReactElement, { size: 24 })}
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">{feature.title}</h4>
                  <p className="text-sm text-gray-500">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Prova Social */}
          <div className="mb-12">
            <h3 className="text-xl font-black text-gray-900 mb-8 uppercase tracking-widest text-center">O que dizem as famílias 🇵🇹</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { name: "Maria S.", city: "Lisboa", text: "Finalmente um guia que fala a nossa língua e entende a realidade de Portugal." },
                { name: "João P.", city: "Porto", text: "As estratégias de regulação emocional mudaram o ambiente na nossa casa." },
                { name: "Carla M.", city: "Coimbra", text: "O capítulo sobre direitos ajudou-nos a conseguir o apoio que a escola negava." }
              ].map((testimony, i) => (
                <div key={i} className="bg-gray-50 p-6 rounded-3xl text-left relative">
                  <div className="flex text-yellow-400 mb-4">
                    {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                  </div>
                  <p className="text-gray-600 text-sm italic mb-4">"{testimony.text}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-xs">
                      {testimony.name[0]}
                    </div>
                    <div>
                      <p className="text-xs font-black text-gray-900">{testimony.name}</p>
                      <p className="text-[10px] text-gray-400">{testimony.city}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em] mb-10">
            © 2026 Guia do Autismo • Bookmundo Portugal
          </p>
        </div>
      </div>
    );
  }

  const progress = ((currentStep) / QUESTIONS.length) * 100;

  return (
    <div className="fixed inset-0 z-[100] bg-gray-50 flex flex-col">
      {/* Header do Quiz */}
      <div className="bg-white px-6 py-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <button 
            onClick={handleBack}
            className="p-2 rounded-full transition-colors text-gray-400 hover:bg-gray-100 hover:text-gray-600"
          >
            {currentStep === 0 ? <X size={24} /> : <ChevronLeft size={24} />}
          </button>
          <div className="h-6 w-[1px] bg-gray-200 mx-1"></div>
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Guia do Autismo</span>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Etapa {currentStep + 1}/{QUESTIONS.length}</span>
          <div className="w-24 h-1.5 bg-gray-100 rounded-full mt-1 overflow-hidden">
             <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${progress + 25}%` }}
              className="h-full bg-blue-600"
            />
          </div>
        </div>
      </div>

      {/* Corpo do Quiz */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 pb-12 overflow-y-auto">
        <div className="max-w-md w-full">
          <AnimatePresence mode="wait">
            {showFeedback && selectedOption ? (
              <motion.div 
                key="feedback"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col items-center text-center"
              >
                <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 mb-8 shadow-inner">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring" }}
                  >
                    <CheckCircle2 size={40} />
                  </motion.div>
                </div>
                
                <h3 className="text-lg font-bold text-blue-600 uppercase tracking-widest mb-2">
                  {selectedOption.label}
                </h3>
                
                <p className="text-2xl md:text-3xl font-medium text-gray-800 mb-10 leading-relaxed italic px-4">
                  "{selectedOption.feedback}"
                </p>

                <button
                  onClick={handleConfirmFeedback}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-5 rounded-2xl text-xl shadow-xl shadow-blue-900/20 transition-all active:scale-[0.98] uppercase tracking-[0.2em]"
                >
                  CONCORDO
                </button>
              </motion.div>
            ) : (
              <motion.div 
                key={currentStep}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="flex flex-col"
              >
                <h3 className="text-3xl md:text-4xl font-black text-gray-900 mb-10 leading-tight tracking-tight">
                  {QUESTIONS[currentStep].text}
                </h3>

                <div className="grid grid-cols-1 gap-4">
                  {QUESTIONS[currentStep].options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleOptionSelect(option)}
                      className="w-full text-left p-6 rounded-2xl bg-white border-2 border-transparent shadow-sm hover:border-blue-600 hover:shadow-xl hover:shadow-blue-900/5 transition-all group active:scale-[0.98]"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-gray-800 font-bold text-lg leading-tight group-hover:text-blue-700 transition-colors">
                          {option.label}
                        </span>
                        <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all shadow-inner">
                          <ChevronRight size={20} />
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Footer do Quiz */}
      <div className="p-6 text-center">
        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.3em]">
          Ambiente Seguro & Privado • 2026
        </p>
      </div>
    </div>
  );
};
