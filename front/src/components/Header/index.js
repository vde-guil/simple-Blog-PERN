import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import './styles.scss';

const Header = ({
  categories,
  zenStatus,
  updateZenStatus,
}) => (
  <header className="menu">
    <nav>
      {
        categories.map(({ route, label }) => (
          <NavLink
            key={label}
            className="menu-link"
            activeClassName="menu-link--selected"
            to={route}
            exact
          >
            {label}
          </NavLink>
        ))
      }
      <button
        className="menu-btn"
        type="button"
        onClick={() => {
          updateZenStatus(!zenStatus);
        }}
      >
        {!zenStatus ? 'Activer le mode zen' : 'Desactiver le mode zen'}
      </button>
    </nav>
  </header>
);

Header.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      route: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    }),
  ).isRequired,
  zenStatus: PropTypes.bool.isRequired,
  updateZenStatus: PropTypes.func.isRequired,
};

export default Header;
