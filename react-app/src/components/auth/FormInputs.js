import React from "react";
import { useDispatch } from "react-redux";

const Text = ({ val, onChange }) => {
    const dispatch = useDispatch();
    return (
        <input type="text" className="text-input" value={val} onChange={(e) => onChange(e.target.value)}/>
    )
}

export default Text;
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