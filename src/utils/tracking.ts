/**
 * Módulo Profissional de Rastreamento & Telemetria em Tempo Real
 * Guia do Autismo 2026 - SPA Unificada
 */

declare global {
  interface Window {
    fbq?: (...args: any[]) => void;
    dataLayer?: Array<Record<string, any>>;
    META_PIXEL_ID?: string;
  }
}

export interface FunnelTelemetry {
  advertorialViews: number;
  quizStarts: number;
  quizStep1: number;
  quizStep2: number;
  quizStep3: number;
  quizStep4: number;
  quizCompletes: number;
  landingPageViews: number;
  checkoutClicks: number;
  sources: Record<string, number>;
  events: Array<{
    id: string;
    timestamp: string;
    type: 'track' | 'trackCustom';
    name: string;
    params?: any;
  }>;
}

const TELEMETRY_KEY = 'guia_autismo_telemetry_v1';

export function getFunnelTelemetry(): FunnelTelemetry {
  if (typeof window === 'undefined') {
    return {
      advertorialViews: 0,
      quizStarts: 0,
      quizStep1: 0,
      quizStep2: 0,
      quizStep3: 0,
      quizStep4: 0,
      quizCompletes: 0,
      landingPageViews: 0,
      checkoutClicks: 0,
      sources: {},
      events: []
    };
  }

  try {
    const raw = localStorage.getItem(TELEMETRY_KEY);
    if (!raw) {
      // Se ainda não tiver registros, inicializa com base vazia
      const initial: FunnelTelemetry = {
        advertorialViews: 0,
        quizStarts: 0,
        quizStep1: 0,
        quizStep2: 0,
        quizStep3: 0,
        quizStep4: 0,
        quizCompletes: 0,
        landingPageViews: 0,
        checkoutClicks: 0,
        sources: {},
        events: []
      };
      localStorage.setItem(TELEMETRY_KEY, JSON.stringify(initial));
      return initial;
    }
    return JSON.parse(raw);
  } catch (e) {
    return {
      advertorialViews: 0,
      quizStarts: 0,
      quizStep1: 0,
      quizStep2: 0,
      quizStep3: 0,
      quizStep4: 0,
      quizCompletes: 0,
      landingPageViews: 0,
      checkoutClicks: 0,
      sources: {},
      events: []
    };
  }
}

function updateTelemetry(updater: (data: FunnelTelemetry) => void) {
  if (typeof window === 'undefined') return;
  try {
    const current = getFunnelTelemetry();
    updater(current);
    localStorage.setItem(TELEMETRY_KEY, JSON.stringify(current));
    // Dispara evento customizado para o Dashboard atualizar em tempo real se estiver aberto
    window.dispatchEvent(new CustomEvent('funnel_telemetry_updated', { detail: current }));
  } catch (err) {
    console.warn('Erro ao salvar telemetria local:', err);
  }
}

export function resetFunnelTelemetry() {
  if (typeof window === 'undefined') return;
  const resetData: FunnelTelemetry = {
    advertorialViews: 0,
    quizStarts: 0,
    quizStep1: 0,
    quizStep2: 0,
    quizStep3: 0,
    quizStep4: 0,
    quizCompletes: 0,
    landingPageViews: 0,
    checkoutClicks: 0,
    sources: {},
    events: []
  };
  localStorage.setItem(TELEMETRY_KEY, JSON.stringify(resetData));
  window.dispatchEvent(new CustomEvent('funnel_telemetry_updated', { detail: resetData }));
}

/**
 * Carrega dados simulados baseados em tráfego real de campanhas
 * (Útil para demonstrar o visual do funil e taxas de conversão com volume de teste)
 */
