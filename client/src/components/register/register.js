import React, {useState} from "react"
import "./register.css"
import axios from "axios"
import {useNavigate} from "react-router-dom"
import { Button, ButtonGroup } from '@chakra-ui/react'
import { Input, InputRightElement, InputGroup } from '@chakra-ui/react'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { useToast } from '@chakra-ui/react'

const Register = () => {
    const toast = useToast()
    const navigate = useNavigate()

    const [user, setUser] = useState({
        name: "",
        email:"",
        password:"",
        reEnterPassword: ""
    })

    const handleChange = e => {
        const { name, value } = e.target
        setUser({
            ...user,
            [name]: value
        })
    }

    const register = () => {
        const { name, email, password, reEnterPassword } = user
        if( name && email && password && (password === reEnterPassword)){
            axios.post("http://localhost:9002/register", user)
            .then( res => {
                if(res.data.message === "Successfully registered." ){
                    navigate("/login")
                }
                else if(res.data.message === "User already registered.")
                {
                    toast({
                        title: 'User Already Registered ',
                        status: 'error',
                        position: 'top',
                        duration: 9000,
                        isClosable: true
                    });
                }
                else if(res.data.message === "Password does not meet the minimum requirements.")
                {
                    toast({
                        title: 'Password does not meet the minimum requirements',
                        status: 'warning',
                        position: 'top',
                        duration: 9000,
                        isClosable: true
                    });
                }
               
            })
            
        } else {
            alert("invlid input")
        }
        
    }

    const [show, setShow] = React.useState(false)
    const handleClick = () => setShow(!show)

    return (
        <div className="container">
        <div className="register">
            <h1>Register</h1>
            <Input variant='outline' type="text" name="name" value={user.name} onChange={handleChange} placeholder='Name' ></Input>
            <Input variant='outline' type="text" name="email" value={user.email} onChange={handleChange} placeholder='Email' ></Input>

            <InputGroup size='md' >
                <Input variant='outline'
                pr='4.5rem'
                type={show ? 'text' : 'password'}
                name="password" 
                placeholder='Enter password'
                value={user.password} onChange={handleChange}
                />
                <InputRightElement width='4.5rem'>
                    <Button h='1.75rem' size='sm' onClick={handleClick}>
                        {show ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                </InputRightElement>
            </InputGroup>

            <InputGroup size='md'>
                <Input variant='outline'
                pr='4.5rem'
                type={show ? 'text' : 'password'}
                name="reEnterPassword" value={user.reEnterPassword}
                placeholder="Re-enter Password"
                 onChange={handleChange}
                />
                <InputRightElement width='4.5rem'>
                </InputRightElement>
            </InputGroup>
            {/* <div className="button" onClick={register} >Register</div> */}
            <Button colorScheme='pink' onClick={register}>Register</Button>
            
            {/* <div className="button" onClick={() => navigate("/login")}>Login</div> */}
            <div>or</div>
            <Button colorScheme='pink' onClick={() => navigate("/login")}>Login</Button>
        </div>
        </div>
    )
}

export default Register;