import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { NavLink } from 'react-router-dom';
// import Footer from '../Footer';
import "./Splash.css"

const Splash = () => {

    const user = useSelector(state => state.session.user)
    const history = useHistory()
    const [isDisplayed, setIsDisplayed] = useState(false);

    const closeAll = (e) => {
        setIsDisplayed(!isDisplayed);
    }

    return (
        <>
            <nav className="splash-nav-container">
                <div className="splash-nav-logo" onClick={closeAll}>⛽<span className="splash-temp-title">Remember The Gas</span></div>
                <div className="splash-user-container">
                    <button className="splash-login splash-button" onClick={() => history.push("/login")}>Login</button>
                    <button className="splash-signup splash-button" onClick={() => history.push("/sign-up")}> Sign-up</button>
                </div>
                {!user && isDisplayed &&
                    <>
                        <div className="nav-links-container">
                            <NavLink to="/" className="nav-logo" onClick={closeAll}>
                                {/* <img className="nav-logo" src="/images/dftg-logo.png" alt="Remember The Gas Logo. The logo is an image of a red jerry can, or gas can, pouring out a green checkmark" /> */}
                                <div className="nav-logo"><span role="img" aria-label="Remember the gas logo">⛽</span></div>
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
            </nav>
            <article className="splash-container">
                <div className="feature-carousel">
                    <div className="splash-item-container">
                        <img className="splash-image image1" src="https://rigforceglobal.com/wp-content/uploads/2015/09/38294992_thumbnail2-520x520.jpg" />
                        <div className="splash-feature-container">
                            <h2 className="splash-feature-title">Keep your lists in one place!</h2>
                            <p className="splash-feature-description">Manage your todo lists, favorites list, important dates and more in one place.</p>
                        </div>
                    </div>
                    <div className="splash-item-container">
                        <div className="splash-feature-container">
                            <h2 className="splash-feature-title">Forget No more!</h2>
                            <p className="splash-feature-description">Don't fret, get notified about what's due before the deadline.</p>
                        </div>
                        <img className="splash-image image2" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBCpLs_oexY9jfBpOL4_TT6cuOg-B-sEjXYoaT3zJmWzPRlsZa9oXa5ZxpemUnx_6opjI&usqp=CAU" />
                    </div>
                    <div className="splash-item-container">
                        <img className="splash-image image3" src="https://startupnation.com/wp-content/uploads/2018/04/Screen-Shot-2018-04-19-at-1.30.18-PM.png" />
                        <div className="splash-feature-container">
                            <h2 className="splash-feature-title">Share with a friend or coworker</h2>
                            <p className="splash-feature-description">Too busy? That's ok, you can share your list with a friend or coworker to lighten the load.</p>
                        </div>
                    </div>
                </div>
            </article>
            {/* <Footer /> */}
        </>
    )
}

export default Splash;