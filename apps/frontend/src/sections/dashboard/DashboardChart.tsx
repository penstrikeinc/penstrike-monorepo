'use client';

import { Container, Grid, Paper, Typography } from '@mui/material';
import { MdArrowDropDown, MdArrowDropUp } from 'react-icons/md';
import { useSettingsContext } from 'src/components/settings';

const items = [
  {
    type: 'Critical',
    previousWeek: 12,
    value: 40,
  },
  {
    type: 'High',
    previousWeek: 18,
    value: 52,
  },
  {
    type: 'Medium',
    previousWeek: 24,
    value: 18,
  },
  {
    type: 'Low',
    previousWeek: 8,
    value: 10,
  },
];

export function DashboardChart() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Grid container spacing={3}>
        {/* Loop through items */}
        {items.map((item, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Paper elevation={3} style={{ padding: '16px', textAlign: 'center' }}>
              <Typography variant="h5" component="h3" gutterBottom>
                <Typography
                  variant="h5"
                  component="span"
                  sx={{
                    // color:
                    //   item.type === 'Critical'
                    //     ? 'error.main'
                    //     : item.type === 'Low'
                    //       ? 'success.main'
                    //       : item.type === 'Medium' || 'High'
                    //         ? 'warning.main'
                    //         : 'text.primary',
                    fontWeight: 'bold',
                  }}
                >
                  {item.type}
                </Typography>{' '}
                Vulnerabilities
              </Typography>
              <Container
                component="section"
                sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography
                      variant="h3"
                      // color={
                      //   item.type === 'Critical'
                      //     ? 'error.main'
                      //     : item.type === 'Low'
                      //       ? 'success.main'
                      //       : item.type === 'Medium' || 'High'
                      //         ? 'warning.main'
                      //         : 'text.primary'
                      // }
                    >
                      {item.value}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Paper>hellooooooo</Paper>
                  </Grid>
                </Grid>
              </Container>

              <Typography
                variant="body2"
                color={item.previousWeek >= 0 ? 'success.main' : 'error.main'}
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                {item.previousWeek >= 0 ? (
                  <MdArrowDropUp fontSize="small" style={{ marginRight: 4 }} />
                ) : (
                  <MdArrowDropDown fontSize="small" style={{ marginRight: 4 }} />
                )}
                {Math.abs(item.previousWeek)}% from previous week
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
