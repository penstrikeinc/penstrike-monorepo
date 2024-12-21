import { Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import { FC } from 'react';
import { RHFTextField } from 'src/components/hook-form';

export interface IInviteFormProps {
  disabled?: boolean;
}

export const InviteForm: FC<IInviteFormProps> = ({ disabled }) => {
  const theme = useTheme();

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={12} md={12}>
        <Typography variant="body1" color={theme.palette.primary.light}>
          Invite Member Information
        </Typography>
      </Grid>
      <Grid item xs={12} sm={12} md={6}>
        <RHFTextField
          disabled={disabled}
          name="firstName"
          label="First Name"
          placeholder="John"
          fullWidth
        />
      </Grid>
      <Grid item xs={12} sm={12} md={6}>
        <RHFTextField
          disabled={disabled}
          name="lastName"
          label="Last Name"
          placeholder="Doe"
          fullWidth
        />
      </Grid>
      <Grid item xs={12} sm={12} md={12}>
        <RHFTextField
          disabled={disabled}
          name="email"
          label="Email Address"
          placeholder="invite@example.com"
          fullWidth
        />
      </Grid>
    </Grid>
  );
};
