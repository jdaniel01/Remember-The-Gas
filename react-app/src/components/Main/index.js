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
    const [showFilters, setShowFilters] = useState(false)
    const [filter, setFilter] = useState("priority")
    const [shownType, setShownType] = useState("todo")

    const todoStyle = () => {
        if (shownType === "todo") {
            return {
                borderBottom: "1px solid whitesmoke",
                borderTop: "1px dotted lightgrey",
                borderLeft: "1px dotted lightgrey",
                borderRight: "1px dotted lightgrey"
            }
        } else {
            return {}
        }
    }

    const doneStyle = () => {
        if (shownType === "done") {
            return {
                borderBottom: "1px solid whitesmoke",
                borderTop: "1px dotted lightgrey",
                borderLeft: "1px dotted lightgrey",
                borderRight: "1px dotted lightgrey"
            }
        } else {
            return {}
        }
    }

    const updateIcon = (e) => {
        if (e.target.innerText === "◁") {
            setIcon("—")
        }
        else {
            setIcon("◁")
        }
    }

    // useEffect(() => {
    //     if (shownType === "todo") {

    //     }
    // }, [shownType])


    // const feature = () => {
    //     if (showing === "list") {
    //         if (alist && title !== alist.name) {
    //             setTitle(alist.name)
    //         }
    //     }
    //     else if (showing === "allTasks") {
    //         if (allTasks && title !== allTasks.name) {
    //             setTitle("All Tasks")
    //         }
    //     }
    //     else if (showing === "contact") {
    //     }
    //     else if (showing === "contacts") {
    //     }
    // }

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
                        <div className="tasks-detail">tasks</div>
                        </div>
                        <div className="task-detail-container">
                            <div className="tasks-total">{0}</div>
                            <div className="tasks-detail">completed</div>
                        </div>
                    </div>
                }
                <div className="tasks-container">
                    <div className="options-container">
                        <div className="print-button task-option">🖨</div>
                        <div className="unfinished-tab task-option" style={todoStyle()} onClick={() => setShownType("todo")}>Unfinished</div>
                        <div className="finished-tab task-option" style={doneStyle()} onClick={() => setShownType("done")}>Finished</div>
                        <div className="filter-button task-option" onClick={() => setShowFilters(!showFilters)}>🗃
                            {showFilters &&
                                <div className="tasks-filter-container">
                                    <div className="checker-container">
                                        <div className="checker">{filter === "name" ? "✔" : null}</div>
                                        <div className="checker">{filter === "due" ? "✔" : null}</div>
                                        <div className="checker">{filter === "priority" ? "✔" : null}</div>
                                    </div>
                                    <div className="task-filters">
                                        <div className="filter" onClick={() => setFilter("name")}>Task Name</div>
                                        <div className="filter" onClick={() => setFilter("due")}>Due Date</div>
                                        <div className="filter" onClick={() => setFilter("priority")}>Priority</div>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                    <div className="bulk-actions-container">
                        <div className="bulk-button-container">
                            <button className="bulk-button">▢▾</button>
                        </div>
                        <div className="bulk-button-container">
                            <button className="bulk-button">•••▾</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Main;