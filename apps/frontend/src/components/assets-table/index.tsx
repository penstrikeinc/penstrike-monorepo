import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { IconButton, Stack } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { FaPen, FaTrashAlt } from 'react-icons/fa';
import { IoEye } from 'react-icons/io5';
import { IAsset } from 'src/types';
import Scrollbar from '../scrollbar';

interface IProps {
  assets: IAsset[];
  onEdit: (asset: IAsset) => void;
  onDelete: (id: string) => void;
  onShow: (id: string) => void;
}

export function AssetsTable(params: IProps) {
  const { assets, onEdit, onDelete, onShow } = params;
  const theme = useTheme();

  return (
    <TableContainer>
      <Scrollbar sx={{ height: 'calc(100vh - 380px)' }}>
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
            {assets.map((asset, index) => (
              <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {asset.name}
                </TableCell>
                <TableCell align="left">{asset.type}</TableCell>
                <TableCell align="left">{asset.url}</TableCell>
                <TableCell align="left">{asset.status}</TableCell>
                <TableCell align="center">
                  <Stack direction="row" display="flex" justifyContent="center" spacing={2}>
                    <IconButton aria-label="edit" size="medium" onClick={() => onEdit(asset)}>
                      <FaPen size={20} color={theme.palette.primary.main} />
                    </IconButton>
                    <IconButton aria-label="edit" size="medium" onClick={() => onDelete(asset.id)}>
                      <FaTrashAlt size={20} color={theme.palette.error.main} />
                    </IconButton>
                    <IconButton aria-label="edit" size="medium" onClick={() => onShow(asset.id)}>
                      <IoEye size={20} color={theme.palette.info.main} />
                    </IconButton>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Scrollbar>
    </TableContainer>
  );
}
