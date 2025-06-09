// PasswordInput.js
import React, { useState } from "react";
import Eye from '../icons/eye.svg';
import EyeHide from '../icons/eye-slash.svg';

const Hide_Show_Password = ({ value, onChange, placeholder }) => {
    const [showPassword, setShowPassword] = useState(false);

    const toggleVisibility = () => setShowPassword(!showPassword);

    return (
        <div className="input-group">
            <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                required
            />
            <span
                className="input-group-text"
                onClick={toggleVisibility}
                style={{ cursor: "pointer" }}
            ><img
                    src={showPassword ? Eye : EyeHide}
                    alt="Toggle visibility"
                    style={{ width: "1rem", height: "1rem" }}
                />
            </span>
        </div>
    );
};

export default Hide_Show_Password;
