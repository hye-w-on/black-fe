import { useState } from 'react';

import styled from '@emotion/styled';
import { Action, CrudCode } from '../../models/common';
import { BasicButton } from '../../components/atoms/Button';

/* 리스트 CRUD 테스트 */
/* TODO: 개선 필요 */
const FeedPage = () => {
  interface FeedPost extends Action {
    content: string;
    comments: Comment[];
  }

  interface Comment extends Action {
    content: string;
  }

  const mockPosts: FeedPost[] = [
    {
      content: 'post content1',
      action: CrudCode.READ,
      comments: [
        { content: 'comment1', action: CrudCode.READ },
        { content: 'comment2', action: CrudCode.READ },
      ],
    },
    {
      content: 'post content2',
      action: CrudCode.READ,
      comments: [
        { content: 'comment3', action: CrudCode.READ },
        { content: 'comment4', action: CrudCode.READ },
      ],
    },
  ];

  const [posts, setPosts] = useState<FeedPost[]>(mockPosts);

  const handleDeletePostClick = (index: number) => {
    const updatedPosts = posts
      .map((post, i) => {
        if (i === index) {
          return post.action === CrudCode.CREATE ? null : { ...post, action: CrudCode.DELETE };
        }
        return post;
      })
      .filter((element) => element !== null) as FeedPost[];

    setPosts(updatedPosts);
  };

  const handleDeleteCommentClick = (postIndex: number, commentIndex: number) => {
    const updatedPosts = posts.map((post, i) => {
      if (i === postIndex) {
        const updatedComments = post.comments
          .map((comment, j) => {
            if (j === commentIndex) {
              return comment.action === CrudCode.CREATE
                ? null
                : { ...comment, action: CrudCode.DELETE };
            }
            return comment;
          })
          .filter((element) => element !== null) as Comment[];
        return {
          ...post,
          action: post.action === CrudCode.DELETE ? CrudCode.DELETE : CrudCode.UPDATE,
          comments: updatedComments,
        };
      }
      return post;
    });
    setPosts(updatedPosts);
  };

  const handleAddPost = () => {
    const newPost: FeedPost = {
      content: 'new content',
      action: CrudCode.CREATE,
      comments: [],
    };
    setPosts([...posts, newPost]);
  };

  const handleAddCommentClick = (postIndex: number) => {
    const updatedPosts = posts.map((post, i) => {
      if (i === postIndex) {
        const newComment: Comment = {
          content: 'new comment',
          action: CrudCode.CREATE,
        };
        return {
          ...post,
          action: post.action === CrudCode.CREATE ? CrudCode.CREATE : CrudCode.UPDATE,
          comments: [...post.comments, newComment],
        };
      }
      return post;
    });
    setPosts(updatedPosts);
  };

  const handleDeleteCheckedPost = () => {
    const selectedIndexs = [0, 1, 2];
    setPosts((prevPost) => {
      // const filteredPosts = prevPost.filter((_, index) => !selectedIndexs.includes(index));
      const updatedPosts = prevPost
        .map((post, index) => {
          if (selectedIndexs.includes(index)) {
            if (post.action === CrudCode.CREATE) return null;
            else {
              return { ...post, action: CrudCode.DELETE };
            }
          }
          return post;
        })
        .filter((element) => element !== null) as FeedPost[];
      return updatedPosts;
    });
    /* 잘못된 방법 */
    /*
    selectedIndexs.forEach((id) => {
      if (posts[id].action === CrudCode.CREATE) delete posts[id]; //불변성 위반
      else {
        posts[id].action = CrudCode.DELETE;
      }
      const filteredData = posts.filter((element) => element !== undefined);
      //여기까지는 랜더링이 안됨
      setPosts(filteredData);
    });
    */
  };

  return (
    <>
      <BasicButton onClick={handleDeleteCheckedPost}>Delete Checked Posts</BasicButton>
      <BasicButton onClick={handleAddPost}>Add Post</BasicButton>
      {posts &&
        posts.map((post: FeedPost, postIndex: number) => {
          return (
            <Div key={postIndex}>
              <BasicButton
                onClick={() => {
                  handleDeletePostClick(postIndex);
                }}
              >
                Delete
              </BasicButton>
              <Span>{post.action}</Span>
              <Span>{post.content}</Span>
              <BasicButton
                onClick={() => {
                  handleAddCommentClick(postIndex);
                }}
              >
                Add Comment
              </BasicButton>
              {post.comments.map((comment: Comment, commentIndex: number) => {
                return (
                  <Div key={commentIndex}>
                    <Span>{comment.action}</Span>
                    <Span>{comment.content}</Span>
                    <BasicButton
                      onClick={() => {
                        handleDeleteCommentClick(postIndex, commentIndex);
                      }}
                    >
                      Delete
                    </BasicButton>
                  </Div>
                );
              })}
            </Div>
          );
        })}
    </>
  );
};
export default FeedPage;

const Span = styled.span`
  margin: 10px;
`;
const Div = styled.div`
  margin: 10px;
  border: 1px solid black;
`;
