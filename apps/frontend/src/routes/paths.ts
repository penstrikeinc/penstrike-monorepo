const ROOTS = {
  AUTH: '/auth',
  DASHBOARD: '/dashboard',
};

export const paths = {
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
    cveScan: `${ROOTS.DASHBOARD}/cve-scan`,
    reports: `${ROOTS.DASHBOARD}/reports`,
    billings: `${ROOTS.DASHBOARD}/billings`,
    team: `${ROOTS.DASHBOARD}/team`,
    settings: `${ROOTS.DASHBOARD}/settings`,
  },
};
