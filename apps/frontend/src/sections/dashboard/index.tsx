'use client';

// @mui
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
// components
import { FaHandPaper } from 'react-icons/fa';
import { Grid } from '@mui/material';
import { useSettingsContext } from 'src/components/settings';
import { useMockedUser } from 'src/hooks/use-mocked-user';
import { PentestInfoCard } from 'src/components';
import { TPentestInfo } from 'src/types';

const pentestInfoCard: TPentestInfo[] = [
  {
    id: 1,
    title: 'Create New "Pentest"',
    content: 'Go to "Pentest Page".',
    content2: 'Click to “Create New Pentest” Button"',
  },
  {
    id: 2,
    title: 'Detail Information',
    content: 'Enter the name & description and start date & end date',
    content2: 'Specify assets and target URLs.',
  },
  {
    id: 3,
    title: 'Submit for Review',
    content: 'Review all details entered.',
    content2: 'Click "Submit" to send the pentest plan for admin approval.',
  },
];

export function Dashboard() {
  const settings = useSettingsContext();
  const { user } = useMockedUser();
  const theme = useTheme();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Typography variant="h4" color="text.secondary">
        Home
      </Typography>

      <Box
        sx={{
          py: 5,
        }}
      >
        <Typography variant="h4" mb={3}>
          <FaHandPaper /> Welcome,{' '}
          <span style={{ color: theme.palette.primary.main }}>{user?.displayName}</span>
        </Typography>
        <Typography variant="h6">Setting up your first pentest </Typography>
        <Typography variant="body2" color="text.secondary">
          Setup your first pentest tutorial to secure your business. Here is the tutorial how it’s
          work.
        </Typography>
      </Box>
      <Grid container spacing={2}>
        {pentestInfoCard.map((info, index) => (
          <Grid item xs={12} md={4} key={info.id}>
            <PentestInfoCard info={info} index={info.id} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
