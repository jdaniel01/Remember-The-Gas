import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { editUserInfo, deleteUser } from "../../store/session"


export const AccountForm = () => {

    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const { userId } = useParams();

    const [username, setUsername] = useState(user.username);
    const [email, setEmail] = useState(user.email);
    const [photo, setPhoto] = useState('');
    const [errors, setErrors] = useState([]);
    const [usersId, setUsersId] = useState(user.id)



    const updateUsername = (e) => {
        setUsername(e.target.value);
    };

    const updatePhoto = (e) => {
        setPhoto(e.target.value)
    }

    const updateEmail = (e) => {
        setEmail(e.target.value);
    };

    const onEdit = (e) => {
        e.preventDefault()
        dispatch(editUserInfo(usersId, username, email, photo))

    }

    useEffect(() => {
        if (usersId !== user.id) {
            setUsersId(user.id)
        }
    }, [user.id])

    return (

        <div className="form-container">
            <form className="edit-form" onSubmit={onEdit}>
                <div className="errors-container">
                    {errors && errors.map((error) => (
                        <div>{error}</div>
                    ))}
                </div>
                <input type="number" name="id" id="id" value={usersId} hidden={true} />
                <div className="edit-input-container">
                    <input className="form-input"
                        type="text"
                        name="username"
                        id="username"
                        placeholder="Username"
                        onChange={updateUsername}
                        value={username}
                    />
                </div>
                <div className="edit-input-container">
                    <input className="form-input"
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Email"
                        onChange={updateEmail}
                        value={email}
                    />
                </div>
                <div className="edit-input-container">
                    <input className="form-input"
                        type="text"
                        name="photo"
                        id="photo"
                        placeholder="Photo URL"
                        onChange={updatePhoto}
                        value={photo}
                    />
                </div>
                <button className="form-button user-form-button" type="submit">Save Changes</button>
            </form>
        </div>
    )
}


export const PasswordForm = () => {

    const dispatch = useDispatch()

    const [currentPassword, setCurrentPassword] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [errors, setErrors] = useState([]);

    const updatePassword = (e) => {
        setPassword(e.target.value);
    };

    const updateRepeatPassword = (e) => {
        setRepeatPassword(e.target.value);
    };

    const updateCurrentPassword = (e) => {
        setCurrentPassword(e.target.value);
    };

    const onEdit = (e) => {
        e.preventDefault()
        const info = {
            currentPassword,
            password,
            repeatPassword
        }
        // dispatch(editPassword(info))
    }

    useEffect(() => {
        const newErrors = [];
        if (!password) {
            newErrors.push("Please enter a password.")
        }
        if (!repeatPassword) {
            newErrors.push("Please enter a password confirmation.")
        }
        if (password !== repeatPassword) {
            newErrors.push("Password and password confirmation must match.")
        }
        if (!currentPassword) {
            newErrors.push("Please enter your current password.")
        }
        setErrors(newErrors)
    }, [password, currentPassword, repeatPassword])

    return (
        <div className="form-container">
            <form className="edit-form" onSubmit={onEdit}>
                <div className="errors-container">
                    {errors && errors.map((error) => (
                        <div>{error}</div>
                    ))}
                </div>
                <div className="edit-input-container current-password-container">
                    <input className="form-input"
                        type="password"
                        name="currentPassword"
                        placeholder="Current Password"
                        onChange={updateCurrentPassword}
                        value={currentPassword}
                    ></input>
                </div>
                <div className="edit-input-group-container password-container">
                    <div className="edit-input-container">
                        <input className="form-input"
                            type="password"
                            name="password"
                            placeholder="Password"
                            onChange={updatePassword}
                            value={password}
                        ></input>
                    </div>
                    <div className="edit-input-container">
                        <input className="form-input"
                            type="password"
                            name="repeat_password"
                            placeholder="Confirm Password"
                            onChange={updateRepeatPassword}
                            value={repeatPassword}
                            required={true}
                        ></input>
                    </div>
                </div>
                <button className="form-button user-form-button" type="submit">Update Password</button>
            </form >
        </div >
    )
}

export const DeleteForm = () => {
    const dispatch = useDispatch()
    const [data, setData] = useState("")
    const [errors, setErrors] = useState([])
    const user = useSelector(state => state.session.user)

    const deleteAccount = () => {
        if (errors.length === 0) {
            dispatch(deleteUser(user.id))
        }
    }

    useEffect(() => {
        const errs = [];
        if (data !== user.username) {
            errs.push("You must enter your username correctly.")
        }
        setErrors(errs)
    }, [data])

    const updateData = (e) => {
        setData(e.target.value)
    }

    return (
        <div className="form-container">
            <div className="errors-container">
                {errors && errors.map((error) => (
                    <div>{error}</div>
                ))}
            </div>
            <div className="edit-input-container">
                <input className="form-input"
                    type="text"
                    placeholder="Type your username"
                    onChange={updateData}
                    value={data}
                ></input>
            </div>
            <button className="form-button user-form-button" onClick={deleteAccount} disabled={errors.length > 0}>Delete Account</button>
        </div>
    )
}