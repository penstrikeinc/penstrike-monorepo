import { IconButton, SxProps } from '@mui/material';
import { FC } from 'react';
import { PiX } from 'react-icons/pi';

interface CloseBtnProps {
  onClose: () => void;
  size?: 'small' | 'medium' | 'large';
  sx?: SxProps;
}
export const CloseBtn: FC<CloseBtnProps> = ({ onClose, sx, size = 'medium' }) => {
  const iconSize = {
    small: 16,
    medium: 20,
    large: 24,
  };

  return (
    <IconButton aria-label="close" size={size} onClick={onClose} sx={sx}>
      <PiX fontSize={iconSize[size]} />
    </IconButton>
  );
};
