import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Puzzle, 
  Brain, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck,
  Star,
  Users,
  X,
  ChevronDown,
  HelpCircle,
  Sparkles
} from "lucide-react";
import { trackCheckoutInitiate, getHotmartUrlWithTracking } from "../utils/tracking";

interface LandingPageProps {
  fromQuiz?: boolean;
  quizCategory?: string;
  onBackToArticle?: () => void;
}

const PuzzlePiece = ({ color, className, delay = 0, size = 64 }: { color: string, className: string, delay?: number, size?: number }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
    animate={{ opacity: 0.1, scale: 1, rotate: 0 }}
    transition={{ duration: 1.5, delay, ease: "easeOut" }}
    className={`absolute pointer-events-none ${className}`}
  >
    <Puzzle size={size} fill={color} color={color} />
  </motion.div>
);

const FAQS = [
  {
    question: "Como e quando recebo o acesso ao Guia do Autismo?",
    answer: "O acesso é 100% digital e imediato! Assim que o seu pagamento for aprovado pela Hotmart, receberá automaticamente no seu e-mail o link seguro para aceder ao Guia Completo. Poderá ler imediatamente no telemóvel, tablet ou computador."
  },
  {
    question: "Quais são os métodos de pagamento aceites em Portugal?",
    answer: "Pode pagar com toda a segurança através de MB WAY, Referência Multibanco ou Cartão Bancário (Crédito/Débito). O pagamento é processado diretamente pelo ambiente seguro da Hotmart com encriptação bancária de 256 bits."
  },
  {
    question: "O guia é adaptado à legislação e escolas de Portugal?",
    answer: "Sim! Este é o grande diferencial deste material em relação a outros conteúdos genéricos da internet. O Guia do Autismo 2026 aborda especificamente os apoios da Segurança Social portuguesa, o funcionamento do SNS e os protocolos de Educação Inclusiva (Decreto-Lei 54/2018) nas escolas de Portugal."
  },
  {
    question: "E se o guia não me ajudar? Tem garantia?",
    answer: "Sim, tem garantia incondicional de 7 dias! Pode aceder ao livro, ler todos os capítulos e colocar as estratégias em prática. Se sentir que não agregou valor ao seu dia a dia, basta pedir reembolso na Hotmart e recebe 100% do seu dinheiro de volta, sem complicações."
  },
  {
    question: "O pagamento é mensal ou taxa única?",
    answer: "É um pagamento único de apenas 16€. Não existem assinaturas, mensalidades nem custos adicionais escondidos. O acesso ao material descarregado é seu para sempre."
  }
];

