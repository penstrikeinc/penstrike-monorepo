import { alpha, Button, TextField, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import { FC, useCallback } from 'react';
import { useFieldArray, UseFormReturn } from 'react-hook-form';
import { assetDefaultValues, TAssets } from 'src/schemas';
import { CloseBtn } from 'src/components/close-btn';
import { FaPlusCircle } from 'react-icons/fa';

export interface IAssetFormProps {
  disabled?: boolean;
  methods: UseFormReturn<TAssets>;
  isEditMode?: boolean;
}

export const AssetForm: FC<IAssetFormProps> = (props) => {
  const { disabled, methods, isEditMode } = props;
  const { control, register } = methods;
  const theme = useTheme();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'assets',
  });
  const onCloseRow = useCallback(
    (index: number) => {
      if (fields.length !== 1) {
        remove(index);
      }
    },
    [fields.length, remove]
  );

  return (
    <>
      <Grid>
        <Typography variant="body1" color={theme.palette.primary.light}>
          Set Asset & URLs
        </Typography>
      </Grid>
      {fields.map((field, index) => (
        <Grid
          key={field.id}
          sx={{
            p: 3.3,
            my: 2,
            borderRadius: 2,
            display: 'flex',
            position: 'relative',
            bgcolor: alpha(theme.palette.grey[900], 0.4),
          }}
        >
          <Grid width="100%" mr={2}>
            <TextField
              disabled={disabled}
              {...register(`assets.${index}.name`)}
              label="Enter Asset Name"
              placeholder="Web App name"
              fullWidth
            />
          </Grid>
          <Grid width="100%">
            <TextField
              disabled={disabled}
              {...register(`assets.${index}.url`)}
              label="Target Url"
              placeholder="htttps://www.pentstrik.io/service"
              fullWidth
            />
          </Grid>
          {fields.length > 1 && (
            <CloseBtn
              onClose={() => onCloseRow(index)}
              sx={{
                position: 'absolute',
                right: 1,
                top: 1,
                color: theme.palette.grey[500],
              }}
            />
          )}
        </Grid>
      ))}
      <Button
        sx={{
          width: 1,
          height: 80,
          borderRadius: 2,
          bgcolor: alpha(theme.palette.grey[500], 0.04),
          border: `dashed 1px ${theme.palette.primary.main}`,
          opacity: isEditMode ? 0.3 : 1,
        }}
        onClick={() => append(assetDefaultValues)}
        disabled={isEditMode}
      >
        <FaPlusCircle size={20} style={{ marginRight: 4 }} color={theme.palette.primary.main} />

        <Typography variant="h6" color={theme.palette.primary.main}>
          Add a Asset
        </Typography>
      </Button>
    </>
  );
};
