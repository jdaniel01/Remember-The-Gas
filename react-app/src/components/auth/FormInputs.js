import React from "react";
import { useDispatch } from "react-redux";
import "./FormInputs.css";

export const Text = ({ val, onChange }) => {
    const dispatch = useDispatch();
    return (
        <input type="text" className="text-input" value={val} onChange={(e) => onChange(e.target.value)}/>
    )
}


// export const Password = ({ val, onChange }) => {
//     const dispatch = useDispatch();
//     return (
//         <input type="password" className="text-input password-input" value={val} onChange={(e) => onChange(e.target.value)} />
//     )
// };

// export const Email = ({ val, onChange }) => {
//     const dispatch = useDispatch();
//     return (
//         <input type="email" className="text-input email-input" value={val} onChange={(e) => onChange(e.target.value)} />
//     )
// };


export const Error = ({ text }) => {
    
    return (
        <div className="error-container">
            <div className="icon-container">
                <img src="images/alert_icon.png" alt="a red equalateral triangle with rounded corners and a white exclamation point centered inside it."/>
            </div>
            <div className="error-text">{text}</div>
        </div>
    )
};