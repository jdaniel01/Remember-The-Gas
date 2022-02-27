import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { getList, addTask } from '../../store/list';
<<<<<<< HEAD
import { changeTaskName, deleteTask, changeTaskDue, changeTaskStart, changeTaskStatus, changeTaskPriority } from '../../store/task';
=======
import { changeTaskName, deleteTask, changeTaskDue, changeTaskStart, changeTaskStatus, changeTaskPriority, getAllTasks } from '../../store/task';
import { sortStatus, sortCreated, sortPriority, sortDue, sortStart, sortName } from "./sort";
import TaskOptions from './taskOptions';
>>>>>>> primeSort

import "./Main.css";

const Main = ({ showing, setShowing, showingTaskOptions, setShowingTaskOptions }) => {

    const dispatch = useDispatch()
    const { listId } = useParams()

    const user = useSelector(state => state.session.user)
    const alist = useSelector(state => state.list.list)
    const allTasks = useSelector(state => state.task)

    const [openTasks, setOpenTasks] = useState([]);
    const [closedTasks, setClosedTasks] = useState([]);
    const [currTasks, setCurrTasks] = useState([]);
    const [title, setTitle] = useState("All Tasks")
    const [icon, setIcon] = useState("◁")
    const [showFilters, setShowFilters] = useState(false)
<<<<<<< HEAD
    const [filter, setFilter] = useState("created")//"created", "priority", "status"
    const [shownType, setShownType] = useState("todo")//"finished"
    const [showBulkSelect, setShowBulkSelect] = useState(false);
    const [showBulkActions, setShowBulkActions] = useState(false);
=======
    const [filter, setFilter] = useState("created")//"created", "start_date", "due_date", "priority", "name"
    const [shownType, setShownType] = useState("open")//"closed"
    // const [showBulkSelect, setShowBulkSelect] = useState(false);
    // const [showBulkActions, setShowBulkActions] = useState(false);
>>>>>>> primeSort
    const [taskInfo, setTaskInfo] = useState("");
    const [errors, setErrors] = useState([])
    const [showTaskButton, setShowTaskButton] = useState(false)
    const [focusTask, setFocusTask] = useState(0);
<<<<<<< HEAD
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
    const [editListNotes, setEditListNotes] = useState(false);
=======
    const [taskName, setTaskName] = useState(false);
>>>>>>> primeSort


    useEffect(() => {
        if (!allTasks) {
            dispatch(getAllTasks(user.id))
            console.log("TAAAAAAAAASKS", allTasks)
            let statuses = sortStatus(allTasks)
            setOpenTasks(statuses.open)
            setClosedTasks(statuses.closed)
        }
        else {
            let statuses = sortStatus(allTasks)
            setOpenTasks(statuses.open)
            setClosedTasks(statuses.closed)
        }

    }, [dispatch])

    useEffect(() => {
        if (showing === "list") {
            if (!alist) {
                dispatch(getList(Number(listId)))
            }
            if (alist.name && title !== alist.name) {
                let sortedList = sortStatus(alist.tasks);
                setTitle(alist.name)
<<<<<<< HEAD

=======
                setOpenTasks(sortedList.open);
                setClosedTasks(sortedList.closed);
>>>>>>> primeSort
            }
        }
        if (showing === "All Tasks") {
            if (title !== "All Tasks") {
                if (listId) {
                    if (!alist) {
                        dispatch(getList(Number(listId)))
                    }
                    setTitle(alist.name)
                    let sortedList = sortStatus(alist.tasks);

                    setTitle(alist.name)
                    setOpenTasks(sortedList.open);
                    setClosedTasks(sortedList.closed);
                }
                else {
                    setTitle("All Tasks")
                    let sortedTasks = sortStatus(allTasks);
                    setOpenTasks(sortedTasks.open);
                    setClosedTasks(sortedTasks.closed);

                }
            }
            else {
                setTitle("All Tasks")
                let sortedTasks = sortStatus(allTasks);
                setOpenTasks(sortedTasks.open);
                setClosedTasks(sortedTasks.closed);

            }
        }
    }, [dispatch, showing, alist, title, listId])


    useEffect(() => {
        if (shownType === "open") {
            if (filter === "created") {
                setCurrTasks(sortCreated(openTasks))
                console.log("EEEEEEEEEEEEEEEEEEEE", openTasks);
            }
            else if (filter === "priority") {
                setCurrTasks(sortPriority(openTasks))
            }
            else if (filter === "start_date") {
                setCurrTasks(sortStart(openTasks))
            }
            else if (filter === "due_date") {
                setCurrTasks(sortDue(openTasks))
            }
            else if (filter === "name") {
                setCurrTasks(sortName(openTasks))
            }
        }
        else {
            if (filter === "created") {
                setCurrTasks(sortCreated(closedTasks))
            }
            else if (filter === "priority") {
                setCurrTasks(sortPriority(closedTasks))
            }
            else if (filter === "start_date") {
                setCurrTasks(sortStart(closedTasks))
            }
            else if (filter === "due_date") {
                setCurrTasks(sortDue(closedTasks))
            }
            else if (filter === "name") {
                setCurrTasks(sortName(closedTasks))
            }
        }
    }, [dispatch, filter, shownType, allTasks, alist, openTasks, closedTasks])

    const Filters = () => {
        return (
            <div className="tasks-filter-container">
                <div className="checker-container">
                    <div className="checker">{filter === "created" ? "✔" : null}</div>
                    <div className="checker">{filter === "due_date" ? "✔" : null}</div>
                    <div className="checker">{filter === "start_date" ? "✔" : null}</div>
                    <div className="checker">{filter === "priority" ? "✔" : null}</div>
                    <div className="checker">{filter === "name" ? "✔" : null}</div>
                </div>
                <div className="task-filters">
                    <div className="filter" onClick={() => setFilter("created")}>Creation Date</div>
                    <div className="filter" onClick={() => setFilter("due_date")}>Due Date</div>
                    <div className="filter" onClick={() => setFilter("start_date")}>Start Date</div>
                    <div className="filter" onClick={() => setFilter("priority")}>Priority</div>
                    <div className="filter" onClick={() => setFilter("name")}>Name</div>
                </div>
            </div >
        )
    }

<<<<<<< HEAD
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
=======
    const List = () => {
        return (
            <>
                {currTasks.map(task =>
                    <div className="task-container" key={task.id}>
                        <div className="task-options-container" id={task.id} onClick={() => {
                            setFocusTask(task.id)
                            setShowingTaskOptions(true)

                        }} key={task.id}>
                            <div className="task-options-icon">Edit</div>
                        </div>
                        <div className="task-details-container">
                            <div className="task-name">{task.name}</div>
                            <div className="task-deets-wrapper">
                                {task.due_date &&
                                    <div className="task-due">{task.due_date.split(" ").splice(0, 4).join(' ')}</div>
                                }
                                {task.priority <= 3 && task.priority >= 0 &&
                                    <div className="priority-level">{task.priority}</div>
                                }
                            </div>
                        </div>
                    </div>
                )}
            </>
        )
    }

    const AllTasks = () => {
        return (
            <>
                {
                    currTasks.map(task =>
                        <div className="task-container" key={task.id}>
                            <div className="task-options-container" id={task.id} onClick={() => {
                                setFocusTask(task.id)
                                setShowingTaskOptions(true)
                                setErrors([])

                            }} key={task.id}>
                                <div className="task-options-icon" >Edit</div>
                            </div>
                            <div className="task-details-container">
                                <div className="task-name">{task.name}</div>
                                <div className="task-deets-wrapper">
                                    {task.due_date &&
                                        <div className="task-due">{task.due_date.split(" ").splice(0, 4).join(' ')}</div>
                                    }
                                    {task.priority <= 3 && task.priority >= 0 &&
                                        <div className="priority-level">{task.priority}</div>
                                    }
                                </div>
                            </div>
                        </div>
                    )
                }
            </>
        )
    }

    const todoStyle = () => {
        if (shownType === "open") {
>>>>>>> primeSort
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
<<<<<<< HEAD

    const updateIcon = (e) => {
        if (e.target.innerText === "◁") {
            setIcon("—")
        }
        else {
            setIcon("◁")
        }
    }
=======
>>>>>>> primeSort

    const doneStyle = () => {
        if (shownType === "closed") {
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

<<<<<<< HEAD
    const submitTask = async (e) => {
        e.preventDefault()
        const data = await dispatch(addTask(alist.id, taskInfo))
        if (data.errors) {
            setErrors(data.errors)
=======
    const updateIcon = (e) => {
        if (e.target.innerText === "◁") {
            setIcon("—")
>>>>>>> primeSort
        }
        else {
            setIcon("◁")
        }
    }


    const submitTask = (e) => {
        e.preventDefault()
        //TODO: Add task, store, route, link store and link forms
        console.log("##########testing##########", allTasks)
        const data = dispatch(addTask(alist.id, taskInfo))
        if (data.errors) {
            setErrors(data.errors)
        }
        else {
            setTaskInfo("")
            setShowTaskButton(false)
            setErrors([])
        }

<<<<<<< HEAD

    }

    const submitTaskDue = (e) => {
        e.preventDefault()
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
=======
>>>>>>> primeSort
    }

    return (
        <>
            <div className="main-container">
                <div className="title-container">
<<<<<<< HEAD
                    <div className="header-title">{title} <span className="quick-task-icon" onClick={updateIcon}>{icon}</span></div> {/* <span className="quick-task-icon" onClick={updateIcon}>{icon}</span> */}
=======
                    <div className="header-title">{title} <span className="quick-task-icon" onClick={updateIcon}>{icon}</span></div> {/*  */}
>>>>>>> primeSort
                    {/* <div className="title-options-container">
                        <button className="share-button">🤝+</button>
                    </div> */}
                </div>
                {icon === "—" &&
                    <>
                    <div className="tasks-status-container">
                        <div className="task-detail-container">
<<<<<<< HEAD
                            {/* {title === "list" && alist && <div className="tasks-total">{0}</div>} */}
                            {title === "All Tasks" && taskOrders.created && <div className="tasks-total">{taskOrders.status.open.length}</div>}
                            <div className="tasks-detail">tasks</div>
                        </div>
                        <div className="task-detail-container">
                            {/* {title === "list" && alist && <div className="tasks-total">{0}</div>} */}
                            {title === "All Tasks" && taskOrders.created && <div className="tasks-total">{taskOrders.status.closed.length}</div>}
                            <div className="tasks-detail">completed</div>
=======
                            <div className="tasks-total">{openTasks.length}</div>
                            <div className="tasks-detail">Todo</div>
                        </div>
                        <div className="task-detail-container">
                            <div className="tasks-total">{closedTasks.length}</div>
                            <div className="tasks-detail">Done</div>
>>>>>>> primeSort
                        </div>
                    </div>
                </>
                }
<<<<<<< HEAD
                {alist && alist.notes &&
                    <div className="list-notes">
                        <h3>Notes </h3>
                        <div className="notes-container">
                            <p>{alist.notes}</p>
                            <button onClick={() => setEditListNotes(true)}>Edit</button>
                        </div>
                    </div>
                }
                <div className="list-tasks-column-headers">
                    <div className="task-column-header name-header">Name</div>
                    <div className="task-column-grid">
                        <div className="task-column-header due-header">Due</div>
                        <div className="task-column-header priority-header">Priority</div>
                    </div>
                </div>
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
=======
                <div className="list-tasks-container">
                    <div className="options-container">
                        {/* <div className="print-button task-option">🖨</div> */}
                        <div className="unfinished-tab task-option" style={todoStyle()} onClick={() => setShownType("open")}>To-do</div>
                        <div className="finished-tab task-option" style={doneStyle()} onClick={() => setShownType("closed")}>Done</div>
                        <div className="filter-button task-option" onMouseEnter={() => setShowFilters(true)} onMouseLeave={() => setShowFilters(false)}>🗃
                            {showFilters ? <Filters /> : null}
>>>>>>> primeSort
                        </div>
                    </div>
                    <div className="list-tasks-column-headers">
                        <div className="task-column-header name-header">Name</div>
                        <div className="task-column-grid">
                            <div className="task-column-header due-header">Due</div>
                            <div className="task-column-header priority-header">Priority</div>
                        </div>
                    </div>
                    {/* <div className="bulk-actions-container">
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
<<<<<<< HEAD
                    </div>
                    {showing !== "All Tasks" &&
=======
                    </div> */}
                    {showing === "list" &&
>>>>>>> primeSort
                        <div className="form-container add-task-form-container">
                        <form className="user-form add-task-form" onSubmit={submitTask} >
                            <input type="text" className="form-input task-input" name="name" placeholder="Add a task..." value={taskInfo} onChange={(e) => setTaskInfo(e.target.value)} onFocus={() => setShowTaskButton(true)} onBlur={() => (taskInfo.length < 1) ? setShowTaskButton(false) : null} />
                            <button className="form-button" type="submit" hidden={!showTaskButton} disabled={errors.length > 0}>Add Task</button>
                        </form>
                    </div>
                    }
                    <div className="user-tasks-container">
                        {showing === "list" ? <List /> : <AllTasks />}
                    </div>
                    <div className="empty-lines-container">
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
                {showingTaskOptions && focusTask ? <TaskOptions focusTask setFocustTask setShowingTaskOptions taskInfo setTaskInfo alist allTasks /> : null}
            </div>
        </>
    )
}

export default Main