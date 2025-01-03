import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Box, TextField, Typography, IconButton } from '@mui/material';
import {
  useCreateCommentMutation,
  useDeleteCommentMutation,
  useGetCommentsQuery,
  useUpdateCommentMutation,
} from 'src/services';
import { IComment } from 'src/types';
import { LoadingButton } from '@mui/lab';
import { FaX } from 'react-icons/fa6';
import { generateCommentTree, ICommentTree } from 'src/utils';
// import { CommentTree } from '../manage-comment';

interface IProps {
  findingId: string;
}

const CommentBox = (params: IProps) => {
  const { findingId } = params;
  const [comment, setComment] = useState<string>('');
  const [commentContext, setCommentContext] = useState<IComment | null>(null);
  const [commentReplyContext, setCommentReplyContext] = useState<IComment | null>(null);

  const [treeData, setTreeData] = useState<ICommentTree[]>([]);
  const [expandAll, setExpandAll] = useState<boolean>(true);

  const { mutateAsync: createComment } = useCreateCommentMutation();
  const { data: commentsRes } = useGetCommentsQuery({ findingId });
  const { mutateAsync: updateComment } = useUpdateCommentMutation();
  const { mutateAsync: removeComment } = useDeleteCommentMutation();

  const isEditMode = Boolean(commentContext);
  const isReplyMode = Boolean(commentReplyContext);

  const comments = useMemo(() => commentsRes?.data.items || [], [commentsRes?.data]);

  const handleSubmit = useCallback(() => {
    if (comment.trim()) {
      const payload = {
        findingId,
        massage: comment,
      };
      createComment(payload, {
        onSuccess: () => {
          setComment('');
        },
      });
    }
  }, [comment, createComment, findingId]);

  const handleUpdate = useCallback(() => {
    if (comment.trim()) {
      const payload = {
        commentId: `${commentContext?.id}`,
        content: comment,
      };
      updateComment(payload, {
        onSuccess: () => {
          setCommentContext(null);
          setComment('');
        },
      });
    }
  }, [comment, commentContext?.id, updateComment]);

  const handleEditData = useCallback((data: IComment) => {
    const { massage } = data;
    setCommentReplyContext(null);
    setCommentContext(data);
    setComment(massage);
  }, []);

  const handleReply = useCallback((data: IComment) => {
    const { massage, id } = data;
    const payload = {
      ...data,
      parentId: id,
    };
    setCommentContext(null);
    setCommentReplyContext(payload);
    setComment(`REPLY: ${massage}`);
  }, []);

  const handleReplySubmit = useCallback(() => {
    const { id } = commentReplyContext || {};
    const payload = {
      findingId,
      massage: comment,
      parentId: id,
    };

    createComment(payload, {
      onSuccess: () => {
        setCommentReplyContext(null);
        setComment('');
      },
    });
  }, [comment, commentReplyContext, createComment, findingId]);

  const handleRemove = useCallback(
    (id: string) => {
      removeComment(id);
    },
    [removeComment]
  );

  const handleClearContext = useCallback(() => {
    setCommentContext(null);
    setCommentReplyContext(null);
    setComment('');
  }, []);

  const saveBtnLabel = isEditMode ? 'Update' : 'Submit';
  const enableClearBtn = isEditMode || isReplyMode;
  const onSubmitAndUpdateHandler = isEditMode ? handleUpdate : handleSubmit;
  const onSubmit = isReplyMode ? handleReplySubmit : onSubmitAndUpdateHandler;

  useEffect(() => {
    const addExpandedFlatToComments = comments?.map((item) => ({
      ...item,
      expanded: expandAll,
    }));

    if (addExpandedFlatToComments) {
      const commentTree = generateCommentTree(addExpandedFlatToComments);
      setTreeData(commentTree);
    }
  }, [comments, expandAll]);

  return (
    <Box>
      <Box>
        {/* <CommentTree
          comments={treeData}
          onEdit={handleEditData}
          onReply={handleReply}
          onRemove={handleRemove}
        /> */}
      </Box>

      <Typography variant="body2" fontWeight="bold">
        Leave a Comment
      </Typography>
      <TextField
        label="Comment"
        variant="outlined"
        fullWidth
        multiline
        rows={2}
        focused
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        sx={{ my: 2 }}
        placeholder="Enter your comment here"
        InputProps={{
          endAdornment: (
            <>
              {enableClearBtn && (
                <IconButton size="medium" sx={{ mx: 1 }} onClick={handleClearContext}>
                  <FaX />
                </IconButton>
              )}
              <LoadingButton size="large" variant="contained" color="primary" onClick={onSubmit}>
                {isReplyMode ? 'Reply' : saveBtnLabel}
              </LoadingButton>
            </>
          ),
        }}
        onKeyUp={(event) => {
          if (event.key.toLowerCase() === 'enter') {
            onSubmit();
          }
        }}
      />
    </Box>
  );
};

export default CommentBox;
