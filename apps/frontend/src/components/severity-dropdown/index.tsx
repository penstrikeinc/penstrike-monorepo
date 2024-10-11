import { FC } from 'react';
import { SeverityEnum } from 'src/types';
import { RHFAutocomplete } from '../hook-form';

interface IDropdownProps {
  disabled?: boolean;
  required?: boolean;
  label?: string;
}

export const SeverityDropdown: FC<IDropdownProps> = (props) => {
  const { disabled, required, label } = props;
  const options = Object.values(SeverityEnum).map((c) => ({
    value: c,
    label: c,
  }));

  return (
    <RHFAutocomplete
      label={label ?? 'Severity'}
      name="severity"
      disabled={disabled}
      options={options}
      required={required}
    />
  );
};
