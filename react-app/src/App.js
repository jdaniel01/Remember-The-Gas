import React, { useState, useEffect } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/UsersList";
import User from "./components/User";
import Splash from "./components/Splash";
import Main from './components/Main';
import { authenticate } from "./store/session";
import ListForm from "./components/Forms/ListForm";

function App() {

  const dispatch = useDispatch();

  const [loaded, setLoaded] = useState(false);
  let location = window.location.pathname

  const user = useSelector(state => state.session.user)
  const [showSettings, setShowSettings] = useState(false)
  const [showing, setShowing] = useState("All Tasks")
  const [isDisplayed, setIsDisplayed] = useState(false)
  const [pathOk, setPathOk] = useState(true)

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, []);

  if (!loaded) {
    return null;
  }

  // useEffect(() => {
  //   if (location !== "/login" && location !== "/sign-up")
  // }, [location])

  return (
    <BrowserRouter>
      {location !== "/login" && location !== "/sign-up" ?
        <NavBar showSettings={showSettings} setShowSettings={setShowSettings} setShowing={setShowing} isDisplayed={isDisplayed} setIsDisplayed={setIsDisplayed} /> : null
      }
      <Switch>
        <Route path="/login" exact={true}>
          <LoginForm />
        </Route>
        <Route path="/sign-up" exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path="/users" exact={true}>
          <UsersList/>
        </ProtectedRoute>
        <ProtectedRoute path="/users/:userId" exact={true}>
          <User />
        </ProtectedRoute>
        {/* <ProtectedRoute path="/users/:userId/lists" exact={true}>
          <ListForm />
        </ProtectedRoute> */}
        {/* <ProtectedRoute path="/lists/" exact={true} >
          <Main showing={showing} setShowing={setShowing} />
        </ProtectedRoute> */}
        <ProtectedRoute path="/lists/:listId" exact={true}>
          <Main showing={showing} setShowing={setShowing} />
        </ProtectedRoute>
        <ProtectedRoute path="/users/:userId/tasks" exact={true}>
          <Main showing={showing} setShowing={setShowing} />
        </ProtectedRoute>
        {user ?
          <ProtectedRoute path="/" exact={true} >
            <Main showing={showing} setShowing={setShowing} />
          </ProtectedRoute>
          : <Route path="/" exact={true}>
            <Splash />
          </Route>
        }
      </Switch>
    </BrowserRouter>
  );
}

export default App;
