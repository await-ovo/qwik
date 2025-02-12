import type { QwikCityEnvData } from '../../runtime/src/types';
import type { RequestEvent } from './types';
import { getRequestAction, getRequestLoaders, getRequestRoute } from './request-event';

export function getQwikCityServerData(requestEv: RequestEvent) {
  const { url, params, request, status, locale } = requestEv;
  const requestHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (requestHeaders[key] = value));

  const action = getRequestAction(requestEv);
  const formData = requestEv.sharedMap.get('actionFormData');
  const nonce = requestEv.sharedMap.get('@nonce');
  return {
    url: new URL(url.pathname + url.search, url).href,
    requestHeaders,
    locale: locale(),
    nonce,
    qwikcity: {
      // mode: getRequestMode(requestEv),
      params: { ...params },
      loadedRoute: getRequestRoute(requestEv),
      response: {
        status: status(),
        loaders: getRequestLoaders(requestEv),
        action,
        formData,
      },
    } satisfies QwikCityEnvData,
  };
}
