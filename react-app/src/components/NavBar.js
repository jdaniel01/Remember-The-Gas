import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';
import { authenticate } from '../store/session';
import LogoutButton from './auth/LogoutButton';
import "./index.css"
// import "./auth/user-forms.css"

const NavBar = ({ showSettings, setShowSettings }) => {
  //get current location  href and if it is equal to /login or /sign-up do not display navbar.
  const user = useSelector(state => state.session.user)

  const [isDisplayed, setIsDisplayed] = useState(false)
  const [tasksShowing, setTasksShowing] = useState(false)
  const [listsShowing, setListsShowing] = useState(false)
  const [contactsShowing, setContactsShowing] = useState(false)
  const [searchValue, setSearchValue] = useState("")


  const updateDisplay = () => {
    if (user) {
      setShowSettings(false);
    }
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

  const updateSearchValue = (e) => {
    e.preventDefault()
    setSearchValue(e.target.value)
  }

  const updateSettings = () => {
    setIsDisplayed(false)
    if (user) {
      setShowSettings(!showSettings);
    }
  }

  const closeAll = () => {
    setIsDisplayed(false)
    if (user) {
      setShowSettings(false)
    }
  }

    return (
      <nav className="nav-container">
        <div className="burger-bar" >
          <img className="burger-img" src="/images/hamburger-bar.png" onClick={updateDisplay} />
          {user && isDisplayed &&
            <>
            <div className="nav-links-container" >
              <NavLink to="/" className="nav-logo">
                <img className="nav-logo" src="/images/dftg-logo.png" alt="Remember The Gas Logo. The logo is an image of a red jerry can, or gas can, pouring out a green checkmark" />
              </NavLink>
              <div className="tasks-container burger-item">
                <div className="upcoming-tasks" onClick={updateTasksShowing}>Upcoming Tasks</div>
                {tasksShowing &&
                  <>
                    <div className="tasks-list">
                      <div className="tasks">All Tasks<span>{0}</span></div>
                      <div className="tasks">Recieved<span>{0}</span></div>
                      <div className="tasks">Today<span>{0}</span></div>
                      <div className="tasks">Tomorrow<span>{0}</span></div>
                      <div className="tasks">This Week<span>{0}</span></div>
                      <div className="tasks">Given Tasks<span>{0}</span></div>
                      <div className="tasks">Trash<span>{0}</span></div>
                    </div>
                  </>
                }
              </div>
              <div className="lists-container burger-item" >
                <div className="lists" onClick={updateListsShowing}>Lists</div>
                {listsShowing &&
                  <div className="lists-list">
                    <div className="list">Personal<span>🔽</span></div>
                    <div className="list">Work<span>🔽</span></div>
                    {/* {userLists && listsShowing && userLists.map(list =>
                    <>
                      <div className="list">{list.name}<span>{Object.keys(list.tasks).length}</span></div>
                    </>
                  )} */}
                  </div>
                }
              </div>
              <div className="contacts-container burger-item" >
                <div className="contacts" onClick={updateContactsShowing}>Contacts</div>
                {/* {userContacts && contactsShowing &&
                <div className="contacts-list">
                  {userContacts.map(contact => 
                  <div className="contact">{contact.username}</div>
                )}
                </div>
                } */}
                </div>
              </div>
            </>
          }
          {!user && isDisplayed &&
            <>
              <div className="nav-links-container">
              <NavLink to="/" className="nav-logo" onClick={closeAll}>
                  <img className="nav-logo" src="/images/dftg-logo.png" alt="Remember The Gas Logo. The logo is an image of a red jerry can, or gas can, pouring out a green checkmark" />
                </NavLink>
              <NavLink className="nav-link" to="/tour" exact={true} activeClassName="active" onClick={closeAll}>
                  Tour
                </NavLink>
              <NavLink className="nav-link" to="/about" exact={true} activeClassName="active" onClick={closeAll}>
                  About
                </NavLink>
              <NavLink className="nav-link" to="/sign-up" exact={true} activeClassName="active" onClick={closeAll}>
                  Sign-up
                </NavLink>
              <NavLink className="nav-link" to="/login" exact={true} activeClassName="active" onClick={closeAll}>
                  Login
                </NavLink>
              </div>
            </>
          }
        </div>
        <div className="search-container">
          <img src="/images/search-icon.png" alt="search icon. a simple light grey icon of a magnifying glass." />
          <input className="search-input" type="search" name="searchInput" placeholder="Search" value={searchValue} onChange={updateSearchValue} />
        </div>
        {user &&
          <div className="user-block">
          <div className="notification-container">
            <img src="/images/notification-bell.png" alt={`notification icon. A simple light grey icon of a bell. current notifications: ${0}`} />
            <div className="notification-count-container">
              <span className="count-container">{0}</span>
            </div>
          </div>

          <div className="settings-container">
            <img src="/images/settings-cog.png" alt="cog icon. A simple light grey icon of a cogwheel. opens settings menu below." onClick={updateSettings} />
            {showSettings &&
              <>
                <div className="user-settings">
                  <div className="user-info-container">
                    <div className="user-info">{user.photo}</div>
                    <div className="user-details-container">
                      <h2 className="user-details">{user.username}</h2>
                      <h3 className="user-details">{user.email}</h3>
                    </div>
                  </div>
                <NavLink className="user-link" to={`/users/${user.id}`} onClick={closeAll}>
                  Account Settings
                </NavLink>
                <LogoutButton />
                </div>
              </>
            }
          </div>
        </div>
        }
      </nav>
    );
}

export default NavBar;
