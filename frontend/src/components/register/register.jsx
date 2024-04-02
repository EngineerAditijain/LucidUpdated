import React, { useState } from "react"
import "./register.css"
import axios from "axios"
import { useHistory } from "react-router-dom"
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox'
import { FormGroup } from "@mui/material";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { PublishLoader } from "../PublishLoader/loader";

const Register = () => {
    const[loading,setLoading] = useState(false)
    const history = useHistory()

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
       
    })
   

    const handleChange = e => {
        const { name, value } = e.target
        setUser({
            ...user,
            [name]: value
        })
    }

    const register = () => {
        const { name, email, password} = user;
        setLoading(true)
        if (name && email && password ) {
            axios.post(`${window.location.origin}/register`, {
                username:name,
                password:password,
                email:email
            })
                .then(res => {
                    // alert(res.data.message)
                    setLoading(false)
                    history.push("/login")
                })
        } else {
            alert("invlid input")
        }

    }

    
    return (
        <div className="register">
            {loading?<>
            <PublishLoader/>
            </>:<>
            <h1>Register</h1>
            <input type="text" name="name" value={user.name} placeholder="Your Name*" onChange={handleChange} required={true}></input>
            <input type="text" name="email" value={user.email} placeholder="Your Email*" onChange={handleChange} required={true}></input>
     
            
           
           
            <input type="password" name="password" value={user.password} placeholder="Your Password*" onChange={handleChange}></input>
            <input type="password" name="reEnterPassword" value={user.reEnterPassword} placeholder="Re-enter Password*" onChange={handleChange}></input>
            <div className="button" onClick={register} >Register</div>
            <div>or</div>
            <div className="button" onClick={() => history.push("/login")}>Login</div>
            </>}
        </div>
    )
}

export default Register