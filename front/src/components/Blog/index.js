// == Import
import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import axios from 'axios';

// Composants
import Header from 'src/components/Header';
import Posts from 'src/components/Posts';
import Footer from 'src/components/Footer';
import NotFound from 'src/components/NotFound';
import SinglePost from 'src/components/SinglePost';

// data, styles et utilitaires
import { getPostsByCategory } from 'src/utils/selectors';
import './styles.scss';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

// const BASE_URL = 'https://oclock-open-apis.vercel.app/api/blog';
const BASE_URL = 'https://blog-api-vde-guil.herokuapp.com/v1';

// top ten app security risks
// https://owasp.org/www-project-top-ten/

// == Composant
const Blog = () => {
  const [zenMode, setZenMode] = useState(false);

  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [loadingPosts, setLoadingPosts] = useState(true);
  const [loadingCat, setLoadingCat] = useState(true);

  const loadCategories = async () => {
    try {
      const { status, data } = await axios.get(`${BASE_URL}/categories`);
      if (status === 200) {
        setCategories([...data.map((categorie) => ({ ...categorie }))]);
        // setCategories(data);
      }
      else {
        throw new Error(`${status}`);
      }
    }
    catch (error) {
      console.log(error.message);
      // TODO afficher l'erreur cote front
    }
    finally {
      setLoadingCat(false);
    }
  };

  const loadPosts = async () => {
    try {
      const { status, data } = await axios.get(`${BASE_URL}/posts`);
      if (status === 200) {
        setPosts([...data.map((post) => ({ ...post }))]);
        // setPosts(data);
      }
      else {
        throw new Error(`${status}`);
      }
    }
    catch (error) {
      console.log(error.message);
    }
    finally {
      setLoadingPosts(false);
    }
  };

  useEffect(() => {
    loadPosts();
    loadCategories();
  }, []);

  return (

    <div className="blog">
      {!loadingCat
        && (
          <Header
            categories={categories}
            updateZenStatus={setZenMode}
            zenStatus={zenMode}
          />
        )}
      {(loadingPosts || loadingCat)
        && (
          <Loader
            type="Puff"
            style={{ textAlign: 'center' }}
            color="#e52354"
            height={100}
            width={100}
          // timeout={3000} //3 secs
          />
        )}
      {(!loadingPosts && !loadingCat)
        && (
          <Switch>
            {
              categories.map((category) => (
                <Route key={category.route} path={category.route} exact>
                  <Posts posts={getPostsByCategory(category.label, posts)} zenStatus={zenMode} />
                </Route>
              ))
            }

            <Route path="/post/:slug">
              <SinglePost posts={posts} />
            </Route>

            <Redirect from="/Jquery" to="/Autre" />

            <Route>
              <NotFound />
            </Route>

          </Switch>
        )
      }

      <Footer />
    </div>
  );
};

// == Export
export default Blog;
