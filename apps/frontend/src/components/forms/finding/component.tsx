import { alpha, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import { FC } from 'react';
import { RHFTextField } from 'src/components/hook-form';

export interface IFindingFormProps {
  disabled?: boolean;
}

export const FindingForm: FC<IFindingFormProps> = (props) => {
  const { disabled } = props;
  const theme = useTheme();

  return (
    <>
      <Grid>
        <Typography variant="body1" color={theme.palette.primary.light}>
          Finding Information
        </Typography>
      </Grid>

      <Grid
        container
        spacing={3}
        sx={{
          p: 3.3,
          my: 2,
          borderRadius: 2,
          bgcolor: alpha(theme.palette.grey[900], 0.4),
        }}
      >
        <Grid item xs={12} sm={12} md={12}>
          <RHFTextField
            disabled={disabled}
            name="name"
            label="Finding Name"
            placeholder="Web Application finding - Q3 2024"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <RHFTextField
            disabled={disabled}
            name="description"
            label="Description"
            placeholder="Description of the finding"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <RHFTextField
            disabled={disabled}
            name="note"
            label="Note"
            placeholder="Note of the finding"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <RHFTextField
            disabled={disabled}
            name="host"
            label="Host Url"
            placeholder="https://example.com"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <RHFTextField
            disabled={disabled}
            name="impact"
            label="Impact"
            placeholder="Impact of the finding"
            fullWidth
          />
        </Grid>
      </Grid>
    </>
  );
};