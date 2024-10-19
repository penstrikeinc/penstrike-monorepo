import { IComment } from 'src/types';

export interface ICommentTree extends IComment {
  children?: ICommentTree[];
  expanded?: boolean;
  level?: number;
}

export function generateCommentTree(flatArray: ICommentTree[]): ICommentTree[] {
  const map: Record<string, ICommentTree> = {};
  const hierarchy: ICommentTree[] = [];

  // Create a mapping of comments based on their IDs
  flatArray.forEach((comment) => {
    comment.children = []; // Add an empty children array
    map[comment.id] = comment;
  });

  flatArray.forEach((comment) => {
    const parent = map[comment.parentId || ''];

    if (parent?.children) {
      parent.children.push(comment);
    } else {
      hierarchy.push(comment);
    }
  });

  return addLevelProperty(hierarchy);
}

function addLevelProperty(comments: ICommentTree[], level = 0): ICommentTree[] {
  return comments.map((comment) => {
    const updatedComment: ICommentTree = { ...comment, level };

    if (comment?.children && comment.children.length > 0) {
      updatedComment.children = addLevelProperty(comment?.children, level + 1);
    }

    return updatedComment;
  });
}
