'use client';

// @mui
import { alpha, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

// components
import { Button, InputAdornment, TextField } from '@mui/material';
import { FaPlus, FaSearch } from 'react-icons/fa';
import { useCallback, useMemo, useState } from 'react';
import { useSettingsContext } from 'src/components/settings';
import { AddEditFindingDialog, FindingsTable, NotFoundCard } from 'src/components';
import { useGetAllAssetQuery } from 'src/services';
import { IAsset } from 'src/types';
import { paths } from 'src/routes/paths';
import { useRouter } from 'next/navigation';

export function Findings() {
  const settings = useSettingsContext();
  const [openDialog, setOpenDialog] = useState(false);
  const [findingDialogContext, setFindingDialogContext] = useState<IAsset | null>(null);
  const { data: findingResponse } = useGetAllAssetQuery();
  const theme = useTheme();

  const router = useRouter();

  const findings = useMemo(() => findingResponse?.data.items || [], [findingResponse?.data]);

  const addFindingDialogOpenHandler = useCallback(() => {
    setOpenDialog(true);
  }, []);

  const onFindingShowHandler = useCallback(
    (id: string) => {
      const url = `${paths.dashboard.findings}/${id}`;
      router.push(url);
    },
    [router]
  );

  const onFindingDialogCloseHandler = useCallback(() => {
    setOpenDialog(false);
    setFindingDialogContext(null);
  }, []);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" color="text.secondary">
          Findings
        </Typography>
        <Button
          startIcon={<FaPlus size={18} />}
          variant="contained"
          color="primary"
          size="large"
          onClick={() => addFindingDialogOpenHandler()}
        >
          Create New Findings
        </Button>
      </Box>
      {findings.length ? (
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
            <Typography variant="h6">All Findings</Typography>
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

          {/* <FindingsTable findings={findings} onShow={onFindingShowHandler} /> */}
        </Box>
      ) : (
        <NotFoundCard entity="Finding" />
      )}
      <AddEditFindingDialog
        open={openDialog}
        context={findingDialogContext}
        onClose={onFindingDialogCloseHandler}
      />
    </Container>
  );
}
