import { authService } from "fbase";
import React, { useState } from "react";

const inputStyles = {};

const AuthForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true);
    const [error, setError] = useState("");

    const onChange = (event) => {
        const {target: {name, value}} = event;
        if(name === "email") {
            setEmail(value);
        } else if(name === "password") {
            setPassword(value);
        }
    };
    const onSubmit = async(event) => {
        event.preventDefault(); // default 행위를 실행하지 않는다.
        try {
            let data;
            if (newAccount) {
                // Create Account
                data = await authService.createUserWithEmailAndPassword(email, password);
            } else {
                // Log In
                data = await authService.signInWithEmailAndPassword(email, password);
            }
        } catch(error) {
            setError(error.message);
        }        
    };
    const toggleAccount = () => setNewAccount((prev) => !prev);
    return (
        <>
        <form onSubmit={onSubmit} class="container">
            <input name="email"
                type="text"
                placeholder="Email"
                required value={email}
                onChange={onChange}
                className="authInput"/>
            <input name="password"
                type="password"
                placeholder="Password"
                required value={password}
                onChange={onChange}
                className="authInput"/>
            <input type="submit" value={newAccount ? "Create Account" : "Sign In"} className="authInput authSubmit" />
            {error && <span className="authError">{error}</span>}
        </form>
        <span onClick={toggleAccount} className="authSwitch">
            {newAccount ? "Sign In" : "Create Account"}
        </span>
        </>
    )
};

export default AuthForm;