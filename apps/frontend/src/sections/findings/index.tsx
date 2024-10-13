'use client';

// @mui
import { alpha, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

// components
import {
  Button,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material';
import { FaPlus, FaSearch } from 'react-icons/fa';
import { useCallback, useMemo, useState } from 'react';
import { useSettingsContext } from 'src/components/settings';
import { AddEditFindingDialog, FindingsTable, NotFoundCard } from 'src/components';
import { useGetAllFindingQuery } from 'src/services';
import { CategoryEnum, FindingStateEnum, IAsset, SeverityEnum } from 'src/types';
import { paths } from 'src/routes/paths';
import { useRouter } from 'next/navigation';

export function Findings() {
  const settings = useSettingsContext();
  const [openDialog, setOpenDialog] = useState(false);
  const [findingDialogContext, setFindingDialogContext] = useState<IAsset | null>(null);
  const { data: findingResponse } = useGetAllFindingQuery();
  const [state, setState] = useState('');
  const [severity, setSeverity] = useState('');
  const [category, setCategory] = useState('');

  const handleStateChange = useCallback((event: SelectChangeEvent) => {
    setState(event.target.value as string);
  }, []);

  const handleSeverityChange = useCallback((event: SelectChangeEvent) => {
    setSeverity(event.target.value as string);
  }, []);

  const handleCategoryChange = useCallback((event: SelectChangeEvent) => {
    setCategory(event.target.value as string);
  }, []);

  const theme = useTheme();
  const router = useRouter();

  const findings = useMemo(() => findingResponse?.data.items || [], [findingResponse?.data]);

  const addFindingDialogOpenHandler = useCallback(() => {
    setOpenDialog(true);
  }, []);

  const onFindingShowHandler = useCallback(
    (id: string) => {
      const url = `${paths.dashboard.findings}/${id}`;
      router.push(url);
    },
    [router]
  );

  const onFindingDialogCloseHandler = useCallback(() => {
    setOpenDialog(false);
    setFindingDialogContext(null);
  }, []);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" color="text.secondary">
          Findings
        </Typography>
        <Button
          startIcon={<FaPlus size={18} />}
          variant="contained"
          color="primary"
          size="large"
          onClick={() => addFindingDialogOpenHandler()}
        >
          Create New Findings
        </Button>
      </Box>
      {findings.length ? (
        <Box
          sx={{
            mt: 5,
            p: 2,
            borderRadius: 2,
            bgcolor: alpha(theme.palette.grey[500], 0.04),
            border: `dashed 1px ${theme.palette.divider}`,
          }}
        >
          <Box
            sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}
          >
            <Typography variant="h6">All Findings</Typography>

            <Box>
              <FormControl variant="filled" sx={{ mr: 2, minWidth: 160 }}>
                <InputLabel id="demo-simple-select-standard-label">State</InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={state}
                  onChange={handleStateChange}
                  label="State"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {Object.values(FindingStateEnum).map((value) => (
                    <MenuItem key={value} value={value}>
                      {value}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl variant="filled" sx={{ mr: 2, minWidth: 160 }}>
                <InputLabel id="demo-simple-select-standard-label">Severity</InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={severity}
                  onChange={handleSeverityChange}
                  label="Severity"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {Object.values(SeverityEnum).map((value) => (
                    <MenuItem key={value} value={value}>
                      {value}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl variant="filled" sx={{ mr: 2, minWidth: 160 }}>
                <InputLabel id="demo-simple-select-standard-label">Category</InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={category}
                  onChange={handleCategoryChange}
                  label="Category"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {Object.values(CategoryEnum).map((value) => (
                    <MenuItem key={value} value={value}>
                      {value}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <FaSearch size={18} />
                    </InputAdornment>
                  ),
                }}
                variant="outlined"
                color="primary"
                size="medium"
                placeholder="Search Finding Name, Id"
              />
            </Box>
          </Box>

          <FindingsTable findings={findings} onShow={onFindingShowHandler} />
        </Box>
      ) : (
        <NotFoundCard entity="Finding" />
      )}
      <AddEditFindingDialog
        open={openDialog}
        context={findingDialogContext}
        onClose={onFindingDialogCloseHandler}
      />
    </Container>
  );
}
