import React, { useState } from "react";
import './Login.css';
import { Link, useHistory } from "react-router-dom";
import login__image1 from './download.jpg';
import axios from "./axios";

function Login() {
    const history = useHistory();
    const [email , setEmail] = useState("");
    const [password , setPassword] = useState("");

    const signin = async(e) => {
        e.preventDefault();
        const login__result = await axios.post("/login",{email: email,
        password: password},{
            headers: {
                'Content-Type': 'application/json',
                } ,
        }
        )
        if(login__result.status === 200){
            localStorage.setItem("email",email)
            localStorage.setItem("Authorization",login__result.data.accessToken)
            
            alert("Login success")
            history.push("/")
        }
        else{
            alert("Invalid credentials")
        }
    }
    const register = e => {
        e.preventDefault();
        history.push("/register");
    }
    return (
        <div className="login__home">
            <Link to="/">
                <img className="login__home__img" src={login__image1} alt="" />
            </Link>

            <div className="login__body">
                <form onSubmit={signin}>
                <label>
                    <h2>Sign in</h2>
                </label>
                <label><h5>E-mail / Mobile Number</h5></label>
                <input onChange={e => setEmail(e.target.value)} className="login__body__input" type="text" name="email" placeholder="sanaka@gmail.com" required /> 
                <label><h5>Password</h5></label>
                <input onChange={e => setPassword(e.target.value)} className="login__body__input" type="password" name="password" placeholder="*********" required /><br></br>
                
                <input type="submit" value="signin" className="login__body__button" />
                    
                <p>
                    <strong>Doesn't have a account ? </strong>
                </p>
                <button onClick={register} className="create__account__button">
                    Create new account
                </button>
                </form>
            </div>
        </div>
    )
}

export default Login;