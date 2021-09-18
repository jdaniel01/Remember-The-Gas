import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { getList, addTask } from '../../store/list';
import { changeTaskName, deleteTask, changeTaskDue, changeTaskStart, changeTaskStatus, changeTaskPriority } from '../../store/task';
// import { sortCompleted } from "./sort";

import "./Main.css";

const Main = ({ showing, setShowing, showingTaskOptions, setShowingTaskOptions }) => {

    const dispatch = useDispatch()
    const history = useHistory()
    const { listId } = useParams()

    const user = useSelector(state => state.session.user)
    // const lists = useSelector(state => state.list.lists)
    const alist = useSelector(state => state.list.list)
    const allTasks = useSelector(state => state.task)
    // const taskOrders = useSelector(state => state.task.orderBy)


    const [title, setTitle] = useState("All Tasks")
    // const [icon, setIcon] = useState("◁")
    // const [showFilters, setShowFilters] = useState(false)
    const [filter, setFilter] = useState("created")//"created", "due_date", "status"
    // const [shownType, setShownType] = useState("todo")//"finished"
    // const [showBulkSelect, setShowBulkSelect] = useState(false);
    // const [showBulkActions, setShowBulkActions] = useState(false);
    const [taskInfo, setTaskInfo] = useState("");
    const [errors, setErrors] = useState([])
    const [showTaskButton, setShowTaskButton] = useState(false)
    const [focusTask, setFocusTask] = useState(0);
    // const [showingTaskOptions, setShowingTaskOptions] = useState(false);
    const [editTaskName, setEditTaskName] = useState(false);
    const [editTaskDue, setEditTaskDue] = useState(false)
    // const [editTaskList, setEditTaskList] = useState(false);
    // const [editStartDate, setEditStartDate] = useState(false);
    const [taskStatus, setTaskStatus] = useState("open");
    const [taskPriority, setTaskPriority] = useState(0);
    const [dueDate, setDueDate] = useState("")
    const [editTaskStart, setEditTaskStart] = useState(false);
    const [startDate, setStartDate] = useState("")
    const [editTaskStatus, setEditTaskStatus] = useState(false)
    const [editTaskPriority, setEditTaskPriority] = useState(false)
    const [editTaskInfo, setEditTaskInfo] = useState("")
    const [editErrors, setEditErrors] = useState([]);

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
                    history.push(`/users/${user.id}/tasks`)
                }
            }
        }
    }, [dispatch, showing, alist, title, history, listId, user.id])

    useEffect(() => {
        if (allTasks && focusTask) {
            setEditTaskInfo(allTasks[focusTask].name)
            setTaskPriority(allTasks[focusTask].priority)
            setTaskStatus(allTasks[focusTask].status)
            setStartDate(allTasks[focusTask].start_date)
            setDueDate(allTasks[focusTask].due_date)
            //TODO: set task notes and owner. create to_detail() for task/list owner
        }
    }, [focusTask, allTasks])

    useEffect(() => {
        changeTaskStatus(focusTask, taskStatus)
    }, [taskStatus, focusTask])


    useEffect(() => {
        const errs = []
        if (editTaskName) {
            if (taskInfo.length < 1) {
                errs.push("Your task must have a name.")
            }
            if (taskInfo === allTasks[focusTask].name) {
                errs.push("No changes were made.")
            }
        }
        setErrors(errs);
    }, [taskInfo, editTaskInfo, allTasks, focusTask, editTaskName])

    useEffect(() => {
        const errs = []
        if (editTaskName) {
            if (editTaskInfo.length < 1) {
                errs.push("Your task must have a name.")
            }
            if (editTaskInfo === allTasks[focusTask].name) {
                errs.push("No changes were made.")
            }
        }
        setEditErrors(errs);
    }, [editTaskInfo])


    // const todoStyle = () => {
    //     if (shownType === "todo") {
    //         return {
    //             borderBottom: "1px solid whitesmoke",
    //             borderTop: "1px dotted lightgrey",
    //             borderLeft: "1px dotted lightgrey",
    //             borderRight: "1px dotted lightgrey"
    //         }
    //     } else {
    //         return {}
    //     }
    // }

    // const doneStyle = () => {
    //     if (shownType === "done") {
    //         return {
    //             borderBottom: "1px solid whitesmoke",
    //             borderTop: "1px dotted lightgrey",
    //             borderLeft: "1px dotted lightgrey",
    //             borderRight: "1px dotted lightgrey"
    //         }
    //     } else {
    //         return {}
    //     }
    // }

    // const updateIcon = (e) => {
    //     if (e.target.innerText === "◁") {
    //         setIcon("—")
    //     }
    //     else {
    //         setIcon("◁")
    //     }
    // }


    const submitTask = async (e) => {
        e.preventDefault()
        //TODO: Add task, store, route, link store and link forms
        // console.log("##########testing##########", allTasks, taskOrders.created)
        const data = await dispatch(addTask(alist.id, taskInfo))
        if (data.errors) {
            setErrors(data.errors)
        }
        else {
            setTaskInfo("")
            setShowTaskButton(false)
            setErrors([])
        }

    }

    const submitTaskName = async (e) => {
        e.preventDefault()

        const data = await dispatch(changeTaskName(focusTask, editTaskInfo))
        if (data.errors) {
            setErrors(data.errors)
        }
        else {
            setEditTaskName(false)
            setErrors([])
        }


    }

    const submitTaskDue = (e) => {
        e.preventDefault()
        const errs = [];
        dispatch(changeTaskDue(allTasks[focusTask].id, dueDate))
        setEditTaskDue(false)
        setDueDate("")
    }


    const submitTaskStart = (e) => {
        e.preventDefault()
        dispatch(changeTaskStart(allTasks[focusTask].id, startDate))
        setEditTaskStart(false)
        setStartDate("")
    }

    const submitTaskStatus = (e) => {
        e.preventDefault();
        dispatch(changeTaskStatus(allTasks[focusTask].id, taskStatus))
        setEditTaskStatus(false)
        setTaskStatus("open")
    }

    const submitTaskPriority = (e) => {
        e.preventDefault()
        dispatch(changeTaskPriority(allTasks[focusTask].id, taskPriority))
        setEditTaskPriority(false)
        setTaskPriority()
    }

    const deleteATask = (e) => {
        e.preventDefault()
        if (editErrors.length < 1) {
            dispatch(deleteTask(focusTask))
            setFocusTask();
            setTaskInfo("")
            setEditTaskInfo("")
            setEditTaskName(false)
            setShowingTaskOptions(false);
        }
    }



    return (
        <>
            <div className="main-container">
                <div className="title-container">
                    <div className="header-title">{title}</div> {/* <span className="quick-task-icon" onClick={updateIcon}>{icon}</span> */}
                    {/* <div className="title-options-container">
                        <button className="share-button">🤝+</button>
                    </div> */}
                </div>
                {/* {icon === "—" &&
                    <>
                    <div className="tasks-status-container">
                        <div className="task-detail-container">
                            {title === "list" && alist && <div className="tasks-total">{0}</div>}
                            {title === "All Tasks" && taskOrders.created && <div className="tasks-total">{taskOrders.created.length}</div>}
                            <div className="tasks-detail">tasks</div>
                        </div>
                        <div className="task-detail-container">
                            <div className="tasks-total">{0}</div>
                            <div className="tasks-detail">completed</div>
                        </div>
                    </div>
                </>
                } */}
                <div className="list-tasks-column-headers">
                    <div className="task-column-header name-header">Name</div>
                    <div className="task-column-grid">
                        <div className="task-column-header due-header">Due</div>
                        <div className="task-column-header priority-header">Priority</div>
                    </div>
                </div>
                <div className="list-tasks-container">
                    {/*<div className="options-container">
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
                    </div> */}
                    {showing !== "All Tasks" &&
                        <div className="form-container add-task-form-container">
                        <form className="user-form add-task-form" onSubmit={submitTask} >
                            <input type="text" className="form-input task-input" name="name" placeholder="Add a task..." value={taskInfo} onChange={(e) => setTaskInfo(e.target.value)} onFocus={() => setShowTaskButton(true)} onBlur={() => (taskInfo.length < 1) ? setShowTaskButton(false) : null} />
                            <button className="form-button" type="submit" hidden={!showTaskButton} disabled={errors.length > 0}>Add Task</button>
                        </form>
                    </div>
                    }
                    <div className="user-tasks-container">
                        {showing === "All Tasks" && allTasks && taskOrders && taskOrders[filter].map(taskId =>
                        // showing === "All Tasks" && user.orderBy.map(taskId =>
                            // <>
                            //     {
                            //         allTasks[taskId] &&
                            <div className="task-container" key={taskId}>
                                {allTasks[taskId] &&
                                    <>
                                <div className="task-options-container" id={taskId} onClick={() => {
                                    setFocusTask(taskId)
                                    setShowingTaskOptions(true)
                                    setErrors([])

                                }} key={taskId}>
                                        <div className="task-options-icon" >Edit</div>
                                </div>
                                <div className="task-details-container">
                                    <div className="task-name">{allTasks[taskId].name}</div>
                                    <div className="task-deets-wrapper">
                                        {allTasks[taskId].due_date &&
                                            <div className="task-due">{allTasks[taskId].due_date.split(" ").splice(0, 4).join(' ')}</div>
                                        }
                                        {allTasks[taskId].priority <= 3 && allTasks[taskId].priority >= 0 &&
                                            <div className="priority-level">{allTasks[taskId].priority}</div>
                                        }
                                    </div>
                                    {/* <div className="task-name">{user.tasks[taskId].name}</div> */}
                                    </div>
                                    </>
                                }
                            </div>
                            //     }
                            // </>
                        )}
                        {showing === "list" && alist.tasks && alist.orderBy && alist.orderBy.map(id =>
                            <div className="task-container" key={id}>
                                <div className="task-options-container" id={id} onClick={() => {
                                    setFocusTask(id)
                                    setShowingTaskOptions(true)

                                }} key={id}>
                                    <div className="task-options-icon">Edit</div>
                                </div>
                                <div className="task-details-container">
                                    <div className="task-name">{alist.tasks[id].name}</div>
                                    <div className="task-deets-wrapper">
                                        {alist && alist.tasks[id].due_date &&
                                            <div className="task-due">{alist.tasks[id].due_date.split(" ").splice(0, 4).join(' ')}</div>
                                        }
                                        {alist && alist.tasks[id].priority <= 3 && alist.tasks[id].priority >= 0 &&
                                            <div className="priority-level">{alist.tasks[id].priority}</div>
                                        }
                                    </div>
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
                    <p className="task-article-instructions">Click on a field to edit.</p>
                        <div className="task-name-container">
                            <div className="task-name-style"></div>
                            <div className="task-name" hidden={editTaskName} onClick={() => {
                                setEditTaskName(true)
                            setEditTaskInfo(allTasks[focusTask].name)
                            }}>{allTasks && focusTask && allTasks[focusTask].name}</div>
                        {!editTaskName &&
                                <button className="delete-button edit-form-button" onClick={deleteATask}>Erase Task</button>
                            }
                        {editTaskName &&
                            <div className="form-wrapper">
                                {editErrors && editErrors.map((error) => (
                                    <div key={error}>{error}</div>
                                ))}
                            <form className="task-name-form edit-name-form name-form" onSubmit={submitTaskName}>
                                <input className="edit-name-input edit-input" type="text" name="name" value={editTaskInfo} onChange={(e) => setEditTaskInfo(e.target.value)} />
                                <button className="edit-form-button" type="submit" hidden={editTaskInfo === allTasks[focusTask].name} disabled={editErrors.length}>Update</button>
                                <button className="cancel cancel-button edit-form-button" onClick={() => {
                                    setEditTaskName(false)
                                    setEditTaskInfo("")
                                }}>Cancel</button>
                            </form>
                        </div>
                        }
                    </div>
                    <article className="task-article-wrapper">
                        <div className="task-attribute-container">
                            {allTasks[focusTask].start_date ?
                                <div className="task-attribute" name="start_date" hidden={editTaskStart}>Start Date: <span onClick={() => setEditTaskStart(true)} className="attribute-data">{allTasks[focusTask].start_date.split(" ").splice(0, 4).join(" ")}</span><span className="edit-icon" onClick={() => setEditTaskStart(true)}>✍</span></div> :
                                <div className="task-attribute" name="start_date" hidden={editTaskStart}>Start Date: <span onClick={() => setEditTaskStart(true)} className="attribute-data">Add a Task</span><span className="edit-icon" onClick={() => setEditTaskStart(true)}>✍</span></div>
                            }
                            {editTaskStart &&
                                <form className="edit-form edit-start-form" onSubmit={submitTaskStart}>
                                    <input type="date"
                                        className="date-input"
                                        name="start_date"
                                        onChange={(e) => setStartDate(e.target.value)}
                                        value={startDate} />
                                <button className="edit-form-button" type="submit" hidden={dueDate === allTasks[focusTask].start_date}>Update</button>
                                    <button className="cancel cancel-button edit-form-button" onClick={() => setEditTaskStart(false)}>Cancel</button>
                                </form>
                            }
                        </div>
                        <div className="task-attribute-container">
                            {allTasks[focusTask].due_date ?
                                <div className="task-attribute" name="due_date" hidden={editTaskDue}>Due Date: <span onClick={() => setEditTaskDue(true)} className="attribute-data">{allTasks[focusTask].due_date.split(" ").splice(0, 4).join(" ")}</span><span className="edit-icon" onClick={() => setEditTaskDue(true)}>✍</span></div> :
                                <div className="task-attribute" name="due_date" hidden={editTaskDue}>Due Date: <span onClick={() => setEditTaskDue(true)} className="attribute-data">Add a due date</span><span className="edit-icon" onClick={() => setEditTaskDue(true)}>✍</span></div>
                            }
                            {editTaskDue &&
                                <form className="edit-form edit-due-form" onSubmit={submitTaskDue}>
                                    <input type="date"
                                        className="date-input"
                                        name="due_date"
                                        onChange={(e) => setDueDate(e.target.value)}
                                        value={dueDate} />
                                <button className="edit-form-button" type="submit" hidden={dueDate === allTasks[focusTask].due_date}>Update</button>
                                    <button className="cancel cancel-button edit-form-button" onClick={() => setEditTaskDue(false)}>Cancel</button>
                                </form>
                            }
                        </div>
                        <div className="task-attribute-container">
                            <div className="task-attribute" hidden={editTaskStatus}>Status: <span className="attribute-data" onClick={() => setEditTaskStatus(true)}>{allTasks[focusTask].status}</span><span className="edit-icon" onClick={() => setEditTaskStatus(true)}>✍</span></div>
                            {editTaskStatus &&
                                <form onSubmit={submitTaskStatus} className="task-status-form">
                                    <div className="status-input-container input-container">
                                        <input type="radio" name="status" id="open" className="status-radio" value="open" onClick={(e) => {
                                            setTaskStatus(e.target.value)
                                        }} />
                                        <label htmlFor="open">Open</label>
                                    </div>
                                    <div className="status-input-container input-container">
                                        <input type="radio" name="status" id="closed" className="status-radio" value="closed" onClick={(e) => {
                                            setTaskStatus(e.target.value)
                                        }} />
                                        <label htmlFor="closed">Closed</label>
                                    </div>
                                    <button className="edit-form-button" type="submit" hidden={taskStatus === allTasks[focusTask].status}>Update</button>
                                    <button className="cancel cancel-button edit-form-button" onClick={() => setEditTaskStatus(false)}>Cancel</button>
                                </form>
                            }
                        </div>
                        <div className="task-attribute-container">
                            <div className="task-attribute" hidden={editTaskPriority}>Priority: <span className="attribute-data" onClick={() => setEditTaskPriority(true)}>{allTasks[focusTask].priority}</span><span className="edit-icon">✍</span></div>
                            {editTaskPriority &&
                                <form onSubmit={submitTaskPriority}>
                                    <div className="priority-input-container input-container">
                                        <input type="radio" name="priority" id="priority0" className="priority-radio" value={0} onClick={(e) => {
                                            setTaskPriority(e.target.value)
                                        }} />
                                        <label htmlFor="priority0">No Priority</label>
                                    </div>
                                    <div className="priority-input-container input-container">
                                        <input type="radio" name="priority" id="priority1" className="priority-radio" value={1} onClick={(e) => {
                                            setTaskPriority(e.target.value)
                                        }} />
                                        <label htmlFor="priority1">Low Priority</label>
                                    </div>
                                <div className="priority-input-container input-container">
                                    <input type="radio" name="priority" id="priority2" className="priority-radio" value={2} onClick={(e) => {
                                        setTaskPriority(e.target.value)
                                    }} />
                                    <label htmlFor="priority2">Moderate Priority</label>
                                </div>
                                <div className="priority-input-container input-container">
                                    <input type="radio" name="priority" id="priority3" className="priority-radio" value={3} onClick={(e) => {
                                        setTaskPriority(e.target.value)
                                    }} />
                                    <label htmlFor="priority3">High Priority</label>
                                </div>
                                <button className="edit-form-button" type="submit" hidden={taskPriority === allTasks[focusTask].priority}>Update</button>
                                <button className="cancel cancel-button edit-form-button" onClick={() => setEditTaskPriority(false)}>Cancel</button>
                                </form>
                            }
                        </div>
                    </article>
                </div>
                }
            </div>
        </>
    )
}

export default Main