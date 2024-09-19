import { forwardRef } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import Link from '@mui/material/Link';
import Box, { BoxProps } from '@mui/material/Box';
// routes
import { RouterLink } from 'src/routes/components';

// ----------------------------------------------------------------------

export interface LogoProps extends BoxProps {
  disabledLink?: boolean;
}

const Logo = forwardRef<HTMLDivElement, LogoProps>(
  ({ disabledLink = false, sx, ...other }, ref) => {
    const theme = useTheme();

    const gray = theme.palette.grey[500];

    // OR using local (public folder)
    // -------------------------------------------------------
    // const logo = (
    //   <Box
    //     component="img"
    //     src="/logo/logo_single.svg" => your path
    //     sx={{ width: 40, height: 40, cursor: 'pointer', ...sx }}
    //   />
    // );

    const logo = (
      <Box
        ref={ref}
        component="div"
        sx={{
          width: 200,
          height: 60,
          display: 'inline-flex',
          borderRadius: 2,
          // background: gray,
          padding: 0.5,
          ...sx,
        }}
        {...other}
      >
        <img
          style={{ width: '100%', height: '100%', borderRadius: '50%' }}
          src="https://scontent.fdac13-1.fna.fbcdn.net/v/t39.30808-6/416236520_364911829475815_6312507629927925284_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeHiVEdtYxxIOQegja4cFHPk9aVf0WGnYaP1pV_RYadho7RbO6m7F7u2n4UJKUDkxwL5SP3kXdBgBqYAt5VvQD27&_nc_ohc=mN_8sj2Aww8Q7kNvgGtr_vq&_nc_ht=scontent.fdac13-1.fna&_nc_gid=AV8irpEKZlYhMSTc_NuMWi0&oh=00_AYCn6r_cVPvMD-MJ6Mhs-qWjvLzi3lDvpXObFghopqzvyA&oe=66F240BB"
        />
      </Box>
    );

    if (disabledLink) {
      return logo;
    }

    return (
      <Link component={RouterLink} href="/" sx={{ display: 'contents' }}>
        {logo}
      </Link>
    );
  }
);

export default Logo;
