import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { IFinding } from 'src/types';
import { Box, Chip, Divider, Grid, Stack, Typography } from '@mui/material';
import CommentBox from '../comment-box';

interface IProps {
  finding: IFinding;
  compact?: boolean;
}

export function FindingDetails(params: IProps) {
  const { finding, compact } = params;
  const theme = useTheme();

  const assets = finding.pentest?.assets || [];
  const findingId = finding.id;

  return (
    <Grid>
      <Typography variant="h4" fontWeight="bold">
        {finding.name}
      </Typography>
      <Stack direction="row" spacing={2} sx={{ mt: 1 }}>
        <Chip label={finding.category} color="warning" variant="outlined" />
        <Chip label={finding.severity} color="error" variant="outlined" />
        {!compact && (
          <>
            <Chip label={`${assets.length} assets`} variant="soft" />
            <Chip label="Quick Efforts" variant="soft" />
            <Chip label="6.8CVSS" variant="soft" />
          </>
        )}
      </Stack>
      <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
        {finding.description}
      </Typography>
      <Divider sx={{ my: 2 }} />
      <Typography variant="h6" fontWeight="bold">
        Affected User Host{' '}
        <Chip label={finding.host} variant="soft" sx={{ color: theme.palette.text.primary }} />
      </Typography>
      <Divider sx={{ my: 2 }} />
      <Typography variant="body2" color="text.secondary">
        Step to Reproduce : {finding.reproduce}
      </Typography>
      <Divider sx={{ my: 2 }} />
      <Typography variant="body2" color="text.secondary">
        Impact: {finding.reproduce}
      </Typography>
      <Divider sx={{ my: 2 }} />
      <Typography variant="body2" color="text.secondary">
        Proof of Concept: {finding.reproduce}
      </Typography>
      <Divider sx={{ my: 2 }} />

      <Box>
        <Typography variant="h6" fontWeight="bold" mb={2}>
          Discussion
        </Typography>
        <CommentBox findingId={findingId} />
      </Box>
    </Grid>
  );
}
