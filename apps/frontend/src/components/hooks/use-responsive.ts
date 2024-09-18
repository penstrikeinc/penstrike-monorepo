import { useTheme, Breakpoint } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

type ReturnType = boolean;

type Query = 'up' | 'down' | 'between' | 'only';

type Value = Breakpoint | number;

export function useResponsive(query: Query, start?: Value, end?: Value): ReturnType {
  const theme = useTheme();

  const mediaUp = useMediaQuery(theme.breakpoints.up(start as Value));

  const mediaDown = useMediaQuery(theme.breakpoints.down(start as Value));

  const mediaBetween = useMediaQuery(theme.breakpoints.between(start as Value, end as Value));

  const mediaOnly = useMediaQuery(theme.breakpoints.only(start as Breakpoint));

  if (query === 'up') {
    return mediaUp;
  }

  if (query === 'down') {
    return mediaDown;
  }

  if (query === 'between') {
    return mediaBetween;
  }

  return mediaOnly;
}

export enum DeviceEnum {
  DESKTOP = 'desktop',
  TABLET = 'tablet',
  MOBILE = 'mobile',
}

export const useGetDevice = () => {
  const isDesktop = useResponsive('up', 'lg');
  const isTablet = useResponsive('between', 'sm', 'lg');
  const isMobile = useResponsive('down', 'sm');
  const isXsMobile = useResponsive('down', 376);

  // eslint-disable-next-line no-nested-ternary
  const deviceName = isDesktop
    ? DeviceEnum.DESKTOP
    : isTablet
    ? DeviceEnum.TABLET
    : DeviceEnum.MOBILE;
  const isPortable = isMobile || isXsMobile || isTablet;

  return { isDesktop, isTablet, isMobile, isXsMobile, deviceName, isPortable };
};
