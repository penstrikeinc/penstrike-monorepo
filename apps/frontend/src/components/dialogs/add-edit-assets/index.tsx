import LoadingButton from '@mui/lab/LoadingButton';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { PiFloppyDisk } from 'react-icons/pi';
import { FC } from 'react';
import { Box } from '@mui/material';
import { ellipsis } from 'src/utils';
import { FormProvider } from 'src/components/hook-form';
import { TAsset } from 'src/schemas/assets';
import { AssetsForm } from 'src/components/forms';
import { useGetDevice } from '../../hooks';
import { DialogHeader } from '../../dialog-header';
import { useAddEditAssetsFunctionality } from './use-add-edit-assets-functionality';

export interface IAddEditAssetsProps {
  context: TAsset | null;
  onClose: () => void;
  onError?: (error: unknown) => void;
}

export const AddEditAssetsDialog: FC<IAddEditAssetsProps> = (props) => {
  const { context, onClose, onError } = props;
  const isEditMode = !!context;
  const open = !!context;
  const { isMobile } = useGetDevice();

  const { methods, onSubmit, onCloseHandler, onCloseDialogHandler } = useAddEditAssetsFunctionality(
    {
      context,
      onClose,
      isEditMode,
      onError,
    }
  );

  const {
    formState: { isSubmitting },
  } = methods;

  return (
    <Dialog
      open={open}
      onClose={onCloseDialogHandler}
      maxWidth="lg"
      fullWidth
      fullScreen={isMobile}
    >
      <DialogHeader onClose={onCloseHandler}>
        <Box>
          <Typography variant="h5" sx={{ ...ellipsis, fontWeight: 'bold' }}>
            Create Asset
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Create asset by filling the information below. Secure your business by top notch
            security
          </Typography>
        </Box>
      </DialogHeader>
      <DialogContent>
        <FormProvider methods={methods} onSubmit={onSubmit}>
          <Grid container spacing={2}>
            <AssetsForm disabled={isSubmitting} />
          </Grid>
          {/* <DevTool control={methods.control} /> */}
        </FormProvider>
      </DialogContent>
      <DialogActions>
        <LoadingButton
          onClick={onSubmit}
          autoFocus
          variant="contained"
          size="large"
          startIcon={<PiFloppyDisk />}
          loading={isSubmitting}
          color="primary"
        >
          Save
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};
