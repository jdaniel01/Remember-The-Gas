import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { changeTaskName, deleteTask, changeTaskDue, changeTaskStart, changeTaskStatus, changeTaskPriority, getAllTasks } from '../../store/task';


const TaskOptions = ({ focusTask, setFocusTask, setShowingTaskOptions }) => {
    const dispatch = useDispatch();

    const user = useSelector(state => state.session.user)
    const alist = useSelector(state => state.list.list)
    const allTasks = useSelector(state => state.task)

    const [taskInfo, setTaskInfo] = useState("");
    const [errors, setErrors] = useState([]);
    const [taskStatus, setTaskStatus] = useState("open");
    const [taskPriority, setTaskPriority] = useState(0);
    const [dueDate, setDueDate] = useState("")
    const [editTaskStart, setEditTaskStart] = useState(false);
    const [startDate, setStartDate] = useState("")
    const [editTaskStatus, setEditTaskStatus] = useState(false)
    const [editTaskPriority, setEditTaskPriority] = useState(false)
    const [editTaskInfo, setEditTaskInfo] = useState("")
    const [editTaskName, setEditTaskName] = useState(false);
    const [editTaskDue, setEditTaskDue] = useState(false)
    const [editErrors, setEditErrors] = useState([]);


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
            if (editTaskInfo.length < 1) {
                errs.push("Your task must have a name.")
            }
            if (editTaskInfo === allTasks[focusTask].name) {
                errs.push("No changes were made.")
            }
        }
        setEditErrors(errs);
    }, [editTaskInfo])


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
    }, [taskInfo, taskInfo, allTasks, focusTask])


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
        </>
    )

}

export default TaskOptions