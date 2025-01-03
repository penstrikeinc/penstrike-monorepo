import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { IconButton } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { IoEye } from 'react-icons/io5';
import { TReportSingle } from 'src/schemas';
import { useGetAttachmentInfoQuery } from 'src/services';
import Scrollbar from '../scrollbar';

interface IProps {
  reports: TReportSingle[];
  onShow: (id: string) => void;
}

export function ReportsTable(params: IProps) {
  const { reports, onShow } = params;
  const theme = useTheme();

  const filename = reports[0]?.reportFile.fileName;

  const { data: attachmentInfo } = useGetAttachmentInfoQuery(filename);
  console.log({ reports, filename, attachmentInfo });
  return (
    <TableContainer>
      <Scrollbar sx={{ height: 'calc(100vh - 380px)' }}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Pentest Name</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {reports.map((report, index) => (
              <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row" align="left">
                  {report.pentest.name}
                </TableCell>
                <TableCell align="right">
                  <IconButton aria-label="edit" size="medium" onClick={() => onShow(report.id)}>
                    <IoEye size={20} color={theme.palette.info.main} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Scrollbar>
    </TableContainer>
  );
}
