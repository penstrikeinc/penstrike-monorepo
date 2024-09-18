import { Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import { FC } from 'react';
import { RHFTextField } from 'src/components/hook-form';

export interface IAssetsFormProps {
  disabled?: boolean;
}

export const AssetsForm: FC<IAssetsFormProps> = (props) => {
  const { disabled } = props;
  const theme = useTheme();

  return (
    <>
      <Grid item xs={12} sm={12}>
        <Typography variant="body1" color={theme.palette.primary.light}>
          Set Asset & URLs
        </Typography>
      </Grid>
      <Grid item xs={12} sm={6}>
        <RHFTextField
          disabled={disabled}
          name="assetsName"
          label="Enter Assets Name"
          placeholder="Web App name"
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <RHFTextField
          disabled={disabled}
          name="targetUrl"
          label="Target Url"
          placeholder="htttps://www.pentstrik.io/service"
        />
      </Grid>
    </>
  );
};
