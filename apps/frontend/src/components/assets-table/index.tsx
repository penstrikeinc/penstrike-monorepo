import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Stack } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { FaPen, FaTrashAlt } from 'react-icons/fa';
import { IoEye } from 'react-icons/io5';

function createData(name: string, type: string, url: string, status: string) {
  return { name, type, url, status };
}

const rows = [
  createData('Remote desktop', 'Web Application', 'https:www.penstrike.io', 'Active'),
  createData('Remote desktop', 'Web Application', 'https:www.penstrike.io', 'Active'),
  createData('Remote desktop', 'Web Application', 'https:www.penstrike.io', 'Inactive'),
  createData('Remote desktop', 'Web Application', 'https:www.penstrike.io', 'Active'),
  createData('Remote desktop', 'Web Application', 'https:www.penstrike.io', 'Inactive'),
];

export function AssetsTable() {
  const theme = useTheme();

  return (
    <TableContainer>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Assets Name</TableCell>
            <TableCell align="left">Asset Type</TableCell>
            <TableCell align="left">Url/Host</TableCell>
            <TableCell align="left">Status</TableCell>
            <TableCell align="center">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="left">{row.type}</TableCell>
              <TableCell align="left">{row.url}</TableCell>
              <TableCell align="left">{row.status}</TableCell>
              <TableCell align="center">
                <Stack direction="row" display="flex" justifyContent="center" spacing={2}>
                  <FaPen
                    style={{ cursor: 'pointer' }}
                    size={20}
                    color={theme.palette.primary.main}
                  />
                  <FaTrashAlt
                    style={{ cursor: 'pointer' }}
                    size={20}
                    color={theme.palette.error.main}
                  />
                  <IoEye style={{ cursor: 'pointer' }} size={20} color={theme.palette.info.main} />
                </Stack>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
