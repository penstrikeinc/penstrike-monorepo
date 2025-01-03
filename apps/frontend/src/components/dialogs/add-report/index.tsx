import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Typography from '@mui/material/Typography';
import { FC, useState } from 'react';
import { Box } from '@mui/material';
import { ellipsis } from 'src/utils';
import { ReportForm } from 'src/components/forms';
import { LoadingButton } from '@mui/lab';
import { PiFloppyDisk } from 'react-icons/pi';
import { FormProvider } from 'src/components/hook-form';
import { IGenerateAwsS3URL } from 'src/types';
import { useGetDevice } from '../../hooks';
import { DialogHeader } from '../../dialog-header';
import { useAddReportFunctionality } from './use-add-report-functionality';

export interface IAddReportProps {
  open: boolean;
  onClose: () => void;
  onError?: (error: unknown) => void;
}

export const AddReportDialog: FC<IAddReportProps> = (props) => {
  const { onClose, onError, open } = props;
  const { isMobile } = useGetDevice();
  const [imageSrc, setImageSrc] = useState<IGenerateAwsS3URL | null>(null);

  const { onCloseHandler, onCloseDialogHandler, isMutationLoading, onSubmit, methods } =
    useAddReportFunctionality({
      onClose,
      onError,
      imageSrc,
      setImageSrc,
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
        <Box>
          <Typography variant="h6" sx={{ ...ellipsis, fontWeight: 'bold' }}>
            Create Report
          </Typography>
        </Box>
      </DialogHeader>
      <DialogContent>
        <FormProvider methods={methods} onSubmit={onSubmit}>
          <ReportForm imageSrc={imageSrc} setImageSrc={setImageSrc} />
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
          Confirm & Submit
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};
