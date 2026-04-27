import React from 'react';
import { Facebook, Instagram, Twitter, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
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
            <li className="hover:text-red-600 cursor-pointer">Sobre Nós</li>
            <li className="hover:text-red-600 cursor-pointer">Privacidade</li>
            <li className="hover:text-red-600 cursor-pointer">Termos de Uso</li>
            <li className="hover:text-red-600 cursor-pointer">Anuncie Connosco</li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 mt-12 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
        <span>© 2026 Guia do Autismo. Todos os direitos reservados.</span>
        <span>Conteúdo Publicitário - Parceria Saúde Integrada</span>
      </div>
    </footer>
  );
};
