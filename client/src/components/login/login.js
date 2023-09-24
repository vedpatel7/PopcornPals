import React, {useState} from "react";
import "./login.css";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const Login = ({setLoginUser}) => {

    const navigate = useNavigate();

    const [ user, setUser] = useState({
        email:"",
        password:"",
    })

    const handleChange = e => {
        const { name, value } = e.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value,
          }));
    }

    const login = () => { 
        localStorage.setItem('EmailId', user.email);
        axios.post("http://localhost:9002/login", user)
        .then((res) => {
            setLoginUser(res.data.user);
            navigate("/");
        })
        .catch((error) => {
            console.error("Login error:", error);
          });
    }

    return (
        <div className="login">
            <h1>Login</h1>
            <input type="text" name="email" value={user.email} onChange={handleChange} placeholder="Enter your Email"></input>
            <input type="password" name="password" value={user.password} onChange={handleChange}  placeholder="Enter your Password" ></input>
            <button onClick={login}>Login </button>
            <div>or</div>
            <button onClick={() => navigate("/register")}>Register</button>
            {/* <div className="button" onClick={() => navigate("/register")}>Register</div> */}
        </div>
    )
}

export default Login;