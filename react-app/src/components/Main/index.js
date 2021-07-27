import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getList } from '../../store/list';
import "./Main.css";

const Main = ({ showing, setShowing }) => {

    const dispatch = useDispatch()
    const lists = useSelector(state => state.list.lists)
    const alist = useSelector(state => state.list.list)
    // const allTasks = useSelector(state => state.tasks)
    const [title, setTitle] = useState("All Tasks")
    const [icon, setIcon] = useState("◁")
    const updateIcon = (e) => {
        if (e.target.innerText === "◁") {
            setIcon("—")
        }
        else {
            setIcon("◁")
        }
    }

    const feature = () => {
        if (showing === "list") {
            if (alist && title !== alist.name) {
                setTitle(alist.name)
            }
        }
        // else if (showing === "allTasks") {
        //     if (allTasks && title !== allTasks.name) {
        //         setTitle("All Tasks")
        //     }
        // }
        // else if (showing === "contact") {
        // }
        // else if (showing === "contacts") {
        // }
    }

    // useEffect(() => {
    //     if (showing === "list") {
    //         dispatch(getList(alist.id))
    //         setTitle(alist.name)
    //     }
    // }, [dispatch, showing])

    return (
        <>
            <div className="main-container">
                <div className="title-container">
                    <div className="header-title">{title}  <span className="quick-task-icon" onClick={updateIcon}>{icon}</span></div>
                    <div className="title-options-container">
                        <button className="share-button">🤝+</button>
                    </div>
                </div>
                {icon === "—" &&
                    <div className="tasks-status-container">
                        <div className="task-detail-container">
                            <div className="tasks-total">{0}</div>
                            <div className="tasks-detail">completed</div>
                        </div>
                        <div className="task-detail-container">
                            <div className="tasks-total">{0}</div>
                            <div className="tasks-detail">completed</div>
                        </div>
                    </div>
                }
                <div className="options-container">

                </div>
                {feature()}
            </div>
        </>
    )
}

export default Main;