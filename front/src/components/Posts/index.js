import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import Post from 'src/components/Post';

import './styles.scss';

const Posts = ({ zenStatus, posts }) => {
  const cssClass = classNames('posts', { 'posts--zenMode': zenStatus });
  return (

    <main className={cssClass}>
      <h1 className="posts-title">Simple Blog</h1>
      <div className="posts-list">
        {posts.map((post) => (
          <Post
            key={post.id}
            {...post}
          />
        ))}
      </div>
    </main>

  );
};

Posts.propTypes = {
  zenStatus: PropTypes.bool.isRequired,
  posts: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
  })).isRequired,
};

export default Posts;
