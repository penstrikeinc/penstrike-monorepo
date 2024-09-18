'use client';

// scrollbar
import 'simplebar-react/dist/simplebar.min.css';

// image
import 'react-lazy-load-image-component/src/effects/blur.css';

// ----------------------------------------------------------------------

// theme
import ThemeProvider from 'src/theme';
import { primaryFont } from 'src/theme/typography';
// components
import ProgressBar from 'src/components/progress-bar';
import { MotionLazy } from 'src/components/animate/motion-lazy';
import { SettingsProvider, SettingsDrawer } from 'src/components/settings';
import { AuthConsumer, AuthProvider } from 'src/auth/context/jwt';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// ----------------------------------------------------------------------

// export const metadata = {
//   title: 'Minimal UI Kit',
//   description:
//     'The starting point for your next project with Minimal UI Kit, built on the newest version of Material-UI ©, ready to be customized to your style',
//   keywords: 'react,material,kit,application,dashboard,admin,template',
//   themeColor: '#000000',
//   manifest: '/manifest.json',
//   viewport: {
//     width: 'device-width',
//     initialScale: 1,
//     maximumScale: 1,
//   },
//   icons: [
//     {
//       rel: 'icon',
//       url: '/favicon/favicon.ico',
//     },
//     {
//       rel: 'icon',
//       type: 'image/png',
//       sizes: '16x16',
//       url: '/favicon/favicon-16x16.png',
//     },
//     {
//       rel: 'icon',
//       type: 'image/png',
//       sizes: '32x32',
//       url: '/favicon/favicon-32x32.png',
//     },
//     {
//       rel: 'apple-touch-icon',
//       sizes: '180x180',
//       url: '/favicon/apple-touch-icon.png',
//     },
//   ],
// };

type Props = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
  // Todo refactor
  const queryClient = new QueryClient({
    defaultOptions: {
      mutations: {
        onError: (error) => console.log(error),
        onSuccess: (data) => console.log(data),
      },
      queries: {
        staleTime: 1000 * 60 * 5, // Data remains fresh for 5 minutes
        // cacheTime: 1000 * 60 * 10, // Cached data stays for 10 minutes
        refetchOnWindowFocus: false, // Prevent refetching on window focus
      },
    },
  });

  return (
    <html lang="en" className={primaryFont.className}>
      <body>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <SettingsProvider
              defaultSettings={{
                themeMode: 'light', // 'light' | 'dark'
                themeDirection: 'ltr', //  'rtl' | 'ltr'
                themeContrast: 'default', // 'default' | 'bold'
                themeLayout: 'vertical', // 'vertical' | 'horizontal' | 'mini'
                themeColorPresets: 'default', // 'default' | 'cyan' | 'purple' | 'blue' | 'orange' | 'red'
                themeStretch: false,
              }}
            >
              <ThemeProvider>
                <MotionLazy>
                  <SettingsDrawer />
                  <ProgressBar />
                  <AuthConsumer>{children}</AuthConsumer>
                </MotionLazy>
              </ThemeProvider>
            </SettingsProvider>
          </AuthProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
