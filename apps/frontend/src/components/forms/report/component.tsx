import { Button, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import { FC } from 'react';
import { PentestDropdown } from 'src/components/pentest-dropdown';

export interface IReportFormProps {
  disabled?: boolean;
}

export const ReportForm: FC<IReportFormProps> = () => {
  const theme = useTheme();

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={12} md={12}>
        <Typography variant="body1" color={theme.palette.primary.light}>
          Report Information
        </Typography>
      </Grid>
      <Grid item xs={12} sm={12} md={12}>
        <PentestDropdown />
      </Grid>
      <Grid item xs={12} sm={12} md={12} display="flex" justifyContent="flex-end">
        <Button variant="soft" color="primary">
          Upload
        </Button>
      </Grid>
    </Grid>
  );
};
