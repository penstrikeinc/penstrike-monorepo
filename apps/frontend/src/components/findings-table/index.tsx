import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { alpha, Chip } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { IFinding } from 'src/types';
import { fDateTime, getSeverityColor } from 'src/utils';
import Scrollbar from '../scrollbar';

interface IProps {
  findings: IFinding[];
  onShow: (id: string) => void;
}

export function FindingsTable(params: IProps) {
  const { findings, onShow } = params;
  const theme = useTheme();

  return (
    <TableContainer>
      <Scrollbar sx={{ height: 'calc(100vh - 380px)' }}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Finding ID</TableCell>
              <TableCell>Finding Name</TableCell>
              <TableCell align="left">Last Update</TableCell>
              <TableCell align="center">State</TableCell>
              <TableCell align="center">Severity</TableCell>
              <TableCell align="center">Category</TableCell>
              <TableCell align="center">Assigned To</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {findings.map((finding, index) => {
              const severityColor = getSeverityColor(finding.severity);

              return (
                <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{
                      textTransform: 'uppercase',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      color: theme.palette.primary.main,
                    }}
                    onClick={() => onShow(finding.id)}
                  >
                    #{finding.id.slice(0, 8)}
                  </TableCell>
                  <TableCell align="left">{finding.name}</TableCell>
                  <TableCell align="left">{fDateTime(finding.updatedAt)}</TableCell>
                  <TableCell align="center">
                    <Chip
                      label={finding.state.split('_').join(' ')}
                      sx={{ textTransform: 'capitalize' }}
                      variant="soft"
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Chip
                      label={finding.severity}
                      variant="outlined"
                      sx={{
                        bgcolor: alpha(theme.palette[severityColor].main, 0.1),
                        borderColor: theme.palette[severityColor].main,
                        color: theme.palette[severityColor].main,
                      }}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Chip label={finding.category} variant="outlined" />
                  </TableCell>
                  <TableCell align="center">{finding.pentest.assignedBy?.firstName}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Scrollbar>
    </TableContainer>
  );
}
