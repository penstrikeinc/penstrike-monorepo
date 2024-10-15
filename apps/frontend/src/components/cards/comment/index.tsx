import { IComment } from 'src/types';
import React from 'react';
import { Card, CardContent, Avatar, Typography, Box } from '@mui/material';
import { fDateTime } from 'src/utils';

interface IParams {
  comment: IComment;
}

export const CommentCard = (props: IParams) => {
  const {
    comment: {
      massage,
      createdAt: date,
      user: { firstName, lastName },
    },
  } = props;
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
          <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
            {commentedName}
          </Typography>
          <Typography variant="caption" color="textSecondary">
            commented on {fDateTime(date)}
          </Typography>
        </Box>
        <CardContent sx={{ p: 0, pb: 1 }}>
          <Typography variant="body2" color="textPrimary">
            {massage}
          </Typography>
        </CardContent>

        <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
          <Typography
            variant="caption"
            color="primary"
            sx={{ cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}
          >
            Reply
          </Typography>
        </Box>
      </Box>
    </Card>
  );
};

export default CommentCard;
