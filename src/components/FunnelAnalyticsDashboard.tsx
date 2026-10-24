import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  MousePointerClick, 
  CheckCircle2, 
  ArrowRight, 
  RefreshCw, 
  Eye, 
  ShieldCheck, 
  DollarSign, 
  Activity, 
  Layers, 
  HelpCircle,
  ExternalLink,
  Trash2,
  Sparkles,
  Zap
} from 'lucide-react';
import { 
  getFunnelTelemetry, 
  resetFunnelTelemetry, 
  seedDemoTelemetry, 
  FunnelTelemetry 
} from '../utils/tracking';

interface DashboardProps {
  onBackToFunnel: () => void;
}

export const FunnelAnalyticsDashboard: React.FC<DashboardProps> = ({ onBackToFunnel }) => {
  const [telemetry, setTelemetry] = useState<FunnelTelemetry>(getFunnelTelemetry());
  const [filterMode, setFilterMode] = useState<'all' | 'quiz_only'>('all');

  useEffect(() => {
    // Atualiza estado local inicial
    setTelemetry(getFunnelTelemetry());

    // Escuta atualizações de telemetria disparadas pelo tracking.ts
    const handleUpdate = (e: any) => {
      if (e.detail) {
        setTelemetry(e.detail);
      } else {
        setTelemetry(getFunnelTelemetry());
      }
    };

    window.addEventListener('funnel_telemetry_updated', handleUpdate);
    return () => window.removeEventListener('funnel_telemetry_updated', handleUpdate);
  }, []);

  const handleReset = () => {
    if (window.confirm("Deseja realmente zerar todos os contadores locais de teste?")) {
      resetFunnelTelemetry();
    }
  };

  const handleSeed = () => {
    seedDemoTelemetry();
  };

  // Cálculo de percentuais do funil
  const adv = telemetry.advertorialViews || (telemetry.quizStarts > 0 ? telemetry.quizStarts : 1);
  const quizStartPct = adv > 0 ? Math.round((telemetry.quizStarts / adv) * 100) : 0;
  const quizCompPct = telemetry.quizStarts > 0 ? Math.round((telemetry.quizCompletes / telemetry.quizStarts) * 100) : 0;
  const lpPct = (telemetry.quizCompletes > 0 ? Math.round((telemetry.landingPageViews / telemetry.quizCompletes) * 100) : (telemetry.landingPageViews > 0 ? 100 : 0));
  const checkoutPct = telemetry.landingPageViews > 0 ? Math.round((telemetry.checkoutClicks / telemetry.landingPageViews) * 100) : 0;
  const overallConvPct = adv > 0 ? ((telemetry.checkoutClicks / adv) * 100).toFixed(1) : '0.0';
  const estimatedRevenue = (telemetry.checkoutClicks * 16).toFixed(0);

  // Etapas para o gráfico visual
  const funnelStages = [
    {
      id: 'adv',
      name: '1. Advertorial (Artigo)',
      pixelEvent: 'ViewContent (Artigo)',
      count: telemetry.advertorialViews,
      pctOfTotal: 100,
      dropOff: adv > telemetry.quizStarts ? `${Math.round(((adv - telemetry.quizStarts) / (adv || 1)) * 100)}% de saída` : '0%',
      color: 'bg-blue-600',
      textColor: 'text-blue-400'
    },
    {
      id: 'q_start',
      name: '2. Início do Quiz',
      pixelEvent: 'Lead (Iniciou Quiz)',
      count: telemetry.quizStarts,
      pctOfTotal: quizStartPct,
      dropOff: telemetry.quizStarts > telemetry.quizStep1 ? `${Math.round(((telemetry.quizStarts - telemetry.quizStep1) / (telemetry.quizStarts || 1)) * 100)}% de saída` : '0%',
      color: 'bg-indigo-600',
      textColor: 'text-indigo-400'
    },
    {
      id: 'q_step1',
      name: '• Questão 1 (Perfil)',
      pixelEvent: 'Quiz_Step_1',
      count: telemetry.quizStep1,
      pctOfTotal: adv > 0 ? Math.round((telemetry.quizStep1 / adv) * 100) : 0,
      dropOff: telemetry.quizStep1 > telemetry.quizStep2 ? `${Math.round(((telemetry.quizStep1 - telemetry.quizStep2) / (telemetry.quizStep1 || 1)) * 100)}% desistência` : '0%',
      color: 'bg-violet-600',
      textColor: 'text-violet-400'
    },
    {
      id: 'q_step2',
      name: '• Questão 2 (Idade)',
      pixelEvent: 'Quiz_Step_2',
      count: telemetry.quizStep2,
      pctOfTotal: adv > 0 ? Math.round((telemetry.quizStep2 / adv) * 100) : 0,
      dropOff: telemetry.quizStep2 > telemetry.quizStep3 ? `${Math.round(((telemetry.quizStep2 - telemetry.quizStep3) / (telemetry.quizStep2 || 1)) * 100)}% desistência` : '0%',
      color: 'bg-purple-600',
      textColor: 'text-purple-400'
    },
    {
      id: 'q_step3',
      name: '• Questão 3 (Desafio)',
      pixelEvent: 'Quiz_Step_3',
      count: telemetry.quizStep3,
      pctOfTotal: adv > 0 ? Math.round((telemetry.quizStep3 / adv) * 100) : 0,
      dropOff: telemetry.quizStep3 > telemetry.quizStep4 ? `${Math.round(((telemetry.quizStep3 - telemetry.quizStep4) / (telemetry.quizStep3 || 1)) * 100)}% desistência` : '0%',
      color: 'bg-fuchsia-600',
      textColor: 'text-fuchsia-400'
    },
    {
      id: 'q_step4',
      name: '• Questão 4 (Direitos)',
      pixelEvent: 'Quiz_Step_4',
      count: telemetry.quizStep4,
      pctOfTotal: adv > 0 ? Math.round((telemetry.quizStep4 / adv) * 100) : 0,
      dropOff: telemetry.quizStep4 > telemetry.quizCompletes ? `${Math.round(((telemetry.quizStep4 - telemetry.quizCompletes) / (telemetry.quizStep4 || 1)) * 100)}% desistência` : '0%',
      color: 'bg-pink-600',
      textColor: 'text-pink-400'
    },
    {
      id: 'q_complete',
      name: '3. Quiz Concluído',
      pixelEvent: 'CompleteRegistration',
      count: telemetry.quizCompletes,
      pctOfTotal: adv > 0 ? Math.round((telemetry.quizCompletes / adv) * 100) : 0,
      dropOff: telemetry.quizCompletes > telemetry.landingPageViews ? `${Math.round(((telemetry.quizCompletes - telemetry.landingPageViews) / (telemetry.quizCompletes || 1)) * 100)}% não avançaram` : '0%',
      color: 'bg-amber-600',
      textColor: 'text-amber-400'
    },
    {
      id: 'lp',
      name: '4. Chegada na Landing Page',
      pixelEvent: 'PageView (LP Oficial)',
      count: telemetry.landingPageViews,
      pctOfTotal: adv > 0 ? Math.round((telemetry.landingPageViews / adv) * 100) : 0,
      dropOff: telemetry.landingPageViews > telemetry.checkoutClicks ? `${Math.round(((telemetry.landingPageViews - telemetry.checkoutClicks) / (telemetry.landingPageViews || 1)) * 100)}% não compraram` : '0%',
      color: 'bg-teal-600',
      textColor: 'text-teal-400'
    },
    {
      id: 'checkout',
      name: '5. Foi ao Checkout Hotmart',
      pixelEvent: 'InitiateCheckout (16€)',
      count: telemetry.checkoutClicks,
      pctOfTotal: adv > 0 ? Math.round((telemetry.checkoutClicks / adv) * 100) : 0,
      dropOff: 'Fim do Funil Local (Compra na Hotmart)',
      color: 'bg-emerald-600',
      textColor: 'text-emerald-400'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-emerald-500 selection:text-white pb-20">
      {/* Top Navbar */}
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-md sticky top-0 z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/10">
              <Activity size={22} className="text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-black text-lg tracking-tight text-white uppercase">
                  Telemetria de Funil
                </h1>
                <span className="px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-widest bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  LIVE TRACKING
                </span>
              </div>
              <p className="text-xs text-slate-400 font-medium">
                Guia do Autismo 2026 • Painel de Monitorização em Tempo Real
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleSeed}
              className="px-3 py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 transition-all border border-slate-700 flex items-center gap-1.5 cursor-pointer"
              title="Carregar exemplo de campanha com volume de tráfego"
            >
              <Sparkles size={14} className="text-amber-400" /> Simular Dados
            </button>

            <button
              onClick={handleReset}
              className="px-3 py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-red-950 text-slate-300 hover:text-red-300 transition-all border border-slate-700 hover:border-red-800/40 flex items-center gap-1.5 cursor-pointer"
              title="Zerar métricas de teste"
            >
              <Trash2 size={14} /> Limpar
            </button>

            <button
              onClick={onBackToFunnel}
              className="px-4 py-2 rounded-xl text-xs font-black bg-emerald-600 hover:bg-emerald-500 text-white transition-all shadow-lg shadow-emerald-900/30 flex items-center gap-1.5 cursor-pointer"
            >
              <ExternalLink size={14} /> Abrir Funil ao Vivo
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 pt-8 space-y-8">
        {/* Status Pills Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 flex items-center justify-between">
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Meta Pixel</p>
              <p className="text-sm font-bold text-slate-200">ID: 1286034639691049</p>
            </div>
            <span className="flex items-center gap-1 text-xs font-bold text-emerald-400 bg-emerald-950/50 px-2.5 py-1 rounded-full border border-emerald-800/50">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span> Ativo
            </span>
          </div>

          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 flex items-center justify-between">
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Roteamento SPA</p>
              <p className="text-sm font-bold text-slate-200">Virtual PageViews (pushState)</p>
            </div>
            <span className="flex items-center gap-1 text-xs font-bold text-blue-400 bg-blue-950/50 px-2.5 py-1 rounded-full border border-blue-800/50">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span> Integrado
            </span>
          </div>

          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 flex items-center justify-between">
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Checkout Hotmart</p>
              <p className="text-sm font-bold text-slate-200">V96367646I (Preservação UTMs)</p>
            </div>
            <span className="flex items-center gap-1 text-xs font-bold text-emerald-400 bg-emerald-950/50 px-2.5 py-1 rounded-full border border-emerald-800/50">
              <ShieldCheck size={14} /> 100% Blindado
            </span>
          </div>
        </div>

        {/* 6 Top KPI Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {/* 1. Advertorial */}
          <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-2 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-blue-500"></div>
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-[10px] font-black uppercase tracking-widest">Advertorial</span>
              <Eye size={16} className="text-blue-400" />
            </div>
            <p className="text-2xl font-black text-white">{telemetry.advertorialViews}</p>
            <p className="text-[11px] text-slate-400 font-medium">Topo do Funil</p>
          </div>

          {/* 2. Início Quiz */}
          <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-2 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-indigo-500"></div>
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-[10px] font-black uppercase tracking-widest">Início Quiz</span>
              <MousePointerClick size={16} className="text-indigo-400" />
            </div>
            <p className="text-2xl font-black text-white">{telemetry.quizStarts}</p>
            <p className="text-[11px] text-indigo-400 font-bold">{quizStartPct}% do artigo</p>
          </div>

          {/* 3. Conclusão Quiz */}
          <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-2 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-amber-500"></div>
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-[10px] font-black uppercase tracking-widest">Leads (Quiz)</span>
              <CheckCircle2 size={16} className="text-amber-400" />
            </div>
            <p className="text-2xl font-black text-white">{telemetry.quizCompletes}</p>
            <p className="text-[11px] text-amber-400 font-bold">{quizCompPct}% concluíram</p>
          </div>

          {/* 4. Landing Page */}
          <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-2 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-teal-500"></div>
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-[10px] font-black uppercase tracking-widest">Acesso à LP</span>
              <Layers size={16} className="text-teal-400" />
            </div>
            <p className="text-2xl font-black text-white">{telemetry.landingPageViews}</p>
            <p className="text-[11px] text-teal-400 font-bold">{lpPct}% viram oferta</p>
          </div>

          {/* 5. Checkout */}
          <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-2 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-emerald-500"></div>
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-[10px] font-black uppercase tracking-widest">Checkouts</span>
              <TrendingUp size={16} className="text-emerald-400" />
            </div>
            <p className="text-2xl font-black text-white">{telemetry.checkoutClicks}</p>
            <p className="text-[11px] text-emerald-400 font-bold">{checkoutPct}% da LP</p>
          </div>

          {/* 6. Pipeline Gerado */}
          <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-2 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-yellow-400"></div>
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-[10px] font-black uppercase tracking-widest">Pipeline Potencial</span>
              <DollarSign size={16} className="text-yellow-400" />
            </div>
            <p className="text-2xl font-black text-emerald-400">{estimatedRevenue}€</p>
            <p className="text-[11px] text-slate-400 font-medium">Base 16€ / clique</p>
          </div>
        </div>

        {/* Visual Funnel Diagram */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-black text-white tracking-tight flex items-center gap-2">
                <BarChart3 className="text-emerald-400" /> Gráfico Visual de Conversão & Abandono
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Acompanhe o caminho exato do visitante e identifique gargalos de desistência entre cada etapa.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 font-medium">Conversão Total:</span>
              <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-xl text-sm font-black">
                {overallConvPct}% (Artigo ➔ Checkout)
              </span>
            </div>
          </div>

          <div className="space-y-4 pt-4">
            {funnelStages.map((stage) => {
              const barWidth = Math.max(stage.pctOfTotal, 3);
              return (
                <div key={stage.id} className="space-y-1.5 group">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <div className="flex items-center gap-2">
                      <span className="text-slate-200">{stage.name}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400 font-mono">
                        {stage.pixelEvent}
                      </span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-slate-400 text-[11px]">{stage.dropOff}</span>
                      <span className="text-white font-mono font-black text-sm w-12 text-right">
                        {stage.count}
                      </span>
                    </div>
                  </div>

                  {/* Progress Bar Container */}
                  <div className="w-full bg-slate-800/80 rounded-full h-4 overflow-hidden p-0.5 flex items-center">
                    <div 
                      className={`h-full rounded-full transition-all duration-700 ${stage.color} flex items-center justify-end pr-2`}
                      style={{ width: `${barWidth}%` }}
                    >
                      {barWidth > 15 && (
                        <span className="text-[9px] font-black text-white">
                          {stage.pctOfTotal}%
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quiz Granular Step Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
            <h3 className="text-lg font-black text-white tracking-tight flex items-center gap-2">
              <Zap className="text-amber-400" /> Diagnóstico Granular do Quiz
            </h3>
            <p className="text-xs text-slate-400">
              Mede exatamente em qual pergunta os pais e educadores estão respondendo ou desistindo.
            </p>

            <div className="space-y-4">
              {[
                { title: "Pergunta 1: Perfil do Visitante", count: telemetry.quizStep1, desc: "Pai/Mãe, Professor, Terapeuta..." },
                { title: "Pergunta 2: Faixa Etária", count: telemetry.quizStep2, desc: "0-5 anos, 6-12 escolar, adolescência..." },
                { title: "Pergunta 3: Maior Desafio", count: telemetry.quizStep3, desc: "Crises, escola, diagnóstico..." },
                { title: "Pergunta 4: Apoios em Portugal", count: telemetry.quizStep4, desc: "Novos direitos 2026, SNS..." }
              ].map((step, idx) => {
                const prev = idx === 0 ? telemetry.quizStarts : [telemetry.quizStep1, telemetry.quizStep2, telemetry.quizStep3][idx - 1];
                const retention = prev > 0 ? Math.round((step.count / prev) * 100) : 0;
                return (
                  <div key={idx} className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-black text-slate-200">{step.title}</p>
                      <p className="text-[11px] text-slate-400">{step.desc}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-black text-white">{step.count}</p>
                      <span className="text-[10px] font-bold text-emerald-400">{retention}% retenção</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Sources / UTM Breakdown */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
            <h3 className="text-lg font-black text-white tracking-tight flex items-center gap-2">
              <Users className="text-blue-400" /> Origem do Tráfego (UTMs)
            </h3>
            <p className="text-xs text-slate-400">
              Distribuição dos acessos capturados via parâmetro <code className="text-slate-300">utm_source</code>.
            </p>

            {Object.keys(telemetry.sources).length === 0 ? (
              <div className="text-center py-12 text-slate-500 text-xs">
                Nenhuma UTM detectada ainda na sessão atual. Navegue com <code className="text-slate-400">?utm_source=facebook</code> para testar.
              </div>
            ) : (
              <div className="space-y-3">
                {Object.entries(telemetry.sources).map(([src, count]) => (
                  <div key={src} className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-slate-300">{src}</span>
                    <span className="text-xs font-black text-emerald-400 bg-emerald-950/50 px-2.5 py-1 rounded-lg border border-emerald-800/40">
                      {count} visitas
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Live Stream of Events */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-black text-white tracking-tight flex items-center gap-2">
              <Activity className="text-emerald-400" /> Feed de Eventos em Tempo Real (Meta Pixel & Custom)
            </h3>
            <span className="text-xs text-slate-400 font-mono">
              {telemetry.events.length} eventos registrados
            </span>
          </div>

          <div className="max-h-72 overflow-y-auto space-y-2 pr-2 scrollbar-hide">
            {telemetry.events.length === 0 ? (
              <p className="text-xs text-slate-500 text-center py-8">
                Nenhum evento registrado ainda. Abra o funil e clique nas etapas para ver os disparos aqui ao vivo!
              </p>
            ) : (
              telemetry.events.map((evt) => (
                <div 
                  key={evt.id} 
                  className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] text-slate-500 font-mono">{evt.timestamp}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider ${
                      evt.name === 'InitiateCheckout' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                      evt.name === 'Lead' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                      evt.name === 'ViewContent' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' :
                      'bg-slate-800 text-slate-300'
                    }`}>
                      {evt.name}
                    </span>
                    <span className="text-[11px] text-slate-400 font-mono">
                      {evt.type === 'track' ? 'Standard Meta' : 'Custom Event'}
                    </span>
                  </div>

                  {evt.params && (
                    <span className="text-[10px] text-slate-400 font-mono truncate max-w-xs sm:max-w-md">
                      {JSON.stringify(evt.params)}
                    </span>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
};
