import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { Avatar, Box, Chip, darken } from '@mui/material';
import { PiCaretDown, PiCaretUp } from 'react-icons/pi';
import { FC, memo, useCallback, useEffect, useState } from 'react';
import { ICommentManageCardHandlers } from 'src/components/manage-comment';
import { fDateTime, getCardColor, ICommentTree } from 'src/utils';
import { FaEdit, FaReply, FaTrash } from 'react-icons/fa';
import { useTheme } from '@mui/material/styles';

interface IProps extends ICommentManageCardHandlers {
  comment: ICommentTree;
  expanded?: boolean;
  onExpand?: () => void;
}

export const CommentManageCard: FC<IProps> = memo((props: IProps) => {
  const { comment, onExpand, expanded, onEdit, onReply, onRemove } = props;
  const {
    id,
    massage,
    createdAt: date,
    user: { firstName, lastName, userType },
  } = comment;
  const commentedName = `${firstName} ${lastName}`;
  const level = comment?.level || 0;
  const theme = useTheme();

  const [colorPair, setColorPair] = useState({
    backgroundColor: '',
    textColor: 'inherit',
  });

  useEffect(() => {
    if (level) {
      setColorPair({
        backgroundColor: darken(getCardColor(level), 0.7),
        textColor: darken(getCardColor(level), 0.5),
      });
    } else {
      setColorPair({
        backgroundColor: darken(getCardColor(0), 0.7),
        textColor: darken(getCardColor(0), 0.6),
      });
    }
  }, [level]);

  const onEditHandler = useCallback(() => {
    onEdit(comment);
  }, [comment, onEdit]);

  const onReplyHandler = useCallback(() => {
    onReply(comment);
  }, [comment, onReply]);

  const onRemoveHandler = useCallback(() => {
    onRemove(id);
  }, [id, onRemove]);

  return (
    <Card
      sx={{
        height: '100%',
        borderRadius: '5px',
        backgroundColor: colorPair.backgroundColor,
        maxWidth: '500px',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          p: 2,
          py: 1,
          bgcolor: theme.palette.grey[700],
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar
            alt={commentedName}
            src="https://avatar.iran.liara.run/public/11"
            sx={{ width: 20, height: 20, marginRight: 1 }}
          />

          <Typography variant="caption">{commentedName}</Typography>
          <Chip
            size="small"
            variant="outlined"
            label={userType.toLocaleLowerCase()}
            sx={{ textTransform: 'capitalize', ml: 1, fontSize: 10 }}
          />
        </Box>
        <Typography variant="caption" color="textSecondary">
          commented on {fDateTime(date)}
        </Typography>
      </Box>
      <CardContent sx={{ padding: 2, py: `8px !important` }}>
        <Grid container spacing={2}>
          <Grid item flexGrow={1} alignItems="center" display="flex">
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              {massage}
            </Typography>
          </Grid>

          <Grid item>
            {comment.children?.length !== 0 && onExpand && (
              <Tooltip title="Expand">
                <IconButton onClick={onExpand} sx={{ ml: 0.5 }} size="large">
                  {expanded ? <PiCaretUp size={25} /> : <PiCaretDown size={25} />}
                </IconButton>
              </Tooltip>
            )}

            <Tooltip title="Reply">
              <IconButton size="large" sx={{ ml: 0.5 }} onClick={onReplyHandler}>
                <FaReply size={20} />
              </IconButton>
            </Tooltip>

            <Tooltip title="Edit">
              <IconButton size="large" onClick={onEditHandler} sx={{ ml: 0.5 }}>
                <FaEdit size={20} />
              </IconButton>
            </Tooltip>

            <Tooltip title="Remove">
              <IconButton size="large" onClick={onRemoveHandler} sx={{ ml: 0.5 }}>
                <FaTrash size={20} />
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
});
