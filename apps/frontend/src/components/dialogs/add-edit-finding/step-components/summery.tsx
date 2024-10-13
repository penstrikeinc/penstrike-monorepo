import { FC } from 'react';
import { useTheme } from '@mui/material/styles';
import { FindingDetails } from 'src/components/finding-details';
import { FindingStateEnum, IPentest, IUser, TCategoryEnum, TSeverityEnum } from 'src/types';
import { StepComponentProps } from './type';

export const Summery: FC<StepComponentProps> = (props) => {
  const { methods } = props;
  const { getValues } = methods;
  const theme = useTheme();

  const finding = getValues();

  // todo refactor this code
  const payload = {
    id: '',
    ...finding,
    category: finding.category.value as TCategoryEnum,
    severity: finding.severity.value as TSeverityEnum,
    pentest: { name: finding.pentest.label } as IPentest,
    user: {} as IUser,
    state: FindingStateEnum.READY_FOR_PENTEST,
    createdAt: '',
    updatedAt: '',
  };

  return <FindingDetails finding={payload} compact />;
};
