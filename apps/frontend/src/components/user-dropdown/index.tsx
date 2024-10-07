import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { FC, SyntheticEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { IUser } from 'src/types';
import { mapPeopleDataToSelect, OptionType } from 'src/utils';
import { useGetAllUserQuery } from 'src/services';

export interface IUserDropdownProps {
  userId: string;
  onChange: (user: IUser | null) => void;
  label?: string;
}

export const UserDropdown: FC<IUserDropdownProps> = (props) => {
  const { onChange, userId, label = 'User Dropdown' } = props;
  const [value, setValue] = useState<OptionType | null>(null);

  const { data: userRes, isLoading } = useGetAllUserQuery();
  const users = useMemo(() => userRes?.data.items || [], [userRes?.data.items]);
  const usersOption = userRes ? mapPeopleDataToSelect(users) : [value];

  const onChangeHandler = useCallback(
    (_e: SyntheticEvent, selectedItem: OptionType | null) => {
      if (!selectedItem) {
        onChange(null);
        return;
      }

      const find = users.find((user) => user.id === selectedItem.value);
      onChange(find || null);
    },
    [users, onChange]
  );

  const user = usersOption.find((option) => option?.value === userId);

  useEffect(() => {
    if (user) {
      if (user.value !== value?.value) {
        setValue({
          label: user.label,
          value: user.value,
        });
      }
    } else {
      setValue(null);
    }
  }, [user, value?.value]);

  return (
    <Autocomplete
      fullWidth
      autoComplete
      autoHighlight
      noOptionsText="No user found"
      loading={isLoading}
      value={value}
      options={usersOption}
      renderInput={(params) => <TextField {...params} label={label} />}
      onChange={onChangeHandler}
    />
  );
};
