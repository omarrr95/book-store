import { HttpInterceptorFn } from '@angular/common/http';

export const globalInterceptor: HttpInterceptorFn = (req, next) => {
  const baseUrl = 'https://upskilling-egypt.com:3007/';
  const baseUrlAlternative = 'https://upskilling-egypt.com:3005/';
const token = localStorage.getItem('userToken');
  if (req.url.includes('/assets/i18n/')) {
    return next(req);
  }

  const useAltBase = req.headers.get('X-Use-Alt-Base') === 'true';
  const baseToUse = useAltBase ? baseUrlAlternative : baseUrl;
  const cleanedHeaders = req.headers.delete('X-Use-Alt-Base');

  const modifiedReq = req.clone({
    url: req.url.startsWith('http') ? req.url : baseToUse + req.url,
    headers: cleanedHeaders
  });

  return next(modifiedReq);
};
