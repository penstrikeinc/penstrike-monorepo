'use client';

// @mui
import { useTheme } from '@mui/material/styles';
import Container from '@mui/material/Container';
// components
import { Typography } from '@mui/material';
import { SettingItems, useSettingsContext } from 'src/components/settings';
import Scrollbar from 'src/components/scrollbar';

export function Settings() {
  const settings = useSettingsContext();
  const theme = useTheme();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Typography variant="h6">Setting Page</Typography>
      <Scrollbar
        sx={{
          mt: 2,
          p: 2,
          height: 'calc(100vh - 200px)',
          borderRadius: 2,
          border: `dashed 1px ${theme.palette.divider}`,
        }}
      >
        <SettingItems />
      </Scrollbar>
    </Container>
  );
}