export function seedDemoTelemetry() {
  if (typeof window === 'undefined') return;
  const demoData: FunnelTelemetry = {
    advertorialViews: 1420,
    quizStarts: 890,
    quizStep1: 820,
    quizStep2: 760,
    quizStep3: 710,
    quizStep4: 680,
    quizCompletes: 650,
    landingPageViews: 610,
    checkoutClicks: 142,
    sources: {
      'facebook_ads': 840,
      'instagram_stories': 380,
      'google_cpc': 120,
      'direto': 80
    },
    events: [
      { id: '1', timestamp: new Date(Date.now() - 1000 * 30).toLocaleTimeString(), type: 'track', name: 'InitiateCheckout', params: { value: 16.00, currency: 'EUR', placement: 'pricing_card' } },
      { id: '2', timestamp: new Date(Date.now() - 1000 * 75).toLocaleTimeString(), type: 'track', name: 'ViewContent', params: { content_name: 'Guia do Autismo 2026 - Landing Page', from_quiz: true } },
      { id: '3', timestamp: new Date(Date.now() - 1000 * 120).toLocaleTimeString(), type: 'track', name: 'Lead', params: { content_name: 'Guia do Autismo Quiz Concluído', value: 16.00 } },
      { id: '4', timestamp: new Date(Date.now() - 1000 * 160).toLocaleTimeString(), type: 'trackCustom', name: 'Quiz_Step_4', params: { step: 4, answer: '✅ Sim, estou a par' } },
      { id: '5', timestamp: new Date(Date.now() - 1000 * 210).toLocaleTimeString(), type: 'trackCustom', name: 'Quiz_Start', params: { total_questions: 4 } },
      { id: '6', timestamp: new Date(Date.now() - 1000 * 290).toLocaleTimeString(), type: 'trackCustom', name: 'Advertorial_View', params: { market: 'Portugal' } }
    ]
  };
  localStorage.setItem(TELEMETRY_KEY, JSON.stringify(demoData));
  window.dispatchEvent(new CustomEvent('funnel_telemetry_updated', { detail: demoData }));
}

// Log estilizado no console do navegador para facilitar auditoria e debug em localhost
function logEvent(name: string, payload?: Record<string, any>) {
  if (typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')) {
    console.log(
      `%c[PIXEL TRACK] %c${name}`,
      'background: #1e40af; color: #fff; font-weight: bold; padding: 2px 6px; border-radius: 4px;',
      'color: #059669; font-weight: bold;',
      payload || ''
    );
  }
}

function recordEvent(type: 'track' | 'trackCustom', eventName: string, params?: Record<string, any>) {
  updateTelemetry(data => {
    // Adiciona evento no stream de eventos recentes
    data.events.unshift({
      id: Math.random().toString(36).substring(2, 9),
      timestamp: new Date().toLocaleTimeString('pt-PT', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      type,
      name: eventName,
      params
    });
    // Limita aos 50 eventos mais recentes
    if (data.events.length > 50) {
      data.events = data.events.slice(0, 50);
    }

    // Registra origem UTM se disponível
    if (typeof window !== 'undefined') {
      const p = new URLSearchParams(window.location.search);
      const src = p.get('utm_source') || 'direto';
      data.sources[src] = (data.sources[src] || 0) + 1;
    }
  });
}

function safeFbq(type: 'track' | 'trackCustom', eventName: string, params?: Record<string, any>) {
  if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
    try {
      if (params) {
        window.fbq(type, eventName, params);
      } else {
        window.fbq(type, eventName);
      }
    } catch (err) {
      console.warn('Erro ao disparar Meta Pixel:', err);
    }
  }

  // Integração com Google Tag Manager / GA4 se disponível
  if (typeof window !== 'undefined' && Array.isArray(window.dataLayer)) {
    try {
      window.dataLayer.push({
        event: eventName,
        pixelType: type,
        ...params
      });
    } catch (err) {
      // Ignora erro de dataLayer
    }
  }

  logEvent(`${type}: ${eventName}`, params);
  recordEvent(type, eventName, params);
}

/**
 * Atualiza o parâmetro ?step= na URL via history.pushState sem recarregar a página.
 * Preserva 100% dos parâmetros de rastreamento (UTMs, fbclid, etc.).
 */
export function updateUrlStep(step: 'article' | 'quiz' | 'landing') {
  if (typeof window === 'undefined') return;

  try {
    const url = new URL(window.location.href);
    if (step === 'article') {
      url.searchParams.delete('step');
      url.searchParams.delete('view');
    } else {
      url.searchParams.set('step', step === 'landing' ? 'lp' : step);
    }

    if (step === 'landing') {
      url.hash = '#oferta';
    } else if (url.hash === '#oferta') {
      url.hash = '';
    }

    window.history.pushState({ step }, '', url.toString());
  } catch (err) {
    console.warn('Erro ao atualizar URL de rastreamento:', err);
  }
}

/**
 * 1. ETAPA ADVERTORIAL: Visualizou o artigo editorial (ViewContent)
 */
