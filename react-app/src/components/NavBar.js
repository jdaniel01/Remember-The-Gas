import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { authenticate } from '../store/session';
import LogoutButton from './auth/LogoutButton';
import "./index.css"

const NavBar = () => {
  const user = useSelector(state => state.session.user)

  return (
    <nav>
      <div>
        <img className="rtg_logo" src="dftg-logo.png" alt="Remember The Gas Logo. The logo is an image of a red jerry can, or gas can, pouring out a green checkmark" />
        {!user &&
          <>
            <div>
              <NavLink to="/" exact={true} activeClassName="active">
              Main
            </NavLink>
          </div>
          <div>
            <NavLink to="/about" exact={true} activeClassName="active">
              About
            </NavLink>
          </div>
          <div>
            <NavLink to="/login" exact={true} activeClassName="active">
              Login
            </NavLink>
          </div>
          <div>
            <NavLink to="/sign-up" exact={true} activeClassName="active">
              Sign Up
            </NavLink>
            </div>
          </>
        }
        {user &&
          <>
            <div>
              <NavLink to="/users" exact={true} activeClassName="active">
                Users
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
