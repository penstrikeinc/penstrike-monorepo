import { Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import { Dispatch, FC, SetStateAction, useCallback, useState } from 'react';
import { PentestDropdown } from 'src/components/pentest-dropdown';
import { FileUpload } from 'src/components/file-upload';
import { IGenerateAwsS3URL } from 'src/types';

export interface IReportFormProps {
  // eslint-disable-next-line react/no-unused-prop-types
  disabled?: boolean;
  imageSrc: IGenerateAwsS3URL | null;
  setImageSrc: Dispatch<SetStateAction<IGenerateAwsS3URL | null>>;
}

export const ReportForm: FC<IReportFormProps> = (props) => {
  const { setImageSrc, imageSrc } = props;
  const theme = useTheme();

  const onUploadComplete = useCallback(
    async (src: IGenerateAwsS3URL) => {
      setImageSrc(src);
    },
    [setImageSrc]
  );

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
        {imageSrc ? (
          <span>{imageSrc.fileName}</span>
        ) : (
          <FileUpload
            asset={{ destination: 'attachments' }}
            maxNumberOfFiles={1}
            onUploadComplete={onUploadComplete}
            buttonSize="large"
          />
        )}
      </Grid>
    </Grid>
  );
};
