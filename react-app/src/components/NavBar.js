import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { authenticate } from '../store/session';
import LogoutButton from './auth/LogoutButton';
import "./index.css"

const NavBar = () => {
  //get current location  href and if it is equal to /login or /sign-up do not display navbar.
  const user = useSelector(state => state.session.user)

  return (
    <nav>
      <div className="container">
        <img className="rtg_logo" src="images/dftg-logo.png" alt="Remember The Gas Logo. The logo is an image of a red jerry can, or gas can, pouring out a green checkmark" />
        {!user &&
          <>
            <div>
            <NavLink className="nav-link" to="/" exact={true} activeClassName="active">
              Tour
            </NavLink>
          </div>
          <div>
            <NavLink className="nav-link" to="/about" exact={true} activeClassName="active">
              About
            </NavLink>
          </div>
          <div>
            <NavLink className="nav-link" to="/login" exact={true} activeClassName="active">
              Login
            </NavLink>
          </div>
          <div>
            <NavLink className="nav-link" to="/sign-up" exact={true} activeClassName="active">
              Sign Up
            </NavLink>
            </div>
          </>
        }
        {user &&
          <>
            <div>
            <NavLink className="nav-link" to="/" exact={true} activeClassName="active">
              Main
            </NavLink>
          </div>
          <div>
            <NavLink className="nav-link" to="/" exact={true} activeClassName="active">
              Main
            </NavLink>
          </div>
          <div>
            <LogoutButton />
            </div>
          </>
        }
      </div>
    </nav>
  );
}

export default NavBar;
