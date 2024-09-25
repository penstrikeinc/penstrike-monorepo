'use client';

// @mui
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
// components
import { Button, InputAdornment, TextField } from '@mui/material';
import { FaPlus, FaSearch } from 'react-icons/fa';
import { useCallback, useState } from 'react';
import { useSettingsContext } from 'src/components/settings';
import { AddEditAssetsDialog, AssetsTable } from 'src/components';
import { assetsDefaultValues, TAssets } from 'src/schemas/assets';

// ----------------------------------------------------------------------

export function Assets() {
  const settings = useSettingsContext();
  const [assetsDialogContext, setAssetsDialogContext] = useState<TAssets | null>(null);

  const addAssetsDialogOpenHandler = useCallback(async (context: TAssets | null) => {
    setAssetsDialogContext(context ?? assetsDefaultValues);
  }, []);

  const addEditCategoryCloseHandler = useCallback(() => {
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
          onClick={() => addAssetsDialogOpenHandler(null)}
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
        <AssetsTable />
      </Box>
      <AddEditAssetsDialog context={assetsDialogContext} onClose={addEditCategoryCloseHandler} />
    </Container>
  );
}
