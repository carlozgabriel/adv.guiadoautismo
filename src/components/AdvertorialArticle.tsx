import React from 'react';
import { Clock, Share2, MessageSquare } from 'lucide-react';
import { motion } from 'motion/react';

interface AdvertorialArticleProps {
  onStartQuiz: () => void;
}

export const AdvertorialArticle: React.FC<AdvertorialArticleProps> = ({ onStartQuiz }) => {
  return (
    <article className="max-w-4xl mx-auto px-4 py-6 md:py-10 bg-white">
      {/* Category Heading */}
      <div className="text-[#c4170c] font-bold text-sm uppercase mb-4 tracking-wider flex items-center gap-2">
        <span>SAÚDE E BEM-ESTAR</span>
      </div>

      {/* Main Title */}
      <h1 className="text-2xl md:text-3xl font-bold leading-tight text-gray-900 mb-4 font-sans tracking-tight">
        Guia de Autismo 2026 é lançado em Portugal e promete transformar o apoio às famílias
      </h1>

      {/* Subtitle / Lead */}
      <p className="text-xl md:text-2xl text-gray-600 font-medium leading-relaxed mb-6 border-l-4 border-red-600 pl-4">
        O novo relatório revela estratégias práticas para famílias e profissionais, prometendo transformar o quotidiano de quem convive com a condição.
      </p>

      {/* Meta Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between py-4 border-y border-gray-100 mb-8 gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center overflow-hidden border border-gray-200">
            <img 
              src="/autism-icon.png" 
              alt="Redação Guia do Autismo" 
              className="w-full h-full object-contain p-1"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="text-xs">
            <p className="font-bold text-gray-800">Por Redação Guia do Autismo</p>
            <div className="flex items-center gap-2 text-gray-500">
              <Clock size={12} />
              <span>21/04/2026 10h15 - Atualizado há 5 minutos</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4 text-gray-400">
          <Share2 size={20} className="cursor-pointer hover:text-blue-500 transition-colors" />
          <MessageSquare size={20} className="cursor-pointer hover:text-green-500 transition-colors" />
        </div>
      </div>

      {/* Main Image */}
      <figure className="mb-10 -mx-4 md:mx-0">
        <img 
          src="/002.png" 
          alt="Criança a aprender com o apoio de um guia prático" 
          className="w-full h-auto shadow-lg"
          referrerPolicy="no-referrer"
        />
        <figcaption className="text-xs text-gray-400 mt-2 px-4 md:px-0 text-right italic">
          O novo guia traz abordagens atualizadas para o suporte escolar e doméstico — Foto: Arquivo Digital
        </figcaption>
      </figure>

      {/* Article Content */}
      <div className="prose prose-lg max-w-none text-gray-800 leading-relaxed space-y-6">
        <div className="bg-[#fffbeb] border-l-4 border-[#fbbf24] p-4 rounded-r my-8">
          <p className="text-sm text-[#92400e] italic leading-relaxed">
            "Senti-me perdida durante meses. Não sabia como ajudar o meu filho em casa até encontrar o novo método estruturado para 2026." – Maria S., Lisboa.
          </p>
        </div>

        <p className="text-gray-800 leading-relaxed text-[15px]">
          Um livro recém-publicado está a ganhar uma força sem precedentes em Portugal neste ano de 2026. O <strong>Guia do Autismo</strong> reúne conteúdos estratégicos desenhados para apoiar pais e educadores de forma prática e imediata. Este não é um simples guia; quem o ler terá acesso a uma visão profunda e transformadora que promete mudar o rumo do desenvolvimento de crianças no espetro.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 border-b-2 border-red-600 inline-block mb-2 mt-4">
          Por que razão este guia é crucial agora?
        </h2>
        
        <p>
          Os dados mais recentes da Direção-Geral da Saúde indicam um aumento significativo no diagnóstico de Perturbações do Espetro do Autismo (PEA) em Portugal. No entanto, o sistema de apoio ainda é lento e muitas vezes burocrático.
        </p>

        <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 my-8 shadow-inner">
          <h3 className="text-lg font-bold text-red-600 mb-3">Acesso Exclusivo em Portugal</h3>
          <p className="text-gray-700 leading-relaxed italic">
            "Este guia não é apenas um manual — é o acesso a descobertas que estavam guardadas a sete chaves e que agora podem finalmente mudar a realidade das famílias portuguesas."
          </p>
          <div className="mt-4 pt-4 border-t border-gray-200">
            <p className="text-[15px]">
              O <strong>Guia de Autismo 2026</strong> está a ser distribuído em regime de exclusividade pela <strong>Bookmundo</strong>, a prestigiada plataforma europeia de publicação independente com sede nos Países Baixos. 
            </p>
            <p className="mt-3 text-[15px]">
              A Bookmundo é reconhecida internacionalmente por democratizar o acesso ao conhecimento especializado, permitindo que conteúdos transformadores — que muitas vezes são ignorados pelas grandes editoras comerciais — cheguem diretamente às mãos de quem mais precisa, com rapidez e qualidade global.
            </p>
          </div>
        </div>



        <h2 className="text-2xl font-bold text-gray-900 border-b-2 border-red-600 inline-block mb-2 mt-4">
          O Desafio da Inclusão em Portugal
        </h2>
        
        <p>
          Infelizmente, nem todas as crianças têm acesso ao mesmo nível de suporte. O guia visa democratizar o conhecimento especializado, tornando-o acessível a qualquer pessoa com um telemóvel ou computador, independentemente da sua localização geográfica ou recursos financeiros imediatos.
        </p>

        {/* Heroic Mission Section */}
        <div className="my-12 relative overflow-hidden rounded-3xl bg-gray-50 p-8 md:p-10 border border-gray-200 shadow-sm text-gray-800">
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-600"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
            </div>
            
            <div className="text-center md:text-left">
              <h2 className="text-2xl md:text-3xl font-black mb-4 tracking-tight uppercase leading-none text-gray-900">Nossa Missão: <span className="text-red-600">Não deixar ninguém para trás</span></h2>
              <p className="text-gray-700 text-lg leading-relaxed font-medium">
                Acreditamos que o conhecimento que transforma vidas não deve ser um privilégio de poucos, mas um direito de todos. Nossa missão é derrubar as barreiras que impedem pais e educadores de dar o melhor suporte às suas crianças.
              </p>
              <p className="mt-4 text-gray-500 italic text-sm border-l-2 border-red-600 pl-4">
                "Lutamos para que cada família, independentemente da sua condição financeira, tenha nas mãos a ferramenta necessária para acender a luz da esperança e do desenvolvimento."
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mt-12 mb-16 p-8 bg-white rounded-3xl text-center border-2 border-blue-600 shadow-xl relative overflow-hidden"
        >
          <div className="relative z-10">
            <p className="text-xs font-black text-blue-600 uppercase tracking-[0.2em] mb-4">Verificação de Elegibilidade</p>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Este guia é ideal para si?</h2>
            <p className="text-gray-600 mb-8 max-w-sm mx-auto text-[15px] leading-relaxed">
              Responda a estas breves questões para percebermos se o <strong>Guia de Autismo 2026</strong> faz sentido para a sua realidade e como ele o pode ajudar hoje.
            </p>
            <button 
              onClick={onStartQuiz}
              className="group bg-[#1e40af] hover:bg-[#1e3a8a] text-white px-8 py-5 rounded-2xl font-black text-xl transition-all flex flex-col items-center justify-center gap-1 mx-auto shadow-lg hover:scale-[1.02] active:scale-[0.98] w-full max-w-xs"
            >
              <span className="text-xl tracking-widest uppercase">INICIAR</span>
              <span className="text-[10px] opacity-80 font-normal uppercase tracking-widest italic">Leva menos de 2 minutos →</span>
            </button>
            <p className="mt-6 text-[10px] text-gray-400 uppercase tracking-widest font-bold">Acesso Gratuito e Imediato</p>
          </div>
        </motion.div>

        <p className="italic text-gray-500 text-sm border-t border-gray-100 pt-6">
          *Este conteúdo é suportado por parceiros de educação especial e faz parte de uma campanha de sensibilização para o autismo em Portugal (2026).
        </p>
      </div>
    </article>
  );
};
