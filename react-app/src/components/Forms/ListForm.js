import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Redirect, useLocation, useHistory } from 'react-router-dom';
import { addList, setSingleList } from "../../store/list"
import "./Forms.css";


const ListForm = ({ setShowNewListForm, setShowing, setIsDisplayed }) => {

    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector(state => state.session.user)
    const alist = useSelector(state => state.list.list)

    const [name, setName] = useState("");
    const [notes, setNotes] = useState("");
    // const [dueDate, setDueDate] = useState("");
    const [errors, setErrors] = useState([]);

    const onSubmit = async (e) => {
        e.preventDefault();
        console.log("@@@@@@LIST FORM.JS@@@@@@", name, notes)
        if (errors.length === 0) {
            const data = await dispatch(addList(user.id, name, notes))
            if (data.errors) {
                setErrors(data.errors);
            }
            else {
                setErrors([])
                console.log("#######attempting to redirect##", user.lists[0].id)
                setShowing("list")
                setIsDisplayed(false)
                setShowNewListForm(false)
                history.push(`/lists/${user.lists[0].id}`)
            }

        }
    }

    useEffect(() => {
        const errs = [];
        if (!name) {
            errs.push("Please provide a name for your list.")
        }
        if (name && (name.length < 4 || name.length > 50)) {
            errs.push("List name must have between 4 and 50 characters.")
        }
        setErrors(errs)
    }, [name, notes])

    return (
        <div className="dimmer">
        <div className="form-container">
            <form className="user-form" onSubmit={onSubmit}>
                <div className="errors-container">
                    {errors && errors.map((error) => (
                        <div key={error}>{error}</div>
                    ))}
                </div>
                <div className="input-container user-field">
                    <input className="form-input"
                        type="text"
                        name="name"
                        placeholder="Saturday Groceries"
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        required />
                </div>
                <div className="input-container user-field">
                    <textarea className="form-input textarea-input"
                        type="text"
                        name="notes"
                        placeholder="Details about list (optional)"
                        onChange={(e) => setNotes(e.target.value)}
                        value={notes} />
                </div>
                    {/* <div className="input-container user-field">
                        <input type="date"
                        className="form-input"
                        name="due_date"
                        onChange={(e) => setDueDate(e.target.value)}
                        value={dueDate} />
                </div> */}
                    <button className="form-button user-form-button" type="submit">Add List</button>
                    <button className="form-button user-form-button" onClick={() => {
                        setShowing("list")
                        setShowNewListForm(false)
                        setName("")
                        setNotes('')
                    }}>Cancel</button>
            </form>
            </div>
        </div>
    )
}

export default ListForm;