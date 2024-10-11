import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Typography from '@mui/material/Typography';
import { FC, useState } from 'react';
import { Box, Step, StepButton, Stepper } from '@mui/material';
import { ellipsis } from 'src/utils';
import Scrollbar from 'src/components/scrollbar';
import { IAsset } from 'src/types';
import { useGetDevice } from '../../hooks';
import { DialogHeader } from '../../dialog-header';
import { useAddEditFindingFunctionality } from './use-add-edit-assets-functionality';
import { ICompletedStateProps, IStep } from './step-components/type';
import { Summery } from './step-components/summery';
import { StickyFooter } from './step-components/sticky-footer';
import { FindingInfo } from './step-components/finding-info';

export interface IAddEditFindingProps {
  open: boolean;
  context: IAsset | null;
  onClose: () => void;
  onError?: (error: unknown) => void;
}

export const AddEditFindingDialog: FC<IAddEditFindingProps> = (props) => {
  const { context, onClose, onError, open } = props;
  const [activeStep, setActiveStep] = useState(0);
  const { isMobile } = useGetDevice();
  const [completed, setCompleted] = useState<ICompletedStateProps>({});

  const isEditMode = !!context;

  const {
    onSubmit,
    methods,
    onCloseHandler,
    onCloseDialogHandler,
    handleBack,
    handleNext,
    handleStep,
    isDisabled,
    isMutationLoading,
  } = useAddEditFindingFunctionality({
    context,
    onClose,
    isEditMode,
    onError,
    activeStep,
    completed,
    setActiveStep,
    setCompleted,
  });

  const steps: IStep[] = [
    {
      order: 0,
      state: 'finding-info',
      label: 'Finding Info',
      component: FindingInfo,
    },
    {
      order: 1,
      state: 'submit-review',
      label: 'Submit for Review',
      component: Summery,
    },
  ];

  const ActiveStepContent = steps[activeStep].component;

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
          <Typography variant="h5" sx={{ ...ellipsis, fontWeight: 'bold' }}>
            Create Finding
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Create finding by filling the information below.
          </Typography>
        </Box>
      </DialogHeader>
      <DialogContent>
        <Stepper nonLinear activeStep={activeStep}>
          {steps.map((step, index) => (
            <Step key={step.label} completed={completed[index]}>
              <StepButton color="inherit" onClick={handleStep(index)}>
                {step.label}
              </StepButton>
            </Step>
          ))}
        </Stepper>

        <Scrollbar
          sx={{
            mt: 3,
            borderRadius: 1,
            height: 'calc(100vh - 350px)',
          }}
        >
          <ActiveStepContent
            steps={steps}
            activeStep={activeStep}
            handleBack={handleBack}
            handleNext={handleNext}
            methods={methods}
            onSubmitHandler={onSubmit}
            isDisabled={isDisabled}
            isEditMode={isEditMode}
            isMutationLoading={isMutationLoading}
          />
        </Scrollbar>
      </DialogContent>
      <DialogActions>
        <StickyFooter
          isDisabled={isDisabled}
          steps={steps}
          onSave={onSubmit}
          activeStep={activeStep}
          handleBack={handleBack}
          handleNext={handleNext}
        />
      </DialogActions>
    </Dialog>
  );
};
