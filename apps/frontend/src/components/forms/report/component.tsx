import { Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import { FC, useCallback } from 'react';
import { PentestDropdown } from 'src/components/pentest-dropdown';
import { FileUpload } from 'src/components/file-upload';
import { IGenerateAwsS3URL } from 'src/types';

export interface IReportFormProps {
  disabled?: boolean;
}

export const ReportForm: FC<IReportFormProps> = () => {
  const theme = useTheme();

  const onUploadComplete = useCallback(async (src: IGenerateAwsS3URL[]) => {
    console.log(src[0]);
  }, []);

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
        <FileUpload
          asset={{ destination: 'reports' }}
          maxNumberOfFiles={1}
          onUploadComplete={onUploadComplete}
          buttonSize="large"
        />
      </Grid>
    </Grid>
  );
};
