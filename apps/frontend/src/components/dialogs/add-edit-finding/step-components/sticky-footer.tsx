import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { PiCaretLeft, PiCaretRight, PiFloppyDisk } from 'react-icons/pi';
import React, { FC } from 'react';
import { StickyFooterProps } from './type';
import { useGetDevice } from '../../../hooks';

export const StickyFooter: FC<StickyFooterProps> = (props) => {
  const { steps, activeStep, handleBack, handleNext, onSave, isDisabled, isMutationLoading } =
    props;
  const { isMobile } = useGetDevice();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'end',
        width: '100%',
      }}
    >
      {activeStep !== 0 && (
        <Button
          variant="soft"
          color="primary"
          size="large"
          startIcon={steps[activeStep - 1] && <PiCaretLeft />}
          onClick={handleBack}
          sx={{
            ml: isMobile ? 1 : 2,
            minWidth: isMobile ? '90px' : '200px',
          }}
        >
          Back
        </Button>
      )}

      {steps[activeStep]?.state === steps[1]?.state && (
        <LoadingButton
          variant="contained"
          color="primary"
          size="large"
          startIcon={<PiFloppyDisk />}
          disabled={isDisabled}
          onClick={onSave}
          loading={isMutationLoading}
          sx={{
            ml: isMobile ? 1 : 2,
            minWidth: isMobile ? '90px' : '200px',
          }}
        >
          Confirm & Submit
        </LoadingButton>
      )}
      {activeStep !== steps.length - 1 && (
        <LoadingButton
          variant="soft"
          color="primary"
          size="large"
          endIcon={<PiCaretRight />}
          onClick={handleNext}
          sx={{
            ml: isMobile ? 1 : 2,
            minWidth: isMobile ? '90px' : '200px',
          }}
          disabled={isDisabled}
        >
          Next
        </LoadingButton>
      )}
    </Box>
  );
};