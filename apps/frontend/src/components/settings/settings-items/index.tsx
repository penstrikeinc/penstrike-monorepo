import { Typography, Tooltip, Grid } from '@mui/material';
import Iconify from 'src/components/iconify';
import BaseOptions from '../drawer/base-option';
import LayoutOptions from '../drawer/layout-options';
import PresetsOptions from '../drawer/presets-options';
import StretchOptions from '../drawer/stretch-options';
import { useSettingsContext } from '../context';

const labelStyles = {
  mb: 1.5,
  width: '100%',
  color: 'text.disabled',
  fontWeight: 'fontWeightSemiBold',
};

export const SettingItems = ({ isDrawer }: { isDrawer?: boolean }) => {
  const settings = useSettingsContext();
  const itemProps = { item: true, xs: isDrawer ? 12 : 3 };

  const renderMode = (
    <Grid {...itemProps}>
      <Typography variant="caption" sx={{ ...labelStyles }}>
        Mode
      </Typography>

      <BaseOptions
        value={settings.themeMode}
        onChange={(newValue: string) => settings.onUpdate('themeMode', newValue)}
        options={['light', 'dark']}
        icons={['sun', 'moon']}
      />
    </Grid>
  );

  const renderContrast = (
    <Grid {...itemProps}>
      <Typography variant="caption" sx={{ ...labelStyles }}>
        Contrast
      </Typography>

      <BaseOptions
        value={settings.themeContrast}
        onChange={(newValue: string) => settings.onUpdate('themeContrast', newValue)}
        options={['default', 'bold']}
        icons={['contrast', 'contrast_bold']}
      />
    </Grid>
  );

  const renderDirection = (
    <Grid {...itemProps}>
      <Typography variant="caption" sx={{ ...labelStyles }}>
        Direction
      </Typography>

      <BaseOptions
        value={settings.themeDirection}
        onChange={(newValue: string) => settings.onUpdate('themeDirection', newValue)}
        options={['ltr', 'rtl']}
        icons={['align_left', 'align_right']}
      />
    </Grid>
  );

  const renderLayout = (
    <Grid {...itemProps}>
      <Typography variant="caption" sx={{ ...labelStyles }}>
        Layout
      </Typography>

      <LayoutOptions
        value={settings.themeLayout}
        onChange={(newValue: string) => settings.onUpdate('themeLayout', newValue)}
        options={['vertical', 'horizontal', 'mini']}
      />
    </Grid>
  );

  const renderStretch = (
    <Grid {...itemProps}>
      <Typography
        variant="caption"
        sx={{
          ...labelStyles,
          display: 'inline-flex',
          alignItems: 'center',
        }}
      >
        Stretch
        <Tooltip title="Only available at large resolutions > 1600px (xl)">
          <Iconify icon="eva:info-outline" width={16} sx={{ ml: 0.5 }} />
        </Tooltip>
      </Typography>

      <StretchOptions
        value={settings.themeStretch}
        onChange={() => settings.onUpdate('themeStretch', !settings.themeStretch)}
      />
    </Grid>
  );

  const renderPresets = (
    <Grid {...itemProps}>
      <Typography variant="caption" sx={{ ...labelStyles }}>
        Presets
      </Typography>

      <PresetsOptions
        value={settings.themeColorPresets}
        onChange={(newValue: string) => settings.onUpdate('themeColorPresets', newValue)}
      />
    </Grid>
  );

  return (
    <Grid container spacing={3}>
      {renderMode} {renderContrast} {renderDirection} {renderLayout} {renderStretch} {renderPresets}
    </Grid>
  );
};
