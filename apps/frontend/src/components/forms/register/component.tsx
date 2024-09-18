import { IconButton, InputAdornment } from '@mui/material';
import Grid from '@mui/material/Grid';
import { FC } from 'react';
import { RHFTextField } from 'src/components/hook-form';
import Iconify from 'src/components/iconify';
import { useBoolean } from 'src/hooks/use-boolean';

export interface IFormProps {
  disabled?: boolean;
}

export const RegisterForm: FC<IFormProps> = (props) => {
  const { disabled } = props;
  const password = useBoolean();

  return (
    <>
      <Grid item xs={12} sm={6}>
        <RHFTextField name="firstName" label="First name" />
      </Grid>
      <Grid item xs={12} sm={6}>
        <RHFTextField name="lastName" label="Last name" />
      </Grid>
      <Grid item xs={12} sm={12}>
        <RHFTextField name="email" label="Email address" />
      </Grid>
      <Grid item xs={12} sm={12}>
        <RHFTextField
          name="password"
          label="Password"
          type={password.value ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={password.onToggle} edge="end">
                  <Iconify icon={password.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Grid>
    </>
  );
};
