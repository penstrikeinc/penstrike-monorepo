import { FC } from 'react';
import { Grid, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { StepComponentProps } from './type';

export const Summery: FC<StepComponentProps> = (props) => {
  const { methods } = props;
  const { watch } = methods;
  const theme = useTheme();

  const boxStyle = {
    p: 2,
    mb: 2,
    display: 'flex',
    borderRadius: 1,
    bgcolor: theme.palette.grey[700],
  };
  return <Grid />;
};
