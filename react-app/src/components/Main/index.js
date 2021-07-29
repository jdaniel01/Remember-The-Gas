import React, { createElement, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getList, addTask } from '../../store/list';
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
    const [showBulkSelect, setShowBulkSelect] = useState(false);
    const [showBulkActions, setShowBulkActions] = useState(false);
    const [taskInfo, setTaskInfo] = useState("");
    const [errors, setErrors] = useState([])
    const [showTaskButton, setShowTaskButton] = useState(false)



    useEffect(() => {
        if (showing === "list") {
            if (alist.name && title !== alist.name) {
                setTitle(alist.name)
            }
        }
        if (showing === "All Tasks") {
            if (title !== "All Tasks") {
                setTitle("All Tasks")
            }
        }
    }, [dispatch, showing, alist])

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

    const submitTask = async (e) => {
        e.preventDefault()
        console.log("#########SUBMITTING Task#######", alist.id, taskInfo)
        //TODO: Add task, store, route, link store and link forms
        const data = await dispatch(addTask(alist.id, taskInfo))
        if (data.errors) {
            setErrors(data.errors)
        }
        else {
            setErrors([])
            setTaskInfo("")
        }

    }

    useEffect(() => {
        const errs = []
        if (taskInfo.length < 1) {
            errs.push("Your task must have a name.")
        }
        setErrors(errs);
    }, [taskInfo])

    // useEffect(() => {
    //     if (shownType === "todo") {

    //     }
    // }, [shownType])
    const lines = () => {
        return (
            <>
                <div className="empty-line"></div>
                <div className="empty-line"></div>
                <div className="empty-line"></div>
                <div className="empty-line"></div>
                <div className="empty-line"></div>
                <div className="empty-line"></div>
                <div className="empty-line"></div>
                <div className="empty-line"></div>
                <div className="empty-line"></div>
                <div className="empty-line"></div>
                <div className="empty-line"></div>
                <div className="empty-line"></div>
                <div className="empty-line"></div>
                <div className="empty-line"></div>
                <div className="empty-line"></div>
                <div className="empty-line"></div>
                <div className="empty-line"></div>
                <div className="empty-line"></div>
                <div className="empty-line"></div>
                <div className="empty-line"></div>
                <div className="empty-line"></div>
                <div className="empty-line"></div>
                <div className="empty-line"></div>
                <div className="empty-line"></div>
                <div className="empty-line"></div>
            </>
        )

    }

    // const feature = () => {
        // if (showing === "list") {
        //     if (alist && title !== alist.name) {
        //         setTitle(alist.name)
        //     }
        // }
        // else if (showing === "allTasks") {
        //     if (allTasks && title !== allTasks.name) {
        //         setTitle("All Tasks")
        //     }
        // }
    //     else if (showing === "contact") {
    //     }
    //     else if (showing === "contacts") {
    //     }
    // }

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
                <div className="list-tasks-container">
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
                            <button className="bulk-button" onClick={() => setShowBulkSelect(!showBulkSelect)}>▢▾</button>
                            {showBulkSelect &&
                                <div className="select-container bulk-container">
                                    <div className="select-option">Select All</div>
                                    <div className="select-option">Select None</div>
                                    <div className="select-option">Due Today</div>
                                    <div className="select-option">Due Tomorrow</div>
                                    <div className="select-option">Overdue</div>
                                </div>
                            }
                        </div>
                        <div className="bulk-button-container">
                            <button className="bulk-button" onClick={() => setShowBulkActions(!showBulkActions)}>•••▾</button>
                            {showBulkActions &&
                                <div className="action-container bulk-container">
                                    <div className="action-option">Update Task(s)</div>
                                    <div className="action-option">Delete Task(s)</div>
                                </div>
                            }
                        </div>
                    </div>
                    {showing === "list" &&
                        <div className="form-container add-task-form-container">
                        <form className="user-form add-task-form" onSubmit={submitTask} >
                            <input type="text" className="form-input task-input" name="name" placeholder="Add a task..." value={taskInfo} onChange={(e) => setTaskInfo(e.target.value)} onFocus={() => setShowTaskButton(true)} onBlur={() => (taskInfo.length < 1) ? setShowTaskButton(false) : null} />
                            <button className="form-button" type="submit" hidden={!showTaskButton}>Add Task</button>
                        </form>
                    </div>
                    }
                    <div className="user-tasks-container">
                        {/* {feature()} */}
                    </div>
                    <div className="empty-lines-container">
                        {lines()}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Main