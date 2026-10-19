import React, { useState } from 'react';
import { Facebook, Instagram, Twitter, Mail, X } from 'lucide-react';

export const Footer: React.FC = () => {
  const [modal, setModal] = useState<'privacidade' | 'termos' | null>(null);

  return (
    <footer className="bg-gray-100 text-gray-600 py-12 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center gap-2 mb-6">
            <span className="font-black text-xl tracking-tight uppercase text-red-600">Guia do Autismo</span>
            <div className="h-6 w-[1px] bg-gray-300 mx-1"></div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Portugal</span>
          </div>
          <p className="max-w-md text-sm leading-relaxed mb-6">
            O <strong>Guia do Autismo</strong> é um portal dedicado a fornecer informações, estratégias e apoio especializado para famílias e profissionais que convivem com a condição em Portugal.
          </p>
          <div className="flex gap-4">
            <Facebook size={20} className="hover:text-red-600 cursor-pointer transition-colors" />
            <Instagram size={20} className="hover:text-red-600 cursor-pointer transition-colors" />
            <Twitter size={20} className="hover:text-red-600 cursor-pointer transition-colors" />
            <Mail size={20} className="hover:text-red-600 cursor-pointer transition-colors" />
          </div>
        </div>

        <div>
          <h4 className="font-bold text-gray-900 uppercase text-xs tracking-widest mb-4">Secções</h4>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-red-600 cursor-pointer">Saúde Infantil</li>
            <li className="hover:text-red-600 cursor-pointer">Educação e Escolas</li>
            <li className="hover:text-red-600 cursor-pointer">Direitos do Cidadão</li>
            <li className="hover:text-red-600 cursor-pointer">Relatórios Especiais</li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-gray-900 uppercase text-xs tracking-widest mb-4">Institucional</h4>
          <ul className="space-y-2 text-sm">
            <li onClick={() => setModal('termos')} className="hover:text-red-600 cursor-pointer">Termos de Uso</li>
            <li onClick={() => setModal('privacidade')} className="hover:text-red-600 cursor-pointer">Política de Privacidade</li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 mt-12 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
        <span>© 2026 Guia do Autismo. Todos os direitos reservados.</span>
        <span>Conteúdo Publicitário - Parceria Saúde Integrada</span>
      </div>

      {/* Modal Institucional */}
      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-xl w-full p-8 shadow-2xl max-h-[80vh] overflow-y-auto relative text-gray-800">
            <button 
              onClick={() => setModal(null)}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600"
            >
              <X size={20} />
            </button>

            {modal === 'termos' && (
              <div className="space-y-3 text-sm">
                <h3 className="text-xl font-black text-gray-900 mb-3">Termos de Uso</h3>
                <p>Este portal tem finalidade estritamente informativa e jornalística, divulgando materiais e relatórios de suporte ao autismo em Portugal.</p>
                <p>As compras efetuadas a partir das recomendações deste portal são processadas de forma segura por plataformas parceiras oficiais (Hotmart), assegurando garantia de 7 dias e reembolso integral aos consumidores.</p>
              </div>
            )}

            {modal === 'privacidade' && (
              <div className="space-y-3 text-sm">
                <h3 className="text-xl font-black text-gray-900 mb-3">Política de Privacidade</h3>
                <p>Em conformidade com o Regulamento Geral sobre a Proteção de Dados (RGPD), este portal não coleta dados confidenciais sem o seu expresso consentimento.</p>
                <p>Cookies e identificadores anónimos podem ser utilizados exclusivamente para medição de tráfego e melhoria da experiência de navegação.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </footer>
  );
};
