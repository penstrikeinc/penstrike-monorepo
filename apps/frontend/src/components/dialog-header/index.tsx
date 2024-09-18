import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import { SxProps } from '@mui/material';
import { PiX } from 'react-icons/pi';
import { FC } from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import { useGetDevice } from '../hooks';

export interface DialogHeaderProps {
  children: React.ReactNode;
  onClose?: () => void;
  sx?: SxProps;
}

export const DialogHeader: FC<DialogHeaderProps> = (props) => {
  const { children, onClose, ...other } = props;
  const { isPortable } = useGetDevice();

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
        <IconButton
          edge="start"
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 10,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <PiX size={25} />
        </IconButton>
      ) : null}
    </Stack>
  );
};
