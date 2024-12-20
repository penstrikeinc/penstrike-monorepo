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
import { AddEditAssetDialog, AssetsTable, NotFoundCard } from 'src/components';
import { useDeleteAssetMutation, useGetAllAssetQuery } from 'src/services';
import { IAsset } from 'src/types';
import Swal from 'sweetalert2';
import { paths } from 'src/routes/paths';
import { useRouter } from 'next/navigation';

export function Assets() {
  const settings = useSettingsContext();
  const [openDialog, setOpenDialog] = useState(false);
  const [assetDialogContext, setAssetDialogContext] = useState<IAsset | null>(null);
  const { data: assetsResponse } = useGetAllAssetQuery();
  const { mutateAsync: deleteAsset } = useDeleteAssetMutation();
  const theme = useTheme();
  const router = useRouter();

  const assets = useMemo(() => assetsResponse?.data.items || [], [assetsResponse?.data]);

  const addAssetDialogOpenHandler = useCallback(() => {
    setOpenDialog(true);
  }, []);

  const onAssetEditHandler = useCallback(async (context: IAsset) => {
    setOpenDialog(true);
    setAssetDialogContext(context);
  }, []);

  const onAssetDeleteHandler = useCallback(
    async (id: string) => {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true,
        iconColor: theme.palette.primary.main,
        color: theme.palette.text.primary,
        cancelButtonColor: theme.palette.error.main,
        confirmButtonColor: theme.palette.success.main,
        background: theme.palette.background.paper,
        showConfirmButton: true,
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: 'Deleted!',
            text: 'Your asset has been deleted.',
            icon: 'success',
            color: theme.palette.text.primary,
            showCloseButton: true,
            showConfirmButton: false,
            background: theme.palette.background.paper,
          }).then(() => {
            deleteAsset({ assetId: id });
          });
        }
      });
    },
    [
      deleteAsset,
      theme.palette.background.paper,
      theme.palette.error.main,
      theme.palette.primary.main,
      theme.palette.success.main,
      theme.palette.text.primary,
    ]
  );

  const onAssetShowHandler = useCallback(
    (id: string) => {
      const url = `${paths.dashboard.assets}/${id}`;
      router.push(url);
    },
    [router]
  );

  const onAssetDialogCloseHandler = useCallback(() => {
    setOpenDialog(false);
    setAssetDialogContext(null);
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
          onClick={() => addAssetDialogOpenHandler()}
        >
          Create New Asset
        </Button>
      </Box>
      {assets.length ? (
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

          <AssetsTable
            assets={assets}
            onEdit={onAssetEditHandler}
            onDelete={onAssetDeleteHandler}
            onShow={onAssetShowHandler}
          />
        </Box>
      ) : (
        <NotFoundCard entity="Asset" />
      )}
      <AddEditAssetDialog
        open={openDialog}
        context={assetDialogContext}
        onClose={onAssetDialogCloseHandler}
      />
    </Container>
  );
}
