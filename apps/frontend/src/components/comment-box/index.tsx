import React, { useCallback, useMemo, useState } from 'react';
import { Box, TextField, Button, Typography, Grid } from '@mui/material';
import { useCreateCommentMutation, useGetCommentsQuery } from 'src/services';
import { CommentCard } from '../cards';

interface IProps {
  findingId: string;
}

const CommentBox = (params: IProps) => {
  const { findingId } = params;
  const [comment, setComment] = useState<string>('');
  const { mutateAsync: createComment } = useCreateCommentMutation();
  const { data: commentsRes } = useGetCommentsQuery({ findingId });

  const comments = useMemo(() => commentsRes?.data.items || [], [commentsRes?.data]);

  const handleSubmit = useCallback(() => {
    if (comment.trim()) {
      const payload = {
        findingId,
        massage: comment,
      };
      setComment('');
      createComment(payload);
    }
  }, [comment, createComment, findingId]);

  return (
    <Box>
      {comments.length > 0 && (
        <Grid container spacing={2} my={2}>
          {comments.map((com) => (
            <Grid item xs={12} sm={12} key={com.id}>
              <CommentCard comment={com} />
            </Grid>
          ))}
        </Grid>
      )}

      <Typography variant="body2" fontWeight="bold">
        Leave a Comment
      </Typography>
      <TextField
        label="Comment"
        variant="outlined"
        fullWidth
        multiline
        rows={2}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        sx={{ my: 2 }}
        placeholder="Enter your comment here"
        InputProps={{
          endAdornment: (
            <Button size="large" variant="contained" color="primary" onClick={handleSubmit}>
              Submit
            </Button>
          ),
        }}
      />
    </Box>
  );
};

export default CommentBox;
