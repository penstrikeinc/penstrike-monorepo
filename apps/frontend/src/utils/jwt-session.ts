import { paths } from 'src/routes/paths';
import { CacheGroupEnum, SessionPayload } from 'src/types';

// ----------------------------------------------------------------------

export function jwtDecode(token: string) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split('')
      .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
      .join('')
  );

  return JSON.parse(jsonPayload);
}

// ----------------------------------------------------------------------

export const isValidToken = (accessToken: string) => {
  if (!accessToken) {
    return false;
  }

  const decoded = jwtDecode(accessToken);
  const currentTime = Date.now() / 1000;

  return decoded.exp > currentTime;
};

// ----------------------------------------------------------------------

export const tokenExpired = (exp: number) => {
  // eslint-disable-next-line prefer-const
  let expiredTimer;

  const currentTime = Date.now();

  // Test token expires after 10s
  // const timeLeft = currentTime + 10000 - currentTime; // ~10s
  const timeLeft = exp * 1000 - currentTime;

  clearTimeout(expiredTimer);

  expiredTimer = setTimeout(() => {
    alert('Token expired');

    sessionStorage.removeItem(CacheGroupEnum.SESSION);

    window.location.href = paths.auth.login;
  }, timeLeft);
};

// ----------------------------------------------------------------------

export const setSession = (accessToken: string | null) => {
  if (accessToken) {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem(CacheGroupEnum.SESSION, accessToken);
    }
    // This function below will handle when token is expired
    const { exp } = jwtDecode(accessToken); // ~1day by minimals server
    tokenExpired(exp);
  } else {
    sessionStorage.removeItem(CacheGroupEnum.SESSION);
    // delete axios.defaults.headers.common.Authorization;
  }
};

export const findSessionDecode = (): SessionPayload | undefined => {
  const accessToken =
    typeof window !== 'undefined' ? sessionStorage.getItem(CacheGroupEnum.SESSION) : null;

  if (!accessToken) {
    return undefined;
  }
  const { exp, iat, ...rest } = jwtDecode(accessToken);
  return rest;
};

export const findSessionToken = (): string | null => {
  const accessToken =
    typeof window !== 'undefined' ? sessionStorage.getItem(CacheGroupEnum.SESSION) : null;
  return accessToken;
};
