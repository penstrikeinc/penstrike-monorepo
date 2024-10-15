import React, { useCallback, useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import { useCreateCommentMutation } from 'src/services';

interface IProps {
  findingId: string;
}

const CommentBox = (params: IProps) => {
  const { findingId } = params;
  const [comment, setComment] = useState<string>('');
  const [comments, setComments] = useState<string[]>([]);
  const { mutateAsync: createComment } = useCreateCommentMutation();

  const handleSubmit = useCallback(() => {
    if (comment.trim()) {
      const payload = {
        findingId,
        massage: comment,
      };
      createComment(payload);

      setComments([...comments, comment]);
      setComment(''); // Clear the input after submission
    }
  }, [comment, comments, createComment, findingId]);

  return (
    <Box
      sx={{
        width: '100%',
      }}
    >
      {comments.length > 0 && (
        <Box mt={3}>
          <Typography variant="body2">Comments:</Typography>
          {comments.map((c, index) => (
            <Box key={index} mt={2} p={2} sx={{ borderRadius: 1 }}>
              <Typography>{c}</Typography>
            </Box>
          ))}
        </Box>
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
