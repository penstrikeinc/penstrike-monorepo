'use client';

import { alpha, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import { Divider, Grid, Typography } from '@mui/material';
import { useMemo } from 'react';
import { useSettingsContext } from 'src/components/settings';
import { CustomBreadcrumbs, FindingDetails, NotFoundCard } from 'src/components';
import { useGetFindingInfoQuery } from 'src/services';
import { paths } from 'src/routes/paths';
import { IFinding } from 'src/types';
import Scrollbar from 'src/components/scrollbar';
import { CiUser } from 'react-icons/ci';

interface IDetailsProps {
  id: string;
}

export function FindingDetailsSection({ id }: IDetailsProps) {
  const settings = useSettingsContext();
  const { data: findingResponse } = useGetFindingInfoQuery(id);

  const theme = useTheme();

  const finding: IFinding | undefined = useMemo(
    () => findingResponse?.data,
    [findingResponse?.data]
  );

  if (!finding) {
    return null;
  }

  const {
    createdAt: pentestCreatedAt,
    updatedAt: pentestUpdatedAt,
    id: pentestId,
    ...findingDetails
  } = finding;

  const assignerName = `${finding.pentest.assignedBy?.firstName} ${finding.pentest.assignedBy?.lastName}`;
  const submitterName = `${finding.user?.firstName} ${finding.user?.lastName}`;

  const style = {
    display: 'flex',
    alignItems: 'center',
  };

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <CustomBreadcrumbs
        heading="Finding Details"
        links={[
          { name: 'Finding', href: paths.dashboard.findings },
          { name: 'Finding Details', href: `${paths.dashboard.findings}/${id}` },
        ]}
      />
      {finding ? (
        <Box
          sx={{
            mt: 5,
            p: 2,
            borderRadius: 2,
            bgcolor: alpha(theme.palette.grey[500], 0.04),
            border: `dashed 1px ${theme.palette.divider}`,
          }}
        >
          <Scrollbar sx={{ height: 'calc(100dvh - 300px)' }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography variant="body2" color="text.secondary" mb={1}>
                  Assigned to
                </Typography>

                <Box sx={style}>
                  <Typography variant="body2" sx={{ ...style, mr: 1 }}>
                    <CiUser size={20} style={{ marginRight: '5px' }} /> {assignerName}
                  </Typography>

                  <Typography variant="body2" color="text.secondary">
                    - Last updated 30 minutes ago
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body2" color="text.secondary" mb={1}>
                  Submitted by
                </Typography>

                <Box sx={style}>
                  <Typography variant="body2" sx={{ ...style, mr: 1 }}>
                    <CiUser size={20} style={{ marginRight: '5px' }} />
                    {submitterName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    - 2 minutes ago
                  </Typography>
                </Box>
              </Grid>
            </Grid>
            <Divider sx={{ my: 2 }} />

            <FindingDetails finding={finding} />
          </Scrollbar>
        </Box>
      ) : (
        <NotFoundCard entity="Pentest" />
      )}
    </Container>
  );
}
