import React, {useState} from "react";
import "./login.css";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import { Button, ButtonGroup } from '@chakra-ui/react'
import { Input, InputRightElement, InputGroup } from '@chakra-ui/react'
import { ViewIcon,ViewOffIcon } from '@chakra-ui/icons'

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
    const [show, setShow] = React.useState(false)
    const handleClick = () => setShow(!show)

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
        <div className="container">
        <div className="login">
            <h1>Login</h1>
            <Input variant='outline' type="text" name="email" value={user.email} onChange={handleChange} placeholder='Email' ></Input>

            <InputGroup size='md'>
                <Input variant='outline'
                pr='4.5rem'
                type={show ? 'text' : 'password'}
                name="password" 
                placeholder='Enter password'
                value={user.password} onChange={handleChange}
                />
                <InputRightElement width='4.5rem'>
                    <Button h='1.75rem' size='sm' onClick={handleClick}>
                        {show ? <ViewIcon/> : <ViewOffIcon/>}
                    </Button>
                    {/* <p h='1.75rem' size='sm' onClick={handleClick}>
                        {show ? <ViewIcon/> : <ViewOffIcon/>}
                    </p> */}
                </InputRightElement>
            </InputGroup>
            <Button colorScheme='blue' onClick={login}>Login</Button>
            <div>or</div>
            <Button colorScheme='blue' onClick={() => navigate("/register")}>Register</Button>
        </div>
        </div>
    )
}

export default Login;
