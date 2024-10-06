import Box from '@mui/material/Box';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { MdOutlineNavigateNext } from 'react-icons/md';
import { BreadcrumbsLink } from './BreadcrumbsLink';
import { CustomBreadcrumbsProps } from './types';

export function CustomBreadcrumbs(props: CustomBreadcrumbsProps) {
  const { links, action, heading, moreLink, activeLast, sx, ...other } = props;
  const lastLink = links[links.length - 1].name;

  return (
    <Box sx={{ mb: 1, ...sx }}>
      <Stack direction="row" alignItems="center">
        <Box sx={{ flexGrow: 1 }}>
          {/* HEADING */}
          {heading && (
            <Typography variant="h4" gutterBottom>
              {heading}
            </Typography>
          )}

          {/* BREADCRUMBS */}
          {!!links.length && (
            <Breadcrumbs
              separator={<MdOutlineNavigateNext style={{ margin: '0 -10px' }} size={20} />}
              {...other}
            >
              {links.map((link) => (
                <BreadcrumbsLink
                  key={link.name || ''}
                  link={link}
                  activeLast={activeLast}
                  disabled={link.name === lastLink}
                />
              ))}
            </Breadcrumbs>
          )}
        </Box>

        {action && <Box sx={{ flexShrink: 0 }}> {action} </Box>}
      </Stack>

      {/* MORE LINK */}
      {!!moreLink && (
        <Box sx={{ mt: 2 }}>
          {moreLink.map((href) => (
            <Link
              noWrap
              key={href}
              href={href}
              variant="body2"
              target="_blank"
              rel="noopener"
              sx={{ display: 'table' }}
            >
              {href}
            </Link>
          ))}
        </Box>
      )}
    </Box>
  );
}
