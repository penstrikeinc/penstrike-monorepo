import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Typography from '@mui/material/Typography';
import { FC } from 'react';
import { Box } from '@mui/material';
import { ellipsis } from 'src/utils';
import { InviteForm } from 'src/components/forms';
import { LoadingButton } from '@mui/lab';
import { PiFloppyDisk } from 'react-icons/pi';
import { FormProvider } from 'src/components/hook-form';
import { useGetDevice } from '../../hooks';
import { DialogHeader } from '../../dialog-header';
import { useInviteMemberFunctionality } from './use-add-functionality';

export interface IInviteMemberProps {
  open: boolean;
  onClose: () => void;
  onError?: (error: unknown) => void;
}

export const InviteMemberDialog: FC<IInviteMemberProps> = (props) => {
  const { onClose, onError, open } = props;
  const { isMobile } = useGetDevice();

  const { onCloseHandler, onCloseDialogHandler, isMutationLoading, onSubmit, methods } =
    useInviteMemberFunctionality({
      onClose,
      onError,
    });

  return (
    <Dialog
      open={open}
      onClose={onCloseDialogHandler}
      maxWidth="md"
      fullWidth
      fullScreen={isMobile}
    >
      <DialogHeader onClose={onCloseHandler} sx={{ p: 3 }}>
        <Typography variant="h6" sx={{ ...ellipsis, fontWeight: 'bold' }}>
          Invite Member
        </Typography>
      </DialogHeader>
      <DialogContent>
        <FormProvider methods={methods} onSubmit={onSubmit}>
          <InviteForm />
        </FormProvider>
      </DialogContent>
      <DialogActions>
        <LoadingButton
          variant="contained"
          color="primary"
          size="large"
          startIcon={<PiFloppyDisk />}
          onClick={onSubmit}
          loading={isMutationLoading}
          sx={{
            ml: isMobile ? 1 : 2,
            minWidth: isMobile ? '90px' : '200px',
          }}
        >
          Confirm & Invite
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};
