import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import './Header.css';

function Header() {
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem('userId');
    navigate(`/`);
  }
  return (
    <header>
      <nav>
        <ul>
          <li>
            <NavLink to="/" exact={true ? "true" : undefined} customprop="activeClassName">
              Home
            </NavLink>
          </li>
          <li>
            {userId ? (
              <NavLink to={`/dashboard/${userId}`} exact={true ? "true" : undefined} customprop="activeClassName">
                Dashboard
              </NavLink>
            ) : (
              <NavLink to="/form-page" exact={true ? "true" : undefined} customprop="activeClassName">
                Registration
              </NavLink>
            )}
          </li>
          <li>
            <NavLink to="/leave-form" exact={true ? "true" : undefined} customprop="activeClassName">
              Leave From
            </NavLink>
          </li>
          <li>
            {userId && (
              <button onClick={logout}>Logout</button>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;