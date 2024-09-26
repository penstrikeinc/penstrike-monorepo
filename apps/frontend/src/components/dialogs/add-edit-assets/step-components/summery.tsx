import { FC } from 'react';
import { Grid, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { StepComponentProps } from './type';

export const Summery: FC<StepComponentProps> = (props) => {
  const { methods } = props;
  const { watch } = methods;
  const theme = useTheme();
  const { assets } = watch();

  const boxStyle = {
    p: 2,
    mb: 2,
    display: 'flex',
    borderRadius: 1,
    bgcolor: theme.palette.grey[700],
  };
  return (
    <Grid container>
      {assets.map((asset, index) => (
        <Grid item xs={12} sm={12} key={index} sx={boxStyle}>
          <Typography width="100%">Asset Name: {asset.assetName}</Typography>
          <Typography width="100%">Target Url: {asset.targetUrl}</Typography>
        </Grid>
      ))}
    </Grid>
  );
};
