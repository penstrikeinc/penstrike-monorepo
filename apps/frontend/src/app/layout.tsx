'use client';

// scrollbar
import 'simplebar-react/dist/simplebar.min.css';

// image
import 'react-lazy-load-image-component/src/effects/blur.css';

// theme
import ThemeProvider from 'src/theme';
import { primaryFont } from 'src/theme/typography';
// components
import ProgressBar from 'src/components/progress-bar';
import { MotionLazy } from 'src/components/animate/motion-lazy';
import { SettingsProvider, SettingsDrawer } from 'src/components/settings';
import { AuthConsumer, AuthProvider } from 'src/auth';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SnackbarProvider } from 'notistack';

type Props = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
  const queryClient = new QueryClient();

  return (
    <html lang="en" className={primaryFont.className}>
      <body>
        <SnackbarProvider>
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
        </SnackbarProvider>
      </body>
    </html>
  );
}
