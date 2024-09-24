const ROOTS = {
  AUTH: '/auth',
  DASHBOARD: '/dashboard',
};

export const paths = {
  minimalUI: 'https://mui.com/store/items/minimal-dashboard/',
  // AUTH
  auth: {
    login: `${ROOTS.AUTH}/login`,
    register: `${ROOTS.AUTH}/register`,
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
