import React, { createElement, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useHistory, useParams } from 'react-router-dom';
import { getList, addTask } from '../../store/list';
import { getAllTasks, changeTaskName, deleteTask } from '../../store/task';
import "./Main.css";

const Main = ({ showing, setShowing }) => {

    const dispatch = useDispatch()
    const history = useHistory()
    const { listId } = useParams()

    const user = useSelector(state => state.session.user)
    const lists = useSelector(state => state.list.lists)
    const alist = useSelector(state => state.list.list)
    const allTasks = useSelector(state => state.task.tasks)
    const tasksOrder = useSelector(state => state.task.orderBy)


    const [title, setTitle] = useState("All Tasks")
    const [icon, setIcon] = useState("◁")
    const [showFilters, setShowFilters] = useState(false)
    const [filter, setFilter] = useState("created")//"created", "due_date", "status"
    const [shownType, setShownType] = useState("todo")//"finished"
    const [showBulkSelect, setShowBulkSelect] = useState(false);
    const [showBulkActions, setShowBulkActions] = useState(false);
    const [taskInfo, setTaskInfo] = useState("");
    const [errors, setErrors] = useState([])
    const [showTaskButton, setShowTaskButton] = useState(false)
    const [focusTask, setFocusTask] = useState(0);
    const [showingTaskOptions, setShowingTaskOptions] = useState(false);
    const [editTaskName, setEditTaskName] = useState(false);



    useEffect(() => {
        if (showing === "list") {
            if (!alist) {
                dispatch(getList(Number(listId)))
            }
            if (alist.name && title !== alist.name) {
                setTitle(alist.name)
            }
        }
        if (showing === "All Tasks") {
            if (title !== "All Tasks") {
                if (listId) {
                    if (!alist) {
                        dispatch(getList(Number(listId)))
                    }
                    setTitle(alist.name)
                }
                else {
                    setTitle("All Tasks")
                    history.push("/")
                }
            }
        }
    }, [dispatch, showing, alist])

    useEffect(() => {
        if (allTasks && focusTask) {
            setTaskInfo(allTasks[focusTask].name)
        }
    }, [focusTask])


    useEffect(() => {
        const errs = []
        if (taskInfo.length < 1) {
            errs.push("Your task must have a name.")
        }
        setErrors(errs);
    }, [taskInfo])


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
        console.log("##########testing##########", allTasks, tasksOrder.created)
        const data = await dispatch(addTask(alist.id, taskInfo))
        if (data.errors) {
            setErrors(data.errors)
        }
        else {
            setErrors([])
            setTaskInfo("")
        }

    }

    const submitTaskName = (e) => {
        e.preventDefault()
        const errs = [];
        if (taskInfo.length < 1) {
            errs.push("Please enter a task name.")
        }
        if (taskInfo === allTasks[focusTask].name) {
            errs.push("No changes were made.")
        }
        if (!errs.length) {
            dispatch(changeTaskName(focusTask, taskInfo))
            setEditTaskName(false)
        }
        setErrors(errs)
    }


    const deleteATask = (e) => {
        e.preventDefault()
        if (errors.length < 1) {
            dispatch(deleteTask(focusTask))
            setFocusTask(0);
            setEditTaskName(false)
            setShowingTaskOptions(false);
        }
    }



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
                                    <div className="filter" onClick={() => setFilter("created")}>Creation Date</div>
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
                    {showing !== "All Tasks" &&
                        <div className="form-container add-task-form-container">
                        <form className="user-form add-task-form" onSubmit={submitTask} >
                            <input type="text" className="form-input task-input" name="name" placeholder="Add a task..." value={taskInfo} onChange={(e) => setTaskInfo(e.target.value)} onFocus={() => setShowTaskButton(true)} onBlur={() => (taskInfo.length < 1) ? setShowTaskButton(false) : null} />
                            <button className="form-button" type="submit" hidden={!showTaskButton}>Add Task</button>
                        </form>
                    </div>
                    }
                    <div className="user-tasks-container">
                        {showing === "All Tasks" && allTasks && tasksOrder[filter] && tasksOrder[filter].map(taskId =>
                            // showing === "All Tasks" && user.orderBy.map(taskId =>
                            <div className="task-container" key={taskId}>
                                <div className="task-options-container" id={taskId} onClick={() => {
                                    setFocusTask(taskId)
                                    setShowingTaskOptions(true)

                                }} key={taskId}>
                                    <div className="task-options-icon" >⋮</div>
                                </div>
                                <div className="task-details-container">
                                    <div className="task-name">{allTasks[taskId].name}</div>
                                    {/* <div className="task-name">{user.tasks[taskId].name}</div> */}
                                </div>
                            </div>
                        )}
                        {showing === "list" && alist.tasks && alist.orderBy && alist.orderBy.map(id =>
                            <div className="task-container" key={id}>
                                <div className="task-options-container" id={id} onClick={() => {
                                    setFocusTask(id)
                                    setShowingTaskOptions(true)

                                }} key={id}>
                                    <div className="task-options-icon">⋮</div>
                                </div>
                                <div className="task-details-container">
                                    <div className="task-name">{alist.tasks[id].name}</div>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="empty-lines-container">
                        {/* {lines()} */}
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
                    </div>
                </div>
                {showingTaskOptions && focusTask &&
                    <div className="task-options-wrapper">
                        <div className="exit-container">
                            <div className="return" onClick={() => {
                                setShowingTaskOptions(false)
                                setEditTaskName(false)
                                setFocusTask(0)
                            }}>Back to list ↩</div>
                            <div className="exit-button" onClick={() => {
                                setShowingTaskOptions(false)
                                setEditTaskName(false)
                                setFocusTask(0)
                            }}>×</div>
                        </div>
                        <div className="task-name-container">
                            <div className="task-name-style"></div>
                            <div className="task-name" hidden={editTaskName} onClick={() => {
                                setEditTaskName(true)
                                setTaskInfo(allTasks[focusTask].name)
                            }}>{allTasks && focusTask && allTasks[focusTask].name}</div>
                            {!editTaskName &&
                                <button className="delete-button edit-form-button" onClick={deleteATask}>Erase Task</button>
                            }
                            {editTaskName &&
                                <form className="task-name-form edit-name-form name-form" onSubmit={submitTaskName}>
                                    <input className="edit-name-input edit-input" type="text" name="name" value={taskInfo} onChange={(e) => setTaskInfo(e.target.value)} />
                                    <button className="edit-form-button" type="submit" hidden={errors.length > 0 || taskInfo === allTasks[focusTask].name}>Update</button>
                                    <button className="cancel cancel-button edit-form-button" onClick={() => setEditTaskName(false)}>Cancel</button>
                                </form>
                            }
                    </div>
                </div>
                }
            </div>
        </>
    )
}

export default Main