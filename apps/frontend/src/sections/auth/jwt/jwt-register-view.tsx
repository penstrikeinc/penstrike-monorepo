'use client';

import { useState } from 'react';
// @mui
import LoadingButton from '@mui/lab/LoadingButton';
import Link from '@mui/material/Link';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
// routes
import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';
import { useSearchParams, useRouter } from 'src/routes/hooks';
// config
import { PATH_AFTER_LOGIN } from 'src/config-global';
// components
import { FormProvider } from 'src/components/hook-form';
import { RegisterForm, useRegisterFormSchema } from 'src/components';
import { Grid } from '@mui/material';
import { registerDefaultValues, TRegister } from 'src/schemas';
import { useAuthContext } from 'src/auth/hooks';

// ----------------------------------------------------------------------

export default function JwtRegisterView() {
  const { register } = useAuthContext();

  const router = useRouter();

  const [errorMsg, setErrorMsg] = useState('');

  const searchParams = useSearchParams();

  const returnTo = searchParams.get('returnTo');

  const { methods } = useRegisterFormSchema();

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data: TRegister) => {
    try {
      register({
        payload: data,
        onSuccess: () => {
          reset(registerDefaultValues);
          router.push(returnTo || PATH_AFTER_LOGIN);
        },
      });
    } catch (error) {
      console.error(error);
      reset(registerDefaultValues);
      setErrorMsg(typeof error === 'string' ? error : error.message);
    }
  });

  const renderHead = (
    <Stack mb={2}>
      <Typography variant="h4">Sign up to Penstrikeinc</Typography>

      <Stack direction="row" spacing={0.5}>
        <Typography variant="body2"> Already have an account? </Typography>

        <Link href={paths.auth.login} component={RouterLink} variant="subtitle2">
          Sign in
        </Link>
      </Stack>
    </Stack>
  );

  const renderTerms = (
    <Typography
      component="div"
      sx={{
        color: 'text.secondary',
        mt: 2.5,
        typography: 'caption',
        textAlign: 'center',
      }}
    >
      {'By signing up, I agree to '}
      <Link underline="always" color="text.primary">
        Terms of Service
      </Link>
      {' and '}
      <Link underline="always" color="text.primary">
        Privacy Policy
      </Link>
      .
    </Typography>
  );

  const renderForm = (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      {!!errorMsg && <Alert severity="error">{errorMsg}</Alert>}
      <Grid container spacing={2} mb={2}>
        <RegisterForm />
      </Grid>
      <LoadingButton
        fullWidth
        color="inherit"
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
      >
        Create account
      </LoadingButton>
    </FormProvider>
  );

  return (
    <>
      {renderHead}

      {renderForm}

      {renderTerms}
    </>
  );
}
