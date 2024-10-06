import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useTheme } from '@mui/material/styles';
import { IAsset } from 'src/types';
import { Chip, Stack } from '@mui/material';
import { SiNextdotjs, SiTypescript } from 'react-icons/si';
import { BsImage } from 'react-icons/bs';

interface IProps {
  asset: IAsset;
}

export function AssetDetailsTable(params: IProps) {
  const { asset } = params;
  const theme = useTheme();

  return (
    <TableContainer>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Subdomains</TableCell>
            <TableCell align="left">Port</TableCell>
            <TableCell align="left">IP Address</TableCell>
            <TableCell align="left">Technologies</TableCell>
            <TableCell align="center">Status</TableCell>
            <TableCell align="center">Title</TableCell>
            <TableCell align="center">Image</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
            <TableCell component="th" scope="row">
              {asset.url}
            </TableCell>
            <TableCell align="left">
              <Chip label="192" color="warning" variant="outlined" />
            </TableCell>
            <TableCell align="left">
              <Chip label="127.0.0.1" color="info" variant="outlined" />
            </TableCell>
            <TableCell align="left">
              <Stack direction="row" spacing={1}>
                <SiNextdotjs size={24} />
                <SiTypescript size={24} />
              </Stack>
            </TableCell>
            <TableCell align="center">
              <Stack direction="row" spacing={1}>
                <Chip label="192" color="warning" variant="soft" />
                <Chip label="192" color="info" variant="soft" />
              </Stack>
            </TableCell>
            <TableCell align="center">Global protect sql</TableCell>
            <TableCell align="center">
              <BsImage color={theme.palette.primary.main} size={24} />
            </TableCell>
          </TableRow>
          <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
            <TableCell component="th" scope="row">
              {asset.url}
            </TableCell>
            <TableCell align="left">
              <Chip label="192" color="warning" variant="outlined" />
            </TableCell>
            <TableCell align="left">
              <Chip label="127.0.0.1" color="info" variant="outlined" />
            </TableCell>
            <TableCell align="left">
              <Stack direction="row" spacing={1}>
                <SiNextdotjs size={24} />
                <SiTypescript size={24} />
              </Stack>
            </TableCell>
            <TableCell align="center">
              <Stack direction="row" spacing={1}>
                <Chip label="192" color="warning" variant="soft" />
                <Chip label="192" color="info" variant="soft" />
              </Stack>
            </TableCell>
            <TableCell align="center">Global protect sql</TableCell>
            <TableCell align="center">
              <BsImage color={theme.palette.primary.main} size={24} />
            </TableCell>
          </TableRow>
          <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
            <TableCell component="th" scope="row">
              {asset.url}
            </TableCell>
            <TableCell align="left">
              <Chip label="192" color="warning" variant="outlined" />
            </TableCell>
            <TableCell align="left">
              <Chip label="127.0.0.1" color="info" variant="outlined" />
            </TableCell>
            <TableCell align="left">
              <Stack direction="row" spacing={1}>
                <SiNextdotjs size={24} />
                <SiTypescript size={24} />
              </Stack>
            </TableCell>
            <TableCell align="center">
              <Stack direction="row" spacing={1}>
                <Chip label="192" color="warning" variant="soft" />
                <Chip label="192" color="info" variant="soft" />
              </Stack>
            </TableCell>
            <TableCell align="center">Global protect sql</TableCell>
            <TableCell align="center">
              <BsImage color={theme.palette.primary.main} size={24} />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
