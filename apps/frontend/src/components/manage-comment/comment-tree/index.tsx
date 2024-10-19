import { FC } from 'react';
import { IGenerateCommentTree, RenderCommentCardWithChild } from '../render-card-with-child';

export const CommentTree: FC<IGenerateCommentTree> = (props) => {
  const { comments, onEdit, onReply, onRemove } = props;

  return (
    <>
      {comments.map((comment) => (
        <RenderCommentCardWithChild
          key={comment.id}
          comment={comment}
          onEdit={onEdit}
          onReply={onReply}
          onRemove={onRemove}
        />
      ))}
    </>
  );
};
