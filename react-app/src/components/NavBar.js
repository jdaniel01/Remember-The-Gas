import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { getLists, setSingleList, dropList, editName } from "../store/list";
import { getAllTasks } from '../store/task';
import { sortStatus } from "./Main/sort";
import ListForm from './Forms/ListForm';
import LogoutButton from './auth/LogoutButton';
import "./index.css"
// import "./auth/user-forms.css"

const NavBar = ({ showSettings, setShowSettings, setShowing, isDisplayed, setIsDisplayed, setShowingTaskOptions }) => {
  //get current location  href and if it is equal to /login or /sign-up do not display navbar.
  const dispatch = useDispatch();

  const user = useSelector(state => state.session.user)
  const lists = useSelector(state => state.list.lists)
  // const order = useSelector(state => state.list.order)
  const tasks = useSelector(state => state.task)
  // const taskOrders = useSelector(state => state.task.orderBy)

  // const location = window.location.pathname
  const history = useHistory()

  const [editingList, setEditingList] = useState({})
  const [tasksShowing, setTasksShowing] = useState(false)
  const [listsShowing, setListsShowing] = useState(false)
  // const [contactsShowing, setContactsShowing] = useState(false)
  // const [searchValue, setSearchValue] = useState("")
  // const [showListOptions, setShowListOptions] = useState(false);
  const [listOptionsShown, setListOptionsShown] = useState();
  const [showForm, setShowForm] = useState(false)
  const [name, setName] = useState("")
  const [errors, setErrors] = useState([])
  const [showNewListForm, setShowNewListForm] = useState(false);


  useEffect(() => {
    setName(editingList.name)
  }, [editingList])


  useEffect(() => {
    if (user) {
      dispatch(getLists(user.id))
      dispatch(getAllTasks(user.id))

    }
  }, [dispatch, user])



  useEffect(() => {
    const errs = [];

    if (!name) {
      errs.push("Please enter a name for your list.")
    }
    else if (name.length < 4) {
      errs.push("List name must have between 4 and 50 characters.")
    }
    setErrors(errs);
  }, [name])

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


  // const shareList = (e) => {
  //   //TODO: Create Share with Number(e.target.id) and user.id as owner_id or user_id check model
  //   console.log("Sharing is Caring")
  // }

  const updateTasksShowing = () => {
    setTasksShowing(!tasksShowing)
  }

  const updateListsShowing = () => {
    setListsShowing(!listsShowing)
  }

  // const updateContactsShowing = () => {
  //   setContactsShowing(!contactsShowing)
  // }

  // const updateSearchValue = (e) => {
  //   e.preventDefault()
  //   setSearchValue(e.target.value)
  // }

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

  // if (!pathOk) {
  //   return null
  // }
  // else {
    return (
      <nav className="nav-container">
        <div className="burger-bar" >
          {/* <img className="burger-img" src="/images/hamburger-bar.png" onClick={updateDisplay} /> */}
          <div className="burger-img" onClick={() => {
            setIsDisplayed(!isDisplayed)
          }}>≡</div>
          {user && isDisplayed &&
            <>
            <div className="nav-links-container" >
              <NavLink to={`/users/${user.id}/tasks`} className="nav-logo" onClick={closeAll}>
                {/* <img className="nav-logo" src="/images/dftg-logo.png" alt="Remember The Gas Logo. The logo is an image of a red jerry can, or gas can, pouring out a green checkmark" /> */}
                <div className="nav-logo"><span role="img" aria-label="remember the gas logo.">⛽</span></div>
              </NavLink>
              <div className="tasks-container burger-item">
                <div className="upcoming-tasks" onClick={updateTasksShowing}>Upcoming Tasks</div>
                {tasksShowing &&
                  <>
                    <div className="tasks-list">
                    <NavLink to={`/users/${user.id}/tasks`} className="tasks" onClick={() => {
                      setShowing("All Tasks")
                      closeAll()
                    }}>All Tasks <span>{sortStatus(tasks).open.length}</span></NavLink>
                    {/* <div className="tasks">Recieved<span>{0}</span></div>
                      <div className="tasks">Today<span>{0}</span></div>
                      <div className="tasks">Tomorrow<span>{0}</span></div>
                      <div className="tasks">This Week<span>{0}</span></div>
                      <div className="tasks">Given Tasks<span>{0}</span></div>
                      <div className="tasks">Trash<span>{0}</span></div> */}
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
                {listsShowing && lists && lists.map((list, index) =>
                  <div className="lists-list" key={list.id}>
                    {list &&
                      <div className="list-wrapper" key={list.id}>
                        <NavLink to={`/lists/${list.id}`} className="list" key={list.id} id={list.id} onClick={() => {
                          dispatch(setSingleList(list))
                          setShowing("list")
                          setShowingTaskOptions(false)
                          closeAll()
                      }} >{list.name}</NavLink>
                        <div className="list-options-wrapper" >
                        <div className="list-options-button" id={list.id} onClick={updateListOptions}>+</div>
                        {listOptionsShown === list.id &&
                            <div className="list-edit-options" >
                          <button className="list-option" id={list.id} onClick={() => {
                            setEditingList(list)
                            setName(editingList.name)
                                setShowForm(true)
                              }}>Edit List</button>
                          {/* <button className="list-option" id={id} onClick={shareList}>Share List</button> */}
                          <button className="list-option" id={list.id} onClick={() => {
                            setShowing("All Tasks")
                            dispatch(dropList(list.id))
                            setShowingTaskOptions(false)
                            history.push(`/users/${user.id}/tasks`)
                          }
                          }>Delete List</button>
                          </div>
                        }
                      </div>
                      </div>
                    }
                    </div>
                )}

              </div>
              <NavLink to="/about" className="about-link burger-item">About</NavLink>
              {/* <div className="contacts-container burger-item" >
                <div className="contacts" onClick={updateContactsShowing}>Contacts</div>
                {userContacts && contactsShowing &&
                <div className="contacts-list">
                  {userContacts.map(contact => 
                  <div className="contact">{contact.username}</div>
                )}
                </div>
                }
                </div> */}
              </div>
            </>
          }
          {!user && isDisplayed &&
            <>
              <div className="nav-links-container">
              <NavLink to="/" className="nav-logo" onClick={closeAll}>
                {/* <img className="nav-logo" src="/images/dftg-logo.png" alt="Remember The Gas Logo. The logo is an image of a red jerry can, or gas can, pouring out a green checkmark" /> */}
                <div className="nav-logo"><span role="img" aria-label="Remember the gas logo">⛽</span></div>
              </NavLink>
              {/* <NavLink className="nav-link" to="/tour" exact={true} activeClassName="active" onClick={closeAll}>
                  Tour
                </NavLink> */}
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
              <div className="errors-container">
                {errors && errors.map((error) => (
                  <div className="dimmer-errors" key={error}>{error}</div>
                ))}
              </div>
                <form className="form user-form" onSubmit={submitName}>
                  <input className="form-input user-input" name="name" value={name} onChange={(e) => setName(e.target.value)} />
                <button className="submit-button edit-form-button" type="submit" disabled={errors.length > 0}>Update List Name</button>
                <button className="cancel cancel-button edit-form-button" onClick={() => {
                  setShowForm(false)
                  setName("");
                }}>Cancel</button>
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
  // }
}

export default NavBar;
