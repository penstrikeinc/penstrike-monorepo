import { FC } from 'react';
import {} from '../render-card-with-child';

export const CommentTree: FC<any> = (props) => {
  const { comments, onEdit, onReply, onRemove } = props;

  return (
    <>
      {/* {comments.map((comment) => (
        <RenderCommentCardWithChild
          key={comment.id}
          comment={comment}
          onEdit={onEdit}
          onReply={onReply}
          onRemove={onRemove}
        />
      ))} */}
    </>
  );
};
