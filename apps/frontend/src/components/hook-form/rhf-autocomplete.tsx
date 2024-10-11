import { useFormContext, Controller } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Autocomplete, { AutocompleteProps } from '@mui/material/Autocomplete';

export interface Option {
  value: string;
  label: string;
}

interface Props<
  T,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined,
> extends AutocompleteProps<T, Multiple, DisableClearable, FreeSolo> {
  name: string;
  label?: string;
  placeholder?: string;
  helperText?: React.ReactNode;
  required?: boolean;
}

export function RHFAutocomplete<
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined,
>({
  name,
  label,
  placeholder,
  helperText,
  options,
  required,
  ...other
}: Omit<Props<Option, Multiple, DisableClearable, FreeSolo>, 'renderInput'>) {
  const { control, setValue } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        const visibleOptions = () => {
          if (other.multiple && field.value) {
            return options.filter(
              (option) => !field.value.find((item: Option) => item.value === option.value)
            );
          }

          return options.filter((option) => option.value !== field.value?.value);
        };

        return (
          <Autocomplete
            {...field}
            onChange={(_event, newValue) =>
              setValue(name, newValue, { shouldValidate: true, shouldDirty: true })
            }
            renderInput={(params) => (
              <TextField
                label={label}
                placeholder={placeholder}
                error={!!error}
                helperText={error ? error?.message : helperText}
                {...params}
                required={required}
              />
            )}
            {...other}
            options={visibleOptions()}
          />
        );
      }}
    />
  );
}
