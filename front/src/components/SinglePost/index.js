import React from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

import './styles.scss';

const SinglePost = ({ posts }) => {
  const params = useParams();

  const { slug } = params;
  const result = posts.find(((post) => (post.slug === slug)));

  return (
    <article className="single-post">
      <h2 className="post-title">{result.title}</h2>
      <div className="post-category">{result.category}</div>
      <p className="post-excerpt">{result.content}</p>
    </article>
  );
};

SinglePost.propTypes = {
  posts: PropTypes.array.isRequired,
};

export default SinglePost;
