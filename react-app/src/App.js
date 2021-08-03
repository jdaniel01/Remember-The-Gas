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
import About from './components/About';
import { authenticate } from "./store/session";
// import Footer from "./components/Footer";

function App() {

  const dispatch = useDispatch();

  const [loaded, setLoaded] = useState(false);
  let location = window.location.pathname

  const user = useSelector(state => state.session.user)
  const [showSettings, setShowSettings] = useState(false)
  const [showing, setShowing] = useState("All Tasks")
  const [isDisplayed, setIsDisplayed] = useState(false)
  const [pathOk, setPathOk] = useState(true)
  const [showingTaskOptions, setShowingTaskOptions] = useState(false);


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
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, []);


  if (!loaded) {
    return null;
  }



  return (
    <BrowserRouter>
      {user &&
        <NavBar showSettings={showSettings} setShowSettings={setShowSettings} setShowing={setShowing} isDisplayed={isDisplayed} setIsDisplayed={setIsDisplayed} setShowingTaskOptions={setShowingTaskOptions} />
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
          <Main showing={showing} setShowing={setShowing} setShowingTaskOptions={setShowingTaskOptions} showingTaskOptions={showingTaskOptions} />
        </ProtectedRoute>
        <ProtectedRoute path="/users/:userId/tasks" exact={true}>
          <Main showing={showing} setShowing={setShowing} setShowingTaskOptions={setShowingTaskOptions} showingTaskOptions={showingTaskOptions} />
        </ProtectedRoute>
        {user ?
          <ProtectedRoute path="/" exact={true} >
            <Main showing={showing} setShowing={setShowing} setShowingTaskOptions={setShowingTaskOptions} showingTaskOptions={showingTaskOptions} />
          </ProtectedRoute>
          : <Route path="/" exact={true}>
            <Splash />
          </Route>
        }
        <Route path="/about" exact={true}>
          <About />
        </Route>
        {/* {user &&
          <Footer />
        } */}
      </Switch>
    </BrowserRouter>
  );
}

export default App;
