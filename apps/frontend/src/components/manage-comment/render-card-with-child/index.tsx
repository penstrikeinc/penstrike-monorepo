import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Fade from '@mui/material/Fade';
import { lighten } from '@mui/material';
import { FC, Fragment, useCallback, useEffect, useState } from 'react';
import { getCardColor, ICommentTree } from 'src/utils';
import { IComment } from 'src/types';
import { CommentManageCard } from 'src/components/cards';

export interface IOnEditHandler {
  (comment: IComment): void;
}

export interface IOnReplyHandler {
  (comment: IComment): void;
}

export interface IOnRemoveHandler {
  (id: string): void;
}

export interface ICommentManageCardHandlers {
  onEdit: IOnEditHandler;
  onReply: IOnReplyHandler;
  onRemove: IOnRemoveHandler;
}

export interface IRenderCommentProps extends ICommentManageCardHandlers {
  comment: ICommentTree;
}

export interface IGenerateCommentTree extends ICommentManageCardHandlers {
  comments: ICommentTree[];
}

export const RenderCommentCardWithChild: FC<IRenderCommentProps> = (props) => {
  const { comment, onEdit, onReply, onRemove } = props;
  const [expanded, setExpanded] = useState(false);

  const onExpandHandler = useCallback(() => {
    setExpanded((prev) => !prev);
  }, []);

  useEffect(() => {
    setExpanded(!!comment?.expanded);
  }, [comment.expanded]);

  const colorCode = comment.level
    ? lighten(getCardColor(comment.level), 0.3)
    : lighten(getCardColor(0), 0.3);

  return (
    <Fragment key={comment.id}>
      <Grid key={comment.id} xs={12} item mb={2}>
        <CommentManageCard
          comment={comment}
          onExpand={onExpandHandler}
          expanded={expanded}
          onEdit={onEdit}
          onReply={onReply}
          onRemove={onRemove}
        />
      </Grid>

      {comment.children && expanded && (
        <Fade in={!!comment.children.length && expanded} timeout={200} unmountOnExit>
          <Box mb={2} ml={6} sx={{ position: 'relative' }}>
            <div
              style={{
                borderLeft: `4px double ${colorCode}`,
                height: '100%',
                position: 'absolute',
                left: '-30px',
                opacity: 0.5,
              }}
            />
            <GenerateCommentTree
              comments={comment.children}
              onEdit={onEdit}
              onReply={onReply}
              onRemove={onRemove}
            />
          </Box>
        </Fade>
      )}
    </Fragment>
  );
};

const GenerateCommentTree: FC<IGenerateCommentTree> = (props) => {
  const { comments, onEdit, onReply, onRemove } = props;

  return (
    <>
      {comments.map((comment) => (
        <RenderCommentCardWithChild
          onEdit={onEdit}
          key={comment.id}
          comment={comment}
          onReply={onReply}
          onRemove={onRemove}
        />
      ))}
    </>
  );
};
