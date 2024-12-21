'use client';

// @mui
import { alpha, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
// components
import { Button, Card, CardContent, Divider, Grid, Typography } from '@mui/material';
import { useSettingsContext } from 'src/components/settings';

const plans = [
  {
    id: 1,
    name: 'Silver',
    price: '$20/month',
    priceId: 'price_123',
    features: ['Basic Support', '10 Projects'],
  },
  {
    id: 2,
    name: 'Gold',
    price: '$50/month',
    priceId: 'price_456',
    features: ['Priority Support', '50 Projects'],
  },
  {
    id: 3,
    name: 'Diamond',
    price: '$100/month',
    priceId: 'price_789',
    features: ['Premium Support', 'Unlimited Projects'],
  },
  {
    id: 4,
    name: 'Enterprise',
    price: 'Custom Pricing',
    features: ['Dedicated Support', 'Custom Solutions'],
    isEnterprise: true,
  },
];

export function Billings() {
  const settings = useSettingsContext();
  const theme = useTheme();

  const handleCheckout = async (priceId: string) => {
    if (!priceId) {
      window.location.href = 'mailto:sales@company.com';
      return;
    }

    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ priceId }),
      });

      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert('Unable to redirect to Stripe checkout.');
      }
    } catch (error) {
      console.error('Error creating checkout session:', error);
      alert('Payment failed. Please try again.');
    }
  };

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Typography variant="h6">Billing Page</Typography>

      <Box
        sx={{
          mt: 2,
          p: 2,
          height: '70vh',
          borderRadius: 2,
          bgcolor: alpha(theme.palette.grey[500], 0.04),
          border: `dashed 1px ${theme.palette.divider}`,
        }}
      >
        <Box sx={{ flexGrow: 1, padding: 4 }}>
          <Typography variant="h4" mb={3} textAlign="center" gutterBottom>
            Choose Your Plan
          </Typography>
          <Grid container spacing={4}>
            {plans.map((plan) => (
              <Grid item xs={12} sm={6} md={3} key={plan.id}>
                <Card elevation={3}>
                  <CardContent>
                    <Typography variant="h5" textAlign="center" color="primary">
                      {plan.name}
                    </Typography>
                    <Typography variant="h6" textAlign="center" mt={1} mb={2}>
                      {plan.price}
                    </Typography>
                    <Divider />
                    <Box mt={2} mb={2}>
                      {plan.features?.map((feature, index) => (
                        <Typography key={index} variant="body2" textAlign="center">
                          {feature}
                        </Typography>
                      ))}
                    </Box>
                    <Divider />
                    <Box mt={2}>
                      <Button
                        variant="contained"
                        color={plan.isEnterprise ? 'secondary' : 'primary'}
                        fullWidth
                        onClick={() => handleCheckout(String(plan.priceId))}
                      >
                        {plan.isEnterprise ? 'Talk to Sales' : 'Select Plan'}
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
