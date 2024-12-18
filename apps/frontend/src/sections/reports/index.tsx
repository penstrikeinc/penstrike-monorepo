'use client';

// @mui
import { alpha, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
// components
import { Button, Typography } from '@mui/material';
import { useSettingsContext } from 'src/components/settings';
import { MdAdd } from 'react-icons/md';
import { useState } from 'react';
import { AddReportDialog } from 'src/components';

export function Reports() {
  const settings = useSettingsContext();
  const theme = useTheme();
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <>
      <Container maxWidth={settings.themeStretch ? false : 'xl'}>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<MdAdd />}
            onClick={() => setOpenDialog(true)}
          >
            Add Report
          </Button>
        </Box>
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
      <AddReportDialog open={openDialog} onClose={() => setOpenDialog(false)} />
    </>
  );
}