export function trackAdvertorialView() {
  updateTelemetry(data => {
    data.advertorialViews += 1;
  });

  safeFbq('track', 'ViewContent', {
    content_name: 'Guia do Autismo 2026 Artigo Oficial',
    content_category: 'Advertorial',
    market: 'Portugal'
  });

  safeFbq('trackCustom', 'Advertorial_View', {
    content_name: 'Guia do Autismo 2026 Artigo Oficial',
    category: 'Saúde e Bem-Estar',
    market: 'Portugal'
  });
}

/**
 * 2. ETAPA QUIZ (INÍCIO): Clicou em INICIAR (Lead)
 */
export function trackQuizStart() {
  updateTelemetry(data => {
    data.quizStarts += 1;
  });

  safeFbq('track', 'Lead', {
    content_name: 'Início Quiz Autismo 2026',
    total_questions: 4
  });

  safeFbq('trackCustom', 'Quiz_Start', {
    quiz_name: 'Verificação de Elegibilidade Autismo',
    total_questions: 4
  });
}

/**
 * 2.1 ETAPA QUIZ (PROGRESSO): A cada pergunta respondida
 */
export function trackQuizStep(stepNumber: number, questionText: string, selectedOption: string) {
  updateTelemetry(data => {
    if (stepNumber === 1) data.quizStep1 += 1;
    if (stepNumber === 2) data.quizStep2 += 1;
    if (stepNumber === 3) data.quizStep3 += 1;
    if (stepNumber === 4) data.quizStep4 += 1;
  });

  safeFbq('trackCustom', `Quiz_Step_${stepNumber}`, {
    step: stepNumber,
    question: questionText,
    answer: selectedOption
  });
}

/**
 * 2.2 ETAPA QUIZ (CONCLUSÃO): Respondeu tudo (CompleteRegistration)
 */
export function trackQuizComplete(answersSummary: Record<string, string>) {
  updateTelemetry(data => {
    data.quizCompletes += 1;
  });

  safeFbq('track', 'CompleteRegistration', {
    content_name: 'Quiz Autismo 2026 Concluído',
    status: 'Concluído'
  });

  safeFbq('trackCustom', 'Quiz_Completed', {
    summary: answersSummary
  });
}

/**
 * 3. ETAPA LANDING PAGE: Usuário entra na página de vendas (PageView)
 */
export function trackLandingPageView(fromQuiz: boolean = false, quizCategory?: string) {
  updateTelemetry(data => {
    data.landingPageViews += 1;
  });

  safeFbq('track', 'PageView');

  safeFbq('trackCustom', 'LandingPage_View', {
    origem: fromQuiz ? 'quiz_funnel' : 'direct_traffic',
    perfil: quizCategory || 'Padrao'
  });
}

/**
 * 4. ETAPA CHECKOUT: Clicou para comprar o Guia na Hotmart
 */
export function trackCheckoutInitiate(placement: 'pricing_card' | 'floating_bar' | 'faq_cta' = 'pricing_card') {
  updateTelemetry(data => {
    data.checkoutClicks += 1;
  });

  safeFbq('track', 'InitiateCheckout', {
    content_name: 'Guia do Autismo 2026',
    content_category: 'E-book Digital',
    currency: 'EUR',
    value: 16.00,
    placement: placement
  });

  safeFbq('trackCustom', 'Checkout_Click', {
    button_location: placement,
    valor_oferta: '16€'
  });
}

/**
 * Helper para repassar todos os parâmetros atuais (UTMs, fbclid, etc.)
 * para o checkout da Hotmart de forma blindada.
 */
export function getHotmartUrlWithTracking(baseUrl: string = 'https://pay.hotmart.com/V96367646I?checkoutMode=10'): string {
  if (typeof window === 'undefined') return baseUrl;

  try {
    const url = new URL(baseUrl);
    const currentParams = new URLSearchParams(window.location.search);

    currentParams.forEach((val, key) => {
      url.searchParams.set(key, val);
    });

    // Fallback de origem na Hotmart (src)
    if (!url.searchParams.has('src') && url.searchParams.has('utm_source')) {
      url.searchParams.set('src', url.searchParams.get('utm_source') || '');
    }

    return url.toString();
  } catch (e) {
    return baseUrl;
  }
}

/**
 * Compatibilidade legada com links existentes
 */
export function buildFunnelUrl(baseUrl: string = '#oferta', hash: string = '#oferta'): string {
  return baseUrl;
}
