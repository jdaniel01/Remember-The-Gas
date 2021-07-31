import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';
import { authenticate } from '../store/session';
import { getLists, setSingleList, dropList, editName } from "../store/list";
import { getAllTasks } from '../store/task';
import ListForm from './Forms/ListForm';
import LogoutButton from './auth/LogoutButton';
import "./index.css"
// import "./auth/user-forms.css"

const NavBar = ({ showSettings, setShowSettings, setShowing, isDisplayed, setIsDisplayed }) => {
  //get current location  href and if it is equal to /login or /sign-up do not display navbar.
  const dispatch = useDispatch();

  const user = useSelector(state => state.session.user)
  const lists = useSelector(state => state.list.lists)
  const order = useSelector(state => state.list.order)
  const tasks = useSelector(state => state.task.tasks)
  const taskOrders = useSelector(state => state.task.orderBy)

  const location = window.location.pathname

  const [editingList, setEditingList] = useState({})
  const [tasksShowing, setTasksShowing] = useState(false)
  const [listsShowing, setListsShowing] = useState(false)
  const [contactsShowing, setContactsShowing] = useState(false)
  const [searchValue, setSearchValue] = useState("")
  const [showListOptions, setShowListOptions] = useState(false);
  const [listOptionsShown, setListOptionsShown] = useState();
  const [showForm, setShowForm] = useState(false)
  const [name, setName] = useState(editingList.name)
  const [errors, setErrors] = useState([])
  const [showNewListForm, setShowNewListForm] = useState(false);
  const [pathOk, setPathOk] = useState(true);

  useEffect(() => {
    console.log(location, typeof location)
    if (location === "/login" || location === "/sign-up") {
      setPathOk(false)
    }
    else {
      setPathOk(true)
    }
  }, [location])

  useEffect(() => {
    setName(editingList.name)
  }, [editingList])


  useEffect(() => {
    if (user) {
      dispatch(getLists(user.id))
      dispatch(getAllTasks(user.id))
    }
  }, [dispatch])

  const updateDisplay = () => {
    if (user) {
      setShowSettings(false);
    }
    setIsDisplayed(!isDisplayed)
  }

  const updateListOptions = (e) => {
    if (listOptionsShown !== Number(e.target.id)) {
      setListOptionsShown(Number(e.target.id))
    }
    else {
      setListOptionsShown()
    }

  }
  const submitName = (e) => {
    e.preventDefault()
    if (errors.length === 0) {
      dispatch(editName(editingList.id, name))
      setShowForm(false)
    }
  }

  const shareList = (e) => {
    //TODO: Create Share with Number(e.target.id) and user.id as owner_id or user_id check model
    console.log("Sharing is Caring")
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

  if (!pathOk) {
    return null
  }
  else {
    return (
      <nav className="nav-container">
        <div className="burger-bar" >
          {/* <img className="burger-img" src="/images/hamburger-bar.png" onClick={updateDisplay} /> */}
          <div className="burger-img" onClick={updateDisplay}>≡</div>
          {user && isDisplayed &&
            <>
            <div className="nav-links-container" >
              <NavLink to={`/users/${user.id}/tasks`} className="nav-logo">
                {/* <img className="nav-logo" src="/images/dftg-logo.png" alt="Remember The Gas Logo. The logo is an image of a red jerry can, or gas can, pouring out a green checkmark" /> */}
                <div className="nav-logo">⛽</div>
              </NavLink>
              <div className="tasks-container burger-item">
                <div className="upcoming-tasks" onClick={updateTasksShowing}>Upcoming Tasks</div>
                {tasksShowing &&
                  <>
                    <div className="tasks-list">
                    <NavLink to={`/users/${user.id}/tasks`} className="tasks" onClick={() => {
                      setShowing("All Tasks")
                      closeAll()
                    }}>All Tasks<span>{taskOrders.created.length}</span></NavLink>
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
                <div className="lists">
                  <div className="lists-title" onClick={updateListsShowing}>Lists</div>
                  {/* <NavLink to={`/users/${user.id}/lists`} className="add-list-icon">+</NavLink> */}
                  <div className="add-list-icon" onClick={() => setShowNewListForm(true)}>+</div>
                </div>
                  {listsShowing &&
                    <div className="lists-list">
                  {lists && order && order.map(id =>
                    <div className="list-wrapper" key={id}>
                      <NavLink to={`/lists/${id}`} className="list" key={id} id={id} onClick={() => {
                        dispatch(setSingleList(lists[id]))
                        setShowing("list")
                        closeAll()
                      }} >{lists[id].name}</NavLink>
                      <div className="list-options-wrapper" >
                        <div className="list-options-button" id={id} onClick={updateListOptions}>+</div>
                        {listOptionsShown === id &&
                          <div className="list-edit-options" >
                          <button className="list-option" id={id} onClick={() => {
                            setEditingList(lists[id])
                            setShowForm(true)
                          }}>Edit List</button>
                          <button className="list-option" id={id} onClick={shareList}>Share List</button>
                          <button className="list-option" id={id} onClick={() => {
                            console.log(typeof id, id)
                            dispatch(dropList(id))
                          }
                          }>Delete List</button>
                          </div>
                        }
                      </div>
                    </div>
                  )}
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
                {/* <img className="nav-logo" src="/images/dftg-logo.png" alt="Remember The Gas Logo. The logo is an image of a red jerry can, or gas can, pouring out a green checkmark" /> */}
                <div className="nav-logo">⛽</div>
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
        {/* <div className="search-container">
          <img src="/images/search-icon.png" alt="search icon. a simple light grey icon of a magnifying glass." />
          <div className="search-icon">🔍</div>
          <input className="search-input" type="search" name="searchInput" placeholder="Search" value={searchValue} onChange={updateSearchValue} />
        </div> */}
        {user &&
          <div className="user-block">
          {/* <div className="notification-container">
            <img src="/images/notification-bell.png" alt={`notification icon. A simple light grey icon of a bell. current notifications: ${0}`} />
            <div className="notification-icon">🔔</div>
            <div className="notification-count-container">
              <span className="count-container">{0}</span>
            </div>
          </div> */}

          <div className="settings-container">
            {/* <img className="settings-icon" src="http://simpleicon.com/wp-content/uploads/user1.png" alt="user icon. redirects to Account Settings." onClick={updateSettings} /> */}
            <div className="settings-icon" onClick={updateSettings}>⚙</div>
            {showSettings &&
              <>
                <div className="user-settings">
                  <div className="user-info-container">
                  <img className="user-image" src="http://simpleicon.com/wp-content/uploads/user1.png" alt="user icon. redirects to Account Settings." onClick={updateSettings} />
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
        {showForm && editingList &&
          <>
            <div className="dimmer">
              <div className="name-form-container">
                <div className="name-form-header-container">
                  <h3 className="name-form-header">Rename List</h3>
                  <div className="exit" onClick={() => setShowForm(false)}>×</div>
                </div>
                <form className="form user-form" onSubmit={submitName}>
                  <input className="form-input user-input" name="name" value={name} onChange={(e) => setName(e.target.value)} />
                  <button type="submit-button form-button">Update List Name</button>
                </form>
              </div>
            </div>
          </>
        }
        {showNewListForm &&
          <ListForm setShowNewListForm={setShowNewListForm} setShowing={setShowing} setIsDisplayed={setIsDisplayed} />
        }
      </nav>
    );
  }
}

export default NavBar;
