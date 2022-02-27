import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { getList, addTask } from '../../store/list';
import { changeTaskName, deleteTask, changeTaskDue, changeTaskStart, changeTaskStatus, changeTaskPriority, getAllTasks } from '../../store/task';
import { sortStatus, sortCreated, sortPriority, sortDue, sortStart, sortName } from "./sort";
import TaskOptions from './taskOptions';

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
    const [filter, setFilter] = useState("created")//"created", "start_date", "due_date", "priority", "name"
    const [shownType, setShownType] = useState("open")//"closed"
    // const [showBulkSelect, setShowBulkSelect] = useState(false);
    // const [showBulkActions, setShowBulkActions] = useState(false);
    const [taskInfo, setTaskInfo] = useState("");
    const [errors, setErrors] = useState([])
    const [showTaskButton, setShowTaskButton] = useState(false)
    const [focusTask, setFocusTask] = useState(0);
    const [taskName, setTaskName] = useState(false);


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
                setOpenTasks(sortedList.open);
                setClosedTasks(sortedList.closed);
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

    const updateIcon = (e) => {
        if (e.target.innerText === "◁") {
            setIcon("—")
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

    }

    return (
        <>
            <div className="main-container">
                <div className="title-container">
                    <div className="header-title">{title} <span className="quick-task-icon" onClick={updateIcon}>{icon}</span></div> {/*  */}
                    {/* <div className="title-options-container">
                        <button className="share-button">🤝+</button>
                    </div> */}
                </div>
                {icon === "—" &&
                    <>
                    <div className="tasks-status-container">
                        <div className="task-detail-container">
                            <div className="tasks-total">{openTasks.length}</div>
                            <div className="tasks-detail">Todo</div>
                        </div>
                        <div className="task-detail-container">
                            <div className="tasks-total">{closedTasks.length}</div>
                            <div className="tasks-detail">Done</div>
                        </div>
                    </div>
                </>
                }
                <div className="list-tasks-container">
                    <div className="options-container">
                        {/* <div className="print-button task-option">🖨</div> */}
                        <div className="unfinished-tab task-option" style={todoStyle()} onClick={() => setShownType("open")}>To-do</div>
                        <div className="finished-tab task-option" style={doneStyle()} onClick={() => setShownType("closed")}>Done</div>
                        <div className="filter-button task-option" onMouseEnter={() => setShowFilters(true)} onMouseLeave={() => setShowFilters(false)}>🗃
                            {showFilters ? <Filters /> : null}
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
                    </div> */}
                    {showing === "list" &&
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