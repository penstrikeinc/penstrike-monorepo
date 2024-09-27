import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { darken, useTheme, SxProps } from '@mui/material';
import { RiErrorWarningLine } from 'react-icons/ri';
import { FC } from 'react';
import { useMode } from 'src/components/hooks';

type ICardProps = {
  entity: string;
  boxShadow?: string;
  size?: string;
  sx?: SxProps;
  color?: 'secondary' | 'error';
};

export const NotFoundCard: FC<ICardProps> = (props) => {
  const { entity, boxShadow, size, color, sx } = props;
  const error = color === 'error' ? '#FF5630' : undefined;
  const sm = size === 'sm';
  const iconSize = sm ? 45 : 90;
  const textSize = sm ? 15 : 20;
  const theme = useTheme();
  const { isLight } = useMode();

  const title = `${entity} not found`;

  return (
    <Card sx={{ boxShadow, mt: 3, ...sx }}>
      <CardContent
        sx={{
          backgroundColor: isLight
            ? darken(theme.palette.grey[200], 0.02)
            : theme.palette.grey[800],
        }}
      >
        <Grid container alignItems="center" justifyContent="center" p={sm ? 1 : 2}>
          <Grid item xs={12} textAlign="center">
            <RiErrorWarningLine size={iconSize} color={error} />
            <Typography
              sx={{ fontSize: textSize, color: error ?? 'text.secondary', textAlign: 'center' }}
            >
              {title}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
