'use client';

// @mui
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
// components
import { Button, InputAdornment, TextField } from '@mui/material';
import { FaPlus, FaSearch } from 'react-icons/fa';
import { useCallback, useMemo, useState } from 'react';
import { useSettingsContext } from 'src/components/settings';
import { AddEditAssetsDialog, AssetsTable } from 'src/components';
import { useGetAllUsersQuery } from 'src/services';
import { IAsset } from 'src/types/asset';

export function Assets() {
  const settings = useSettingsContext();
  const [openDialog, setOpenDialog] = useState(false);
  const [assetsDialogContext, setAssetsDialogContext] = useState<IAsset | null>(null);
  const { data: assetsResponse } = useGetAllUsersQuery();

  const assets = useMemo(() => assetsResponse?.data, [assetsResponse?.data]);

  const addAssetsDialogOpenHandler = useCallback(() => {
    setOpenDialog(true);
  }, []);

  const onAssetsEditHandler = useCallback(async (context: IAsset) => {
    setOpenDialog(true);
    setAssetsDialogContext(context);
  }, []);

  const onAssetsDialogCloseHandler = useCallback(() => {
    setOpenDialog(false);
    setAssetsDialogContext(null);
  }, []);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" color="text.secondary">
          Assets
        </Typography>
        <Button
          startIcon={<FaPlus size={18} />}
          variant="contained"
          color="primary"
          size="large"
          onClick={() => addAssetsDialogOpenHandler()}
        >
          Create New Asset
        </Button>
      </Box>
      <Box
        sx={{
          mt: 5,
          p: 2,
          borderRadius: 2,
          bgcolor: (theme) => alpha(theme.palette.grey[500], 0.04),
          border: (theme) => `dashed 1px ${theme.palette.divider}`,
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
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
        {assets && <AssetsTable assets={assets} onEdit={onAssetsEditHandler} />}
      </Box>
      <AddEditAssetsDialog
        open={openDialog}
        context={assetsDialogContext}
        onClose={onAssetsDialogCloseHandler}
      />
    </Container>
  );
}
