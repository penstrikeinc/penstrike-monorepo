import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Typography from '@mui/material/Typography';
import { FC, useState } from 'react';
import { Box, Step, StepButton, Stepper } from '@mui/material';
import { ellipsis } from 'src/utils';
import { TAssets } from 'src/schemas/assets';
import Scrollbar from 'src/components/scrollbar';
import { useGetDevice } from '../../hooks';
import { DialogHeader } from '../../dialog-header';
import { useAddEditAssetsFunctionality } from './use-add-edit-assets-functionality';
import { ICompletedStateProps, IStep } from './step-components/type';
import { AssetInfo } from './step-components/asset-info';
import { Summery } from './step-components/summery';
import { StickyFooter } from './step-components/sticky-footer';

export interface IAddEditAssetsProps {
  context: TAssets | null;
  onClose: () => void;
  onError?: (error: unknown) => void;
}

export const AddEditAssetsDialog: FC<IAddEditAssetsProps> = (props) => {
  const { context, onClose, onError } = props;
  const [activeStep, setActiveStep] = useState(0);
  const { isMobile } = useGetDevice();
  const [completed, setCompleted] = useState<ICompletedStateProps>({});

  const isEditMode = !!context;
  const open = !!context;

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
  } = useAddEditAssetsFunctionality({
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
      state: 'assets-url',
      label: 'Assets & URLs',
      component: AssetInfo,
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
            Create Asset
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Create asset by filling the information below. Secure your business by top notch
            security
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
