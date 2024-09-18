import { useMemo } from 'react';
// routes
import { TbLayoutDashboardFilled } from 'react-icons/tb';
import { FaNoteSticky, FaMoneyBillTrendUp } from 'react-icons/fa6';
import { ImBug } from 'react-icons/im';
import { BsShieldFillExclamation } from 'react-icons/bs';
import { PiNotepadFill } from 'react-icons/pi';
import { HiUserGroup } from 'react-icons/hi2';
import { paths } from 'src/routes/paths';
// components
import SvgColor from 'src/components/svg-color';
import Iconify from 'src/components/iconify';

const icon = (name: string) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
  // OR
  // <Iconify icon="fluent:mail-24-filled" />
  // https://icon-sets.iconify.design/solar/
  // https://www.streamlinehq.com/icons
);

const ICONS = {
  job: icon('ic_job'),
  blog: icon('ic_blog'),
  chat: icon('ic_chat'),
  mail: icon('ic_mail'),
  user: icon('ic_user'),
  file: icon('ic_file'),
  lock: icon('ic_lock'),
  tour: icon('ic_tour'),
  order: icon('ic_order'),
  label: icon('ic_label'),
  blank: icon('ic_blank'),
  kanban: icon('ic_kanban'),
  folder: icon('ic_folder'),
  banking: icon('ic_banking'),
  booking: icon('ic_booking'),
  invoice: icon('ic_invoice'),
  product: icon('ic_product'),
  calendar: icon('ic_calendar'),
  disabled: icon('ic_disabled'),
  external: icon('ic_external'),
  menuItem: icon('ic_menu_item'),
  ecommerce: icon('ic_ecommerce'),
  analytics: icon('ic_analytics'),
  dashboard: icon('ic_dashboard'),
};

export function useNavData() {
  const data = useMemo(
    () => [
      // OVERVIEW
      // ----------------------------------------------------------------------
      {
        // subheader: 'overview',
        items: [
          {
            title: 'Dashboard',
            path: paths.dashboard.root,
            icon: <TbLayoutDashboardFilled size={22} />,
          },
          { title: 'Assets', path: paths.dashboard.assets, icon: <FaNoteSticky size={22} /> },
          {
            title: 'Pentest',
            path: paths.dashboard.pentest,
            icon: <ImBug size={22} />,
          },
          {
            title: 'Findings',
            path: paths.dashboard.findings,
            icon: <BsShieldFillExclamation size={22} />,
          },
          { title: 'Reports', path: paths.dashboard.reports, icon: <PiNotepadFill size={22} /> },
          {
            title: 'Billings',
            path: paths.dashboard.billings,
            icon: <FaMoneyBillTrendUp size={22} />,
          },
          { title: 'Team', path: paths.dashboard.team, icon: <HiUserGroup size={22} /> },
          {
            title: 'Setting',
            path: paths.dashboard.settings,
            icon: <Iconify icon="solar:settings-bold-duotone" width={24} />,
          },
        ],
      },
    ],
    []
  );

  return data;
}
