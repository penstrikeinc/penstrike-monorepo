import { FC } from 'react';
import { CategoryEnum } from 'src/types';
import { RHFAutocomplete } from '../hook-form/RHFAutocomplete';

export interface ICategoryDropdownProps {
  disabled?: boolean;
  required?: boolean;
  label?: string;
}

export const CategoryDropdown: FC<ICategoryDropdownProps> = (props) => {
  const { disabled, required, label } = props;
  const options = Object.values(CategoryEnum).map((c) => ({
    value: c,
    label: c,
  }));

  return (
    <RHFAutocomplete
      label={label ?? 'category'}
      name="category"
      disabled={disabled}
      options={options}
      required={required}
    />
  );
};
