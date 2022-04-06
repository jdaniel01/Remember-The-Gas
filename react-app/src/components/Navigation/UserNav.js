import React from "react";
// import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Search from "../Search/Search";
import { toggleBurger } from "../../store/menu";
import "./navigation.css";


const UserNav = () => {

    const currList = useSelector(state => state.list.list)
    const burgerOpen = useSelector(state => state.menu.burger.open);

    const dispatch = useDispatch();

    console.log(currList);

    return (
        <div className="user-menu-bar">
            <div className="burger-menu" onClick={()=>dispatch(toggleBurger(!burgerOpen))}>
                <div className="burger-button">
                    <img className="burger-icon" src="images/burger_bar.png" alt="the hamburger (or 'burger') bar"/>
                    <img className="burger-icon-white" src="images/burger_bar_white.png" alt="the hamburger (or 'burger') bar"/>
                    <div hidden={burgerOpen} className="burger-text">{currList.name?currList.name:"Menu"}</div>
                </div>
            </div>
            <Search />
        </div>
    )
}


export default UserNav;