'use client';

// @mui
import { alpha, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
// components
import { Button, InputAdornment, TextField, Typography } from '@mui/material';
import { useSettingsContext } from 'src/components/settings';
import { MdAdd } from 'react-icons/md';
import { useCallback, useMemo, useState } from 'react';
import { AddReportDialog, NotFoundCard, ReportsTable } from 'src/components';
import { useGetAllReportQuery } from 'src/services';
import { FaSearch } from 'react-icons/fa';

export function Reports() {
  const settings = useSettingsContext();
  const theme = useTheme();
  const [openDialog, setOpenDialog] = useState(false);
  const { data } = useGetAllReportQuery();

  const reports = useMemo(() => {
    if (data) {
      return data.data.items;
    }
    return [];
  }, [data]);

  const onReportShowHandler = useCallback((id: string) => {
    // const url = `${paths.dashboard.assets}/${id}`;
    // router.push(url);
  }, []);

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
        {reports.length ? (
          <Box
            sx={{
              mt: 5,
              p: 2,
              borderRadius: 2,
              bgcolor: alpha(theme.palette.grey[500], 0.04),
              border: `dashed 1px ${theme.palette.divider}`,
            }}
          >
            <Box
              sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}
            >
              <Typography variant="h6">All Assets</Typography>
              <TextField
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <FaSearch size={18} />
                    </InputAdornment>
                  ),
                }}
                variant="outlined"
                color="primary"
                size="medium"
              />
            </Box>

            <ReportsTable reports={reports} onShow={onReportShowHandler} />
          </Box>
        ) : (
          <NotFoundCard entity="Report" />
        )}
      </Container>
      <AddReportDialog open={openDialog} onClose={() => setOpenDialog(false)} />
    </>
  );
}
