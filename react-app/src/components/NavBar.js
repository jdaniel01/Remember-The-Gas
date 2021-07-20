import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';
import { authenticate } from '../store/session';
import LogoutButton from './auth/LogoutButton';
import "./index.css"
// import "./auth/user-forms.css"

const NavBar = () => {
  //get current location  href and if it is equal to /login or /sign-up do not display navbar.
  const user = useSelector(state => state.session.user)
  let location = window.location.pathname;

  const [pathOk, setPathOk] = useState(true);
  const [isDisplayed, setIsDisplayed] = useState(false)
  const [tasksShowing, setTasksShowing] = useState(false)
  const [listsShowing, setListsShowing] = useState(false)
  const [contactsShowing, setContactsShowing] = useState(false)

  useEffect(() => {
    console.log(location)
    if (location === "/login" || location === "sign-up") {
      setPathOk(false)
    } else {
      setPathOk(true)
    }
  }, [location])

  const updateDisplay = () => {
    setIsDisplayed(!isDisplayed)
  }

  const updateTasksShowing = () => {
    setTasksShowing(!tasksShowing)
  }

  const updateListsShowing = () => {
    setListsShowing(!listsShowing)
  }

  const updateContactsShowing = () => {
    setContactsShowing(!contactsShowing)
  }

  return (
    <nav className="container">
      <div className="burger-bar" onClick={updateDisplay}><img src="/images/hamburger-bar.png" />
        {user && isDisplayed &&
            <>
          <div className="nav-links-container">
            <NavLink to="/" className="nav-logo">
              <img className="nav-logo" src="/images/dftg-logo.png" alt="Remember The Gas Logo. The logo is an image of a red jerry can, or gas can, pouring out a green checkmark" />
            </NavLink>
            <div className="tasks-container" onClick={updateTasksShowing} value="All Tasks">
              {tasksShowing &&
                <>
                <div className="tasks">All Tasks<span>{0}</span></div>
                <div className="tasks">Recieved<span>{0}</span></div>
                <div className="tasks">Today<span>{0}</span></div>
                <div className="tasks">Tomorrow<span>{0}</span></div>
                <div className="tasks">This Week<span>{0}</span></div>
                <div className="tasks">Given Tasks<span>{0}</span></div>
                <div className="tasks">Trash<span>{0}</span></div>
                </>
              }
            </div>
            <div className="lists-container"> Lists
              <div className="list">Personal<span>🔽</span></div>
              <div className="list">Work<span>🔽</span></div>
              {/* {userLists && listsShowing && userLists.map(list =>
                <>
                  <div className="list">{list.name}<span>{Object.keys(list.tasks).length}</span></div>
                </>
              )} */}
            </div>
            <div className="contacts-container" onClick={updateContactsShowing}>
              {/* {userContacts && contactsShowing && userContacts.map(contact => {
                  <div>{contact.username}</div>
                })} */}
            </div>
          </div>
              <div>
                <NavLink className="nav-link" to="/tour" exact={true} activeClassName="active">
                  Tour
                </NavLink>
              </div>
              <div>
                <NavLink className="nav-link" to="/about" exact={true} activeClassName="active">
                  About
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
