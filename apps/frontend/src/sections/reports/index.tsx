'use client';

// @mui
import { alpha, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
// components
import { Typography } from '@mui/material';
import { useSettingsContext } from 'src/components/settings';

export function Reports() {
  const settings = useSettingsContext();
  const theme = useTheme();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Box
        sx={{
          mt: 5,
          p: 2,
          height: '70vh',
          borderRadius: 2,
          bgcolor: alpha(theme.palette.grey[500], 0.04),
          border: `dashed 1px ${theme.palette.divider}`,
        }}
      >
        <Typography variant="h6">page coming soon...</Typography>
      </Box>
    </Container>
  );
}
