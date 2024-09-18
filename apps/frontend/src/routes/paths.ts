const ROOTS = {
  AUTH: '/auth',
  DASHBOARD: '/dashboard',
};

export const paths = {
  minimalUI: 'https://mui.com/store/items/minimal-dashboard/',
  // AUTH
  auth: {
    jwt: {
      login: `${ROOTS.AUTH}/jwt/login`,
      register: `${ROOTS.AUTH}/jwt/register`,
    },
  },
  // DASHBOARD
  dashboard: {
    root: ROOTS.DASHBOARD,
    assets: `${ROOTS.DASHBOARD}/assets`,
    pentest: `${ROOTS.DASHBOARD}/pentest`,
    findings: `${ROOTS.DASHBOARD}/findings`,
    reports: `${ROOTS.DASHBOARD}/reports`,
    billings: `${ROOTS.DASHBOARD}/billings`,
    team: `${ROOTS.DASHBOARD}/team`,
    settings: `${ROOTS.DASHBOARD}/settings`,
  },
};
