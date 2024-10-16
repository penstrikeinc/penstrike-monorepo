import { IComment } from 'src/types';
import React from 'react';
import { Card, CardContent, Avatar, Typography, Box, Chip, CardActions } from '@mui/material';
import { fDateTime } from 'src/utils';

interface IParams {
  comment: IComment;
  onEdit: (comment: IComment) => void;
  onReply: (comment: IComment) => void;
  onDelete: (id: string) => void;
}

export const CommentCard = (props: IParams) => {
  const { onDelete, onEdit, onReply, comment } = props;

  const {
    id,
    massage,
    createdAt: date,
    user: { firstName, lastName, userType },
  } = comment;
  const commentedName = `${firstName} ${lastName}`;

  return (
    <Card
      elevation={1}
      sx={{
        display: 'flex',
        alignItems: 'flex-start',
        padding: 2,
        borderRadius: 2,
      }}
    >
      <Avatar
        alt={commentedName}
        src="https://avatar.iran.liara.run/public/11"
        sx={{ width: 30, height: 30, marginRight: 1.5 }}
      />

      <Box sx={{ flexGrow: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="body2">
            {commentedName}{' '}
            <Chip
              size="small"
              variant="outlined"
              label={userType.toLocaleLowerCase()}
              sx={{ textTransform: 'capitalize', ml: 1, fontSize: 11 }}
            />
          </Typography>
          <Typography variant="caption" color="textSecondary">
            commented on {fDateTime(date)}
          </Typography>
        </Box>
        <CardContent sx={{ p: 0, py: 1 }}>
          <Typography variant="body2" color="textPrimary">
            {massage}
          </Typography>
        </CardContent>

        <CardActions sx={{ display: 'flex', justifyContent: 'flex-start', p: 0.5 }}>
          <Typography
            variant="caption"
            color="primary"
            onClick={() => onReply(comment)}
            sx={{ cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}
          >
            Reply
          </Typography>
          <Typography
            variant="caption"
            color="primary"
            onClick={() => onEdit(comment)}
            sx={{ cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}
          >
            Edit
          </Typography>
          <Typography
            variant="caption"
            color="primary"
            onClick={() => onDelete(id)}
            sx={{ cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}
          >
            Remove
          </Typography>
        </CardActions>
      </Box>
    </Card>
  );
};

export default CommentCard;
