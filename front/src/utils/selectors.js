// eslint-disable-next-line import/prefer-default-export
export const getPostsByCategory = (category, posts) => {
  if (category === 'Accueil') {
    return posts;
  }
  return posts.filter((post) => post.category === category);
};
