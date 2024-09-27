// eslint-disable-next-line no-restricted-imports
import useTheme from '@mui/material/styles/useTheme';

export const useMode = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const isLight = theme.palette.mode === 'light';

  const bgByMode = ({ d, l }: { d: string; l: string }) => (isDark ? d : l);

  return {
    isDark,
    isLight,
    bgByMode,
  };
};
