// == Import npm
import React from 'react';
import { Link } from 'react-router-dom';

// == Import
import './styles.scss';

// == Composant
const NotFound = () => (
  <div className="not-found">
    404
    <p className="not-found-message">
      Oups, la page n'existe pas (plus?), mais y a pleins d'autres super <Link to="/React">pages</Link>
    </p>
  </div>
);

// == Export
export default NotFound;
