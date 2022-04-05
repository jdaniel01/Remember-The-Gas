import React, { useState, useEffect } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "./components/Navigation/Navbar";
import UserNav from "./components/Navigation/UserNav";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/UsersList";
import User from "./components/User";
import Splash from "./components/Splash/Splash";
import About from './components/About';
import AuthPage from "./components/auth/AuthPage";
import ForgotPassword from "./components/auth/ForgotPassword";
import Footer from "./components/Footer";
import Dashboard from "./components/Dashboard/Dashboard";
import { authenticate } from "./store/session";
// import Footer from "./components/Footer";

function App() {

  const dispatch = useDispatch();

  const [loaded, setLoaded] = useState(false);
  const user = useSelector(state => state.session.user)


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
      {user ? <ProtectedRoute><UserNav /></ProtectedRoute> : <NavBar />}
      <Switch>
        <Route path="/login" exact={true}>
          <AuthPage/>
        </Route>
        <Route path="/sign-up" exact={true}>
          <AuthPage/>
        </Route>
        <Route path="/about" exact={true}>
          <About />
        </Route>
        <Route path="/forgot-password" exact={true}>
          <ForgotPassword />
        </Route>
        {user ?
          <ProtectedRoute path="/" exact={true} >
            <Dashboard/>
          </ProtectedRoute>
          : <Route path="/" exact={true}>
            <Splash />
          </Route>
        }
      </Switch>
      <Footer user={user?true:false}/>
    </BrowserRouter>
  );
}

export default App;



//removed the following routes:

// {/* <ProtectedRoute path="/users" exact={true}>
//           <UsersList/>
//         </ProtectedRoute> */}
//         {/* <ProtectedRoute path="/users/:userId" exact={true}>
//           <User />
//         </ProtectedRoute> */}
//         {/* <ProtectedRoute path="/users/:userId/lists" exact={true}>
//           <ListForm />
//         </ProtectedRoute> */}
//         {/* <ProtectedRoute path="/lists/" exact={true} >
//           <Main showing={showing} setShowing={setShowing} />
//         </ProtectedRoute> */}
// {/* <ProtectedRoute path="/lists/:listId" exact={true}>
//   <Main showing={showing} setShowing={setShowing} setShowingTaskOptions={setShowingTaskOptions} showingTaskOptions={showingTaskOptions} />
// </ProtectedRoute>
// <ProtectedRoute path="/users/:userId/tasks" exact={true}>
//   <Main showing={showing} setShowing={setShowing} setShowingTaskOptions={setShowingTaskOptions} showingTaskOptions={showingTaskOptions} />
// </ProtectedRoute> */}
