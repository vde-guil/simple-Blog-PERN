import React from 'react';
import PropTypes from 'prop-types';
import DOMPurify from 'dompurify';

import { Link } from 'react-router-dom';

import './styles.scss';

const Post = ({
  category,
  slug,
  title,
  excerpt,
}) => (
  <Link to={ '/post/' + slug } className="post">
    <h2 className="post-title">{title}</h2>
    <div className="post-category">{category}</div>
    <p
      className="post-excerpt"
      dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(excerpt) }}
    />

  </Link>
);

Post.propTypes = {
  category: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  excerpt: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
};

export default Post;
