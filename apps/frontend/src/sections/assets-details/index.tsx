'use client';

// @mui
import { alpha, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

// components
import { Button, Chip, Divider, IconButton, InputAdornment, Stack, TextField } from '@mui/material';
import { FaPen, FaPlus, FaRegUser, FaSearch, FaTrashAlt } from 'react-icons/fa';
import { useCallback, useMemo, useState } from 'react';
import { useSettingsContext } from 'src/components/settings';
import {
  AddEditAssetsDialog,
  AssetDetailsTable,
  CustomBreadcrumbs,
  NotFoundCard,
} from 'src/components';
import { useDeleteAssetMutation, useGetAssetInfoQuery } from 'src/services';
import { IAsset } from 'src/types/asset';
import Swal from 'sweetalert2';
import { CiLock } from 'react-icons/ci';
import Link from 'next/link';
import { paths } from 'src/routes/paths';

interface IAssetsDetailsProps {
  id: string;
}

export function AssetsDetails({ id }: IAssetsDetailsProps) {
  const settings = useSettingsContext();
  const [openDialog, setOpenDialog] = useState(false);
  const [assetsDialogContext, setAssetsDialogContext] = useState<IAsset | null>(null);
  const { data: assetResponse } = useGetAssetInfoQuery(id);
  const { mutateAsync: deleteAsset } = useDeleteAssetMutation();
  const theme = useTheme();

  const asset: IAsset = useMemo(() => assetResponse?.data ?? ({} as IAsset), [assetResponse?.data]);

  const { name, type, url, status, pentest } = asset;
  const { adminName, adminPassword, userName, userPassword } = pentest || {};

const addAssetsDialogOpenHandler = useCallback(() => {
  setOpenDialog(true);
}, []);

const onAssetsEditHandler = useCallback(async (context: IAsset) => {
  setOpenDialog(true);
  setAssetsDialogContext(context);
}, []);

const onAssetsDeleteHandler = useCallback(
  async (assetId: string) => {
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
          deleteAsset({ assetId });
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

const onAssetsDialogCloseHandler = useCallback(() => {
  setOpenDialog(false);
  setAssetsDialogContext(null);
}, []);

return (
  <Container maxWidth={settings.themeStretch ? false : 'xl'}>
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <CustomBreadcrumbs
        heading="Asset Details"
        links={[
          { name: 'Asset', href: paths.dashboard.assets },
          { name: 'Asset Details', href: `${paths.dashboard.assets}/${id}` },
        ]}
      />
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
    {asset ? (
      <Box
        sx={{
          mt: 5,
          p: 2,
          borderRadius: 2,
          bgcolor: alpha(theme.palette.grey[500], 0.04),
          border: `dashed 1px ${theme.palette.divider}`,
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Stack>
            <Typography variant="h6" mb={1}>
              {name}
            </Typography>
            <Stack direction="row" spacing={2}>
              <Chip
                label={type}
                sx={{
                  color: theme.palette.text.primary,
                  bgcolor: alpha(theme.palette.grey[500], 0.08),
                }}
              />
              <Chip label={status} variant="outlined" />
            </Stack>
          </Stack>

          <Stack direction="row" display="flex" justifyContent="center" spacing={2}>
            <IconButton aria-label="edit" size="medium" onClick={() => onAssetsEditHandler(asset)}>
              <FaPen size={20} color={theme.palette.primary.main} />
            </IconButton>
            <IconButton
              aria-label="edit"
              size="medium"
              onClick={() => onAssetsDeleteHandler(asset.id)}
            >
              <FaTrashAlt size={20} color={theme.palette.error.main} />
            </IconButton>
          </Stack>
        </Box>
        <Box mb={2}>
          <Typography variant="h6" color={theme.palette.divider} mb={0.5}>
            Asset Details
          </Typography>
          <Divider />
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Stack>
            <Typography variant="body2" color={theme.palette.text.secondary} mb={2}>
              Comprehensive security assessment of the web application and its API.
            </Typography>
            <Typography variant="body2" color={theme.palette.text.secondary} mb={2}>
              Host:{' '}
              <Link
                href={url ?? ''}
                target="_blank"
                style={{ color: theme.palette.primary.main, textDecoration: 'none' }}
              >
                {url}
              </Link>
            </Typography>
            <Stack direction="row" spacing={2}>
              <Typography variant="body2" color={theme.palette.text.secondary}>
                <FaRegUser /> User Name: {userName}
              </Typography>
              <Typography variant="body2" color={theme.palette.text.secondary}>
                <CiLock /> Password: {userPassword}
              </Typography>
            </Stack>
            <Stack direction="row" spacing={2}>
              <Typography variant="body2" color={theme.palette.text.secondary}>
                <FaRegUser /> Admin Name: {adminName}
              </Typography>
              <Typography variant="body2" color={theme.palette.text.secondary}>
                <CiLock /> Password: {adminPassword}
              </Typography>
            </Stack>
          </Stack>

          <Stack>
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
              placeholder="Search subdomains, title, IP...."
            />
          </Stack>
        </Box>
        {asset && <AssetDetailsTable asset={asset} />}
      </Box>
    ) : (
      <NotFoundCard entity="Assets" />
    )}
    <AddEditAssetsDialog
      open={openDialog}
      context={assetsDialogContext}
      onClose={onAssetsDialogCloseHandler}
    />
  </Container>
);
}
