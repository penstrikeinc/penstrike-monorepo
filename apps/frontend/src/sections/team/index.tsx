'use client';

// @mui
import { alpha, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
// components
import { useSettingsContext } from 'src/components/settings';
import React from 'react';
import { Button, Grid, Card, CardContent, CardMedia, Typography } from '@mui/material';
import { BsPersonAdd } from 'react-icons/bs';

const teamMembers = [
  {
    id: 1,
    name: 'Alice Johnson',
    role: 'Project Manager',
    image: 'https://via.placeholder.com/150',
  },
  { id: 2, name: 'Bob Smith', role: 'Developer', image: 'https://via.placeholder.com/150' },
  { id: 3, name: 'Charlie Brown', role: 'Designer', image: 'https://via.placeholder.com/150' },
];


export function Team() {
  const settings = useSettingsContext();
  const theme = useTheme();

    const handleInviteClick = () => {
      alert('Invite team member clicked!');
    };

    return (
      <Container maxWidth={settings.themeStretch ? false : 'xl'}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 2 }}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Team Page
          </Typography>
          <Button
            color="primary"
            variant="soft"
            startIcon={<BsPersonAdd />}
            onClick={handleInviteClick}
          >
            Invite Team Member
          </Button>
        </Box>
        <Box
          sx={{
            mt: 1,
            p: 2,
            height: '70vh',
            borderRadius: 2,
            bgcolor: alpha(theme.palette.grey[500], 0.04),
            border: `dashed 1px ${theme.palette.divider}`,
          }}
        >
          <Typography variant="body1" mb={3} gutterBottom>
            Team Members
          </Typography>
          <Grid container spacing={4}>
            {teamMembers.map((member) => (
              <Grid item xs={12} sm={6} md={4} key={member.id}>
                <Card>
                  <CardMedia component="img" height="150" image={member.image} alt={member.name} />
                  <CardContent>
                    <Typography variant="h6">{member.name}</Typography>
                    <Typography color="text.secondary">{member.role}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    );
}
