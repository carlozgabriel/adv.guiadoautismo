/**
 * Utilitário para preservação de parâmetros de rastreamento (UTMs, fbclid, etc.)
 * entre o Advertorial/Quiz e a Landing Page / Checkout.
 */

export function buildFunnelUrl(baseUrl: string = 'https://guiadoautismopt.vercel.app/', hash: string = '#oferta'): string {
  if (typeof window === 'undefined') {
    return `${baseUrl}${hash ? (hash.startsWith('#') ? hash : `#${hash}`) : ''}`;
  }

  try {
    const url = new URL(baseUrl, window.location.origin);
    
    // Captura parâmetros da URL atual (ex: ?utm_source=fb&utm_medium=cpc&utm_campaign=...&fbclid=...)
    const currentParams = new URLSearchParams(window.location.search);
    
    currentParams.forEach((value, key) => {
      url.searchParams.set(key, value);
    });

    if (hash) {
      url.hash = hash.startsWith('#') ? hash : `#${hash}`;
    }

    return url.toString();
  } catch (err) {
    // Fallback caso a baseUrl não seja uma URL válida absoluta
    const search = window.location.search;
    const cleanHash = hash ? (hash.startsWith('#') ? hash : `#${hash}`) : '';
    const separator = baseUrl.includes('?') ? '&' : '?';
    const params = search ? (search.startsWith('?') ? search.substring(1) : search) : '';
    
    return params ? `${baseUrl}${separator}${params}${cleanHash}` : `${baseUrl}${cleanHash}`;
  }
}