export const LandingPage: React.FC<LandingPageProps> = ({ fromQuiz = false, quizCategory, onBackToArticle }) => {
  const [activeModal, setActiveModal] = useState<'termos' | 'privacidade' | 'contacto' | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [showMobileBar, setShowMobileBar] = useState(false);

  // Monitora scroll para exibir barra fixa no mobile apenas quando a oferta não está visível na tela
  useEffect(() => {
    const handleScroll = () => {
      const ofertaEl = document.getElementById("oferta");
      if (!ofertaEl) {
        setShowMobileBar(window.scrollY > 450);
        return;
      }
      const rect = ofertaEl.getBoundingClientRect();
      const isOfertaInView = rect.top < window.innerHeight && rect.bottom > 100;

      if (window.scrollY > 450 && !isOfertaInView) {
        setShowMobileBar(true);
      } else {
        setShowMobileBar(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Se veio do quiz ou tem #oferta na URL, rola suavemente até a oferta
  useEffect(() => {
    if (window.location.hash === '#oferta') {
      const el = document.getElementById('oferta');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, []);

  const getHotmartCheckoutUrl = () => getHotmartUrlWithTracking();

  const fadeIn = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-100px" },
    transition: { duration: 0.8, ease: [0.21, 1, 0.44, 1] }
  };

  return (
    <div className="relative min-h-screen bg-white selection:bg-brand-blue/10 overflow-x-hidden">
      {/* Banner de retorno do Quiz (se aplicável) */}
      {fromQuiz && (
        <div className="bg-emerald-600 text-white py-3 px-4 text-center font-bold text-xs sm:text-sm tracking-wide shadow-md sticky top-0 z-50 flex items-center justify-center gap-2">
          <Sparkles size={16} className="text-yellow-300 animate-spin" />
          <span>
            Perfil Validado! Desconto de <strong>-21€ libertado</strong> com base no seu teste.
          </span>
          <a href="#oferta" className="underline font-black hover:text-yellow-200 ml-1">
            Ver oferta abaixo ↓
          </a>
        </div>
      )}

      {/* Background Decor - Desktop & Mobile */}
      <PuzzlePiece color="#F59E0B" className="bottom-1/4 -left-12 w-32 h-32" delay={0.6} size={100} />

      {/* Top Banner Image with Gradient Fade */}
      <div className="relative w-full h-[350px] md:h-[550px] overflow-hidden">
        <img 
          src="/003.png" 
          alt="Banner Guia do Autismo" 
          className="w-full h-full object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&q=80&w=1600";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent"></div>
      </div>

      {/* Hero Section */}
      <section className="relative z-10 -mt-20 md:-mt-36 pb-20 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Hero Content */}
          <div className="flex-1 text-center lg:text-left space-y-8">
            <motion.h1 
              {...fadeIn}
              className="text-4xl md:text-6xl lg:text-7xl font-black leading-[1.05] text-slate-900 tracking-tight"
            >
              O Guia completo do <span className="text-brand-blue">autismo</span> para pais e educadores
            </motion.h1>

            <motion.p 
              {...fadeIn}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto lg:mx-0"
            >
              Mais de 100 páginas com estratégias práticas para lidar com crises, rotinas e direitos em Portugal. O suporte que a sua família merece.
            </motion.p>

            <motion.div {...fadeIn} transition={{ delay: 0.3 }} className="pt-4 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a href="#oferta" className="bg-brand-blue text-white px-8 py-5 rounded-2xl font-bold text-lg hover:bg-blue-900 shadow-2xl shadow-brand-blue/30 transition-all transform hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-3 btn-premium">
                Quero o Guia Agora <ArrowRight size={20} />
              </a>
            </motion.div>

            {/* Micro Badges */}
            <motion.div {...fadeIn} transition={{ delay: 0.4 }} className="flex flex-wrap justify-center lg:justify-start gap-6 pt-8 border-t border-slate-200">
               <div className="flex items-center gap-2 text-slate-500 font-bold text-xs uppercase tracking-widest">
                 <ShieldCheck size={18} className="text-brand-green" /> Compra Segura
               </div>
               <div className="flex items-center gap-2 text-slate-500 font-bold text-xs uppercase tracking-widest">
                 <Star size={18} className="text-brand-yellow" /> 4.9/5 Estrelas
               </div>
               <div className="flex items-center gap-2 text-slate-500 font-bold text-xs uppercase tracking-widest">
                 <Users size={18} className="text-brand-blue" /> +2.500 Famílias
               </div>
            </motion.div>
          </div>

          {/* Hero Visual - Book Cover focus */}
          <div className="flex-1 relative w-full max-w-[500px] mx-auto pt-10 lg:pt-0">
            <motion.div 
               initial={{ opacity: 0, x: 50, rotate: 5 }}
               animate={{ opacity: 1, x: 0, rotate: 0 }}
               transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
               className="relative z-20 group"
            >
              {/* Main Book Image */}
              <div className="relative rounded-lg shadow-[0_50px_100px_-20px_rgba(30,58,138,0.4)] transition-transform duration-700 group-hover:scale-[1.02] overflow-hidden">
                <img 
                  src="/002.png" 
                  alt="Guia do Autismo 2026 - Livro" 
                  className="w-full h-auto block"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const parent = target.parentElement;
                    if (parent) {
                      parent.classList.add('aspect-[3/4]', 'bg-brand-blue', 'flex', 'items-center', 'justify-center', 'p-12', 'text-white', 'text-center');
                      parent.innerHTML = '<div class="space-y-4"><p class="text-xs font-black uppercase tracking-[0.3em] opacity-60">Carregue o livro como</p><p class="text-xl font-black">002.png</p></div>';
                    }
                  }}
                />
              </div>

              {/* Floating Element - Mobile */}
              <motion.div 
                animate={{ y: [0, -15, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="absolute -top-6 -right-6 md:-right-10 glass-panel p-4 md:p-6 rounded-2xl z-30 max-w-[160px] md:max-w-[200px] border-b-4 border-brand-yellow"
              >
                <div className="flex gap-1 mb-2">
                  {[1,2,3,4,5].map(i => <Star key={i} size={12} fill="#F59E0B" color="#F59E0B" />)}
                </div>
                <p className="text-slate-900 font-black text-xs md:text-sm mb-1 uppercase tracking-tighter">Leitura Essencial</p>
                <p className="text-slate-600 text-[10px] md:text-xs font-medium">"Mudou a dinâmica da nossa casa em semanas."</p>
              </motion.div>
              
              {/* Floating Element - Portugal */}
              <motion.div 
                animate={{ y: [0, 15, 0] }}
                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-8 -left-6 md:-left-12 glass-panel p-4 md:p-6 rounded-2xl z-30 flex items-center gap-3 border-b-4 border-brand-green"
              >
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-green-50 flex items-center justify-center">
                  <span className="text-lg">🇵🇹</span>
                </div>
                <div>
                  <p className="text-slate-900 font-black text-xs md:text-sm uppercase tracking-tighter">Portugal</p>
                  <p className="text-slate-600 text-[10px] md:text-xs font-medium">Específico para o SNS e Escolas PT.</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pain Points Section */}
      <section className="py-24 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div {...fadeIn} className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">Sente-se <span className="text-brand-red">perdido(a)</span> nestes momentos?</h2>
            <p className="text-slate-500 max-w-xl mx-auto uppercase text-xs font-black tracking-[0.2em]">Não está sozinho(a)</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: <MessageCircleOff className="text-brand-red" />, title: "Dificuldade na Comunicação", desc: "Quando o silêncio ou as ecolalias tornam o entendimento impossível." },
              { icon: <Brain className="text-brand-yellow" />, title: "Crises Sensoriais", desc: "Momentos de sobrecarga onde nada parece acalmar a criança." },
              { icon: <Users className="text-brand-blue" />, title: "Isolamento Social", desc: "O medo de sair de casa e enfrentar olhares de julgamento." }
            ].map((item, i) => (
              <motion.div 
                {...fadeIn} 
                transition={{ delay: i * 0.1 }}
                key={i} 
                className="p-8 rounded-[32px] bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-2xl hover:shadow-slate-200/50 transition-all group"
              >
                <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <h3 className="text-xl font-black text-slate-900 mb-4">{item.title}</h3>
                <p className="text-slate-600 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Combined Pricing & Book Section */}
      <section id="oferta" className="py-24 md:py-32 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="grid lg:grid-cols-2 gap-20 items-center mb-20">
            {/* Book Visual Side */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute -inset-10 bg-brand-blue/5 rounded-full blur-3xl -z-10"></div>
              <img 
                src="/004.png" 
                alt="Livro Guia do Autismo" 
                className="w-full max-w-[400px] mx-auto h-auto rounded-xl shadow-[0_50px_100px_-20px_rgba(0,85,255,0.25)]"
              />
              <div className="absolute -bottom-6 -right-4 bg-brand-blue text-white p-6 rounded-3xl shadow-xl max-w-[200px]">
                <p className="font-bold text-lg leading-tight italic">"O guia que toda a família precisava."</p>
              </div>
            </motion.div>

            {/* Pricing Side */}
            <div className="space-y-8">
              <div className="text-center lg:text-left space-y-4">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-black uppercase tracking-widest border border-emerald-200">
                  <Star size={14} className="text-amber-500 fill-amber-500" /> Oferta Exclusiva 2026
                </div>
                <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
                  Aceda ao Guia Completo por <span className="text-brand-green">apenas 16€</span>
                </h2>
                <p className="text-slate-600 text-base md:text-lg leading-relaxed">
                  Acesso digital imediato para telemóvel, tablet e computador. Comece a aplicar hoje mesmo as estratégias que trazem tranquilidade ao vosso lar.
                </p>
              </div>

              {/* Single High-Conversion Card */}
              <motion.div 
                {...fadeIn}
                className="bg-white border-2 border-brand-green p-6 sm:p-8 md:p-10 rounded-[32px] shadow-2xl shadow-brand-green/10 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 bg-brand-green text-white text-[9px] font-black uppercase tracking-widest px-5 py-1.5 rounded-bl-2xl">
                  -55% DE DESCONTO
                </div>

                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 mb-6">
                  <div>
                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.3em] mb-1">Acesso Digital Imediato</p>
                    <h3 className="text-2xl font-black text-slate-900 tracking-tight">GUIA COMPLETO 2026</h3>
                  </div>
                  <div className="text-left sm:text-right">
                    <span className="text-slate-400 line-through text-lg font-bold block">de 37€</span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl md:text-5xl font-black text-brand-green tracking-tighter">16€</span>
                      <span className="text-xs font-bold text-slate-500 uppercase">Único</span>
                    </div>
                  </div>
                </div>

                {/* Hotmart Trust Banner */}
                <div className="mb-6 p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <img 
                      src="/Hotmart_Logo.svg.png" 
                      alt="Hotmart Logo" 
                      className="h-7 w-auto opacity-90"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                      }}
                    />
                    <div className="text-left">
                      <p className="text-xs font-bold text-slate-800 leading-tight">Pagamento 100% Seguro</p>
                      <p className="text-[10px] text-slate-500">Entrega imediata por e-mail via Hotmart</p>
                    </div>
                  </div>
                  <ShieldCheck size={24} className="text-brand-green shrink-0" />
                </div>

                {/* Features Checklist */}
                <ul className="text-sm text-slate-600 space-y-3 mb-8">
                  <li className="flex gap-3 items-center">
                    <CheckCircle2 size={16} className="text-brand-green shrink-0" />
                    <span><strong>Mais de 100 páginas</strong> práticas e diretas ao assunto</span>
                  </li>
                  <li className="flex gap-3 items-center">
                    <CheckCircle2 size={16} className="text-brand-green shrink-0" />
                    <span><strong>Estratégias de 2026</strong> adaptadas às escolas e ao SNS em Portugal</span>
                  </li>
                  <li className="flex gap-3 items-center">
                    <CheckCircle2 size={16} className="text-brand-green shrink-0" />
                    <span><strong>Protocolos de Crises:</strong> Como antecipar e acalmar sobrecargas</span>
                  </li>
                  <li className="flex gap-3 items-center">
                    <CheckCircle2 size={16} className="text-brand-green shrink-0" />
                    <span><strong>Acesso vitalício</strong> em qualquer telemóvel, tablet ou computador</span>
                  </li>
                  <li className="flex gap-3 items-center">
                    <CheckCircle2 size={16} className="text-brand-green shrink-0" />
                    <span><strong>Garantia incondicional de 7 dias</strong></span>
                  </li>
                </ul>

                {/* CTA Button */}
                <a 
                  href={getHotmartCheckoutUrl()} 
                  target="_self" 
                  rel="noopener noreferrer" 
                  onClick={() => {
                    trackCheckoutInitiate('pricing_card');
                  }}
                  className="w-full py-4 sm:py-5 px-4 rounded-2xl bg-brand-green hover:bg-emerald-600 active:scale-[0.98] text-white shadow-xl shadow-brand-green/30 btn-premium flex flex-col items-center justify-center gap-1 group transition-all text-center cursor-pointer"
                >
                  <div className="flex items-center justify-center gap-2">
                    <span className="font-black uppercase tracking-wider text-base sm:text-lg leading-tight">
                      GARANTIR GUIA COMPLETO
                    </span>
                    <ArrowRight size={20} className="shrink-0 group-hover:translate-x-1.5 transition-transform" />
                  </div>
                  <span className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-emerald-100">
                    Apenas 16€ • Pagamento Único
                  </span>
                </a>

                {/* Métodos de Pagamento em Portugal */}
                <div className="mt-5 pt-4 border-t border-slate-100 flex flex-col items-center gap-2.5">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider text-center">
                    Métodos disponíveis em Portugal:
                  </span>
                  <div className="flex flex-wrap items-center justify-center gap-2">
                    <span className="px-3 py-1.5 bg-slate-100 text-slate-800 rounded-xl text-xs font-black border border-slate-200 shadow-sm flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500"></span> MB WAY
                    </span>
                    <span className="px-3 py-1.5 bg-slate-100 text-slate-800 rounded-xl text-xs font-black border border-slate-200 shadow-sm flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-blue-500"></span> Multibanco
                    </span>
                    <span className="px-3 py-1.5 bg-slate-100 text-slate-800 rounded-lg text-xs font-bold border border-slate-200">
                      Cartão de Crédito
                    </span>
                  </div>
                </div>

                <p className="text-[11px] text-slate-400 text-center mt-3 font-medium">
                  🔒 Compra segura com encriptação SSL de 256 bits
                </p>
              </motion.div>
            </div>
          </div>

          {/* Social Proof Section */}
          <div className="pt-20 border-t border-slate-100">
            <motion.div {...fadeIn} className="text-center mb-16 space-y-2">
              <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">O que dizem as <span className="text-brand-blue">famílias</span></h3>
              <div className="flex justify-center gap-1">
                {[1,2,3,4,5].map(i => <Star key={i} size={16} fill="#F59E0B" color="#F59E0B" />)}
              </div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { name: "Maria Silva", city: "Lisboa", text: "As estratégias de rotina mudaram as nossas manhãs. O meu filho agora sabe o que esperar e as crises diminuíram 80%." },
                { name: "João Pereira", city: "Porto", text: "Finalmente um material que fala da nossa realidade em Portugal, dos nossos direitos e do suporte nas escolas públicas." },
                { name: "Ana Costa", city: "Braga", text: "Leitura obrigatória para pais de primeira viagem no mundo do autismo. Linguagem clara e muito acolhedora." }
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  {...fadeIn}
                  transition={{ delay: i * 0.1 }}
                  className="bg-slate-50 p-8 rounded-[32px] border border-slate-100 relative"
                >
                  <p className="text-slate-600 italic mb-6 leading-relaxed">"{item.text}"</p>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-brand-blue/10 flex items-center justify-center text-brand-blue font-bold text-xs uppercase">
                      {item.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-black text-slate-900">{item.name}</p>
                      <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">{item.city}, PT</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-slate-50 border-t border-slate-200/80">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          <motion.div {...fadeIn} className="text-center mb-16 space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 text-brand-blue text-xs font-black uppercase tracking-widest border border-blue-100">
              <HelpCircle size={14} /> Dúvidas Frequentes
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">
              Perguntas <span className="text-brand-blue">Frequentes</span>
            </h2>
            <p className="text-slate-500 text-sm md:text-base max-w-xl mx-auto">
              Tudo o que precisa de saber sobre o Guia do Autismo 2026 antes de garantir o seu acesso.
            </p>
          </motion.div>

          <div className="space-y-4">
            {FAQS.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <motion.div
                  key={index}
                  {...fadeIn}
                  transition={{ delay: index * 0.05 }}
                  className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm hover:border-brand-blue/30 transition-colors"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full text-left p-6 flex items-center justify-between gap-4 font-bold text-slate-900 hover:text-brand-blue transition-colors cursor-pointer"
                  >
                    <span className="text-base md:text-lg">{faq.question}</span>
                    <ChevronDown
                      size={20}
                      className={`text-slate-400 shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180 text-brand-blue" : ""}`}
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="px-6 pb-6 text-sm md:text-base text-slate-600 leading-relaxed border-t border-slate-100 pt-4">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>

          {/* Quick CTA inside FAQ */}
          <div className="mt-12 text-center">
            <a
              href="#oferta"
              className="inline-flex items-center gap-2 text-brand-blue font-black hover:underline text-sm md:text-base uppercase tracking-wider"
            >
              Quero aproveitar a oferta exclusiva de 16€ <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </section>

      {/* Floating CTA bar on mobile */}
      <AnimatePresence>
        {showMobileBar && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-4 py-3 shadow-[0_-10px_25px_rgba(0,0,0,0.08)] flex items-center justify-between gap-3"
          >
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
                Guia Completo 2026
              </span>
              <div className="flex items-baseline gap-1.5">
                <span className="text-xl font-black text-brand-green">16€</span>
                <span className="text-xs text-slate-400 line-through font-bold">37€</span>
              </div>
            </div>
            <a
              href={getHotmartCheckoutUrl()}
              target="_self"
              onClick={() => {
                trackCheckoutInitiate('floating_bar');
              }}
              className="bg-brand-green hover:bg-emerald-600 text-white font-black text-sm px-5 py-2.5 rounded-xl uppercase tracking-wider shadow-lg shadow-brand-green/25 active:scale-95 transition-all"
            >
              Quero o Guia
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="bg-slate-950 py-20 text-slate-400 text-sm">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="flex flex-col items-center md:items-start gap-4">
             <div className="flex items-center gap-2.5 opacity-80">
              <div className="grid grid-cols-2 gap-0.5">
                <div className="w-2 h-2 rounded-[1px] bg-brand-blue"></div>
                <div className="w-2 h-2 rounded-[1px] bg-brand-red"></div>
                <div className="w-2 h-2 rounded-[1px] bg-brand-yellow"></div>
                <div className="w-2 h-2 rounded-[1px] bg-brand-green"></div>
              </div>
              <span className="font-black text-lg tracking-tighter text-white uppercase">Guia do Autismo</span>
            </div>
            <p className="text-center md:text-left max-w-xs">Informação que transforma a vida de quem mais amamos. Adaptado à realidade de Portugal.</p>
          </div>
          
          <div className="flex gap-8 text-xs font-black uppercase tracking-widest">
            <button onClick={() => setActiveModal('termos')} className="hover:text-white transition-colors cursor-pointer">Termos</button>
            <button onClick={() => setActiveModal('privacidade')} className="hover:text-white transition-colors cursor-pointer">Privacidade</button>
            <button onClick={() => setActiveModal('contacto')} className="hover:text-white transition-colors cursor-pointer">Contacto</button>
          </div>

          <div className="text-center md:text-right">
            <p>© 2026 Guia do Autismo. Todos os direitos reservados.</p>
            <p className="mt-2 opacity-50">Implementado com ética e compromisso emocional.</p>
          </div>
        </div>
      </footer>

      {/* Modal de Conformidade Legal (RGPD & Termos) */}
      <AnimatePresence>
        {activeModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl max-w-2xl w-full p-8 shadow-2xl max-h-[85vh] overflow-y-auto relative"
            >
              <button 
                onClick={() => setActiveModal(null)}
                className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
              >
                <X size={20} />
              </button>

              {activeModal === 'termos' && (
                <div className="space-y-4 text-slate-700 text-sm leading-relaxed">
                  <h3 className="text-2xl font-black text-slate-900 mb-4">Termos de Uso</h3>
                  <p><strong>1. Objeto:</strong> O Guia do Autismo 2026 é um material educacional completo em formato digital destinado a pais, cuidadores e educadores com orientações sobre o espectro do autismo.</p>
                  <p><strong>2. Entrega e Acesso:</strong> O produto é 100% digital e disponibilizado imediatamente por e-mail após a confirmação do pagamento através da plataforma segura Hotmart.</p>
                  <p><strong>3. Garantia:</strong> Oferecemos garantia incondicional de 7 dias. Caso não fique satisfeito, poderá solicitar reembolso integral diretamente pela plataforma Hotmart.</p>
                  <p><strong>4. Isenção Médica:</strong> As informações contidas no guia possuem caráter informativo e pedagógico, não substituindo o diagnóstico, consulta ou acompanhamento de médicos e terapeutas habilitados.</p>
                </div>
              )}

              {activeModal === 'privacidade' && (
                <div className="space-y-4 text-slate-700 text-sm leading-relaxed">
                  <h3 className="text-2xl font-black text-slate-900 mb-4">Política de Privacidade (RGPD)</h3>
                  <p><strong>1. Compromisso com a Privacidade:</strong> Respeitamos a sua privacidade e cumprimos integralmente o Regulamento Geral sobre a Proteção de Dados (RGPD) da União Europeia.</p>
                  <p><strong>2. Coleta de Dados:</strong> Coletamos apenas as informações estritamente necessárias para a navegação segura e processamento da compra através de parceiros certificados como a Hotmart.</p>
                  <p><strong>3. Segurança:</strong> Os dados de pagamento são encriptados de ponta a ponta e processados em ambiente seguro. Não armazenamos informações de cartões de crédito.</p>
                  <p><strong>4. Os Seus Direitos:</strong> Tem o direito de solicitar o acesso, retificação ou eliminação dos seus dados a qualquer momento entrando em contacto connosco.</p>
                </div>
              )}

              {activeModal === 'contacto' && (
                <div className="space-y-4 text-slate-700 text-sm leading-relaxed">
                  <h3 className="text-2xl font-black text-slate-900 mb-4">Apoio ao Cliente & Contacto</h3>
                  <p>Tem alguma dúvida sobre o Guia do Autismo ou precisa de suporte para aceder ao seu material?</p>
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                    <p className="font-bold text-slate-900">E-mail de Suporte:</p>
                    <p className="text-brand-blue font-medium mt-1">suporte@guiadoautismo.pt</p>
                    <p className="text-xs text-slate-500 mt-2">Horário de atendimento: Segunda a Sexta, das 09h às 18h (Horário de Lisboa).</p>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

const MessageCircleOff = ({ className, size = 24 }: { className?: string, size?: number }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M20.5 14.99a1 1 0 0 1-1.5.5l-1.5-.5a2 2 0 0 1-.5-1.5l.5-1.5a1 1 0 0 1 1.5-.5l1.5.5a1 1 0 0 1 .5 1.5z" />
    <path d="M2 12c0 4.42 4.48 8 10 8 .88 0 1.73-.09 2.53-.26" />
    <path d="M7 12h.01" />
    <path d="M12 12h.01" />
    <path d="m15.5 12 .5 2.5" />
    <path d="M19.04 10.41C18.15 7.8 15.35 6 12 6c-3.6 0-6.6 2.1-7.5 5" />
    <path d="m2 2 20 20" />
  </svg>
);
