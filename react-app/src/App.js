import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
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

function App() {

  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);
  const location = window.location.pathname

  const user = useSelector(state => state.session.user)
  const [showSettings, setShowSettings] = useState(false)


  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, []);

  if (!loaded) {
    return null;
  }

  // const navigation = () => {

  // }

  return (
    <BrowserRouter>
      {location !== "/login" && location !== "/sign-up" &&
        <NavBar showSettings={showSettings} setShowSettings={setShowSettings} />
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
        {user ?
          <ProtectedRoute path="/" exact={true} >
            <Main />
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
