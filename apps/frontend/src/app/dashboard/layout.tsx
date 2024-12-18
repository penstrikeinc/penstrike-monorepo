'use client';

// auth
// import { AuthGuard } from 'src/auth/guard';
// components
import DashboardLayout from 'src/layouts/dashboard';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  // TODO: add authgurd
  return <DashboardLayout>{children}</DashboardLayout>;
}
