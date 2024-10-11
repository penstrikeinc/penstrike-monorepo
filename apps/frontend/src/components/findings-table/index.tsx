import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Chip } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { IFinding } from 'src/types';
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
              <TableCell align="left">State</TableCell>
              <TableCell align="left">Severity</TableCell>
              <TableCell align="center">Category</TableCell>
              <TableCell align="center">Assigned To</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {findings.map((finding, index) => (
              <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {finding.id}
                </TableCell>
                <TableCell align="left">{finding.name}</TableCell>
                <TableCell align="left">{finding.updatedAt}</TableCell>
                <TableCell align="left">
                  {' '}
                  <Chip label={finding.severity} variant="outlined" />
                  {finding.state}
                </TableCell>
                <TableCell align="center">
                  <Chip label={finding.state} variant="outlined" />
                </TableCell>
                <TableCell align="center">
                  <Chip label={finding.category} variant="outlined" />
                </TableCell>
                <TableCell align="left">{finding.user.firstName}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Scrollbar>
    </TableContainer>
  );
}
