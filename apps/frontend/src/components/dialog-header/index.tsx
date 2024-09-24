import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import { SxProps } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { FC } from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import { useGetDevice } from '../hooks';
import { CloseBtn } from '../close-btn/component';

export interface DialogHeaderProps {
  children: React.ReactNode;
  onClose?: () => void;
  sx?: SxProps;
}

export const DialogHeader: FC<DialogHeaderProps> = (props) => {
  const { children, onClose, ...other } = props;
  const { isPortable } = useGetDevice();
  const theme = useTheme();

  return (
    <Stack sx={{ m: 0, p: 2 }} {...other}>
      <Stack direction="row" alignItems="center">
        {isPortable && (
          <IconButton color="inherit" onClick={onClose} sx={{ mr: 2 }}>
            <IoIosArrowBack />
          </IconButton>
        )}
        {children}
      </Stack>
      {onClose && !isPortable ? (
        <CloseBtn
          onClose={onClose}
          sx={{
            position: 'absolute',
            right: 10,
            top: 8,
            color: theme.palette.grey[500],
          }}
        />
      ) : null}
    </Stack>
  );
};
