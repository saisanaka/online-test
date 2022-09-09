import React , { useRef, useState } from 'react';
import axios from './axios';
import 'react-dropdown/style.css';
import {  useHistory } from "react-router-dom";
import PasswordChecklist from "react-password-checklist";

function Signup() {
    const history = useHistory();
    const [email , setEmail] = useState("");
    const [mobile , setMobile] = useState("");
    const [password , setPassword] = useState("");
    const [password2 , setPassword2] = useState("");
    const [isChecked , setIsChecked] = useState(false);
    const ref = useRef();

    const setRef=()=>{
        ref.current.style.display = 'flex';
    }
    const login = e => {
        e.preventDefault();
        history.push("/login");
    }
    
    const register = async (e) => {
        e.preventDefault();
        if((password === password2)){
            
            const signedup = await axios.post("/signup",{
                    email: email,
                    password: password,
                    mobile: mobile,
                    },
                    {
                        headers:{
                            'Content-Type':"application/json"
                        }
            })

            if(signedup.status === 201){
                localStorage.setItem("email",email)
                localStorage.setItem("Authorization",signedup.data.accessToken)
                alert("successfully signedup")
                history.push("/")   
            }
            else{
                alert("Something went wrong!!\nplease try again")
            }
        }else{
            alert("something went wrong!!!")
        }
    }
  return (
    <div className="login__home">
            <div className="login__body">
                <form onSubmit={register} method="post">
                <label>
                    <h2>Create account</h2>
                </label>
                
                <label><h5>E-mail</h5></label>
                <input  onChange={e => setEmail(e.target.value)} className="login__body__input" type="email" name="email" placeholder="sanaka@gmail.com" required /> 
                <label><h5>Mobile Number</h5></label>
                <input  onChange={e => setMobile(e.target.value)} className="login__body__input" type="number" name="mobile" placeholder="123456789" required /> 
                <label><h5>Password</h5></label>
                <input onChange={e => {setPassword(e.target.value);setRef();}} className="login__body__input" type="password" name="password" placeholder="*********" required /><br></br>
                <label><h5>Confirm Password</h5></label>
                <input onChange={e => setPassword2(e.target.value)} className="login__body__input" type="password" name="confirmpassword" placeholder="*********" required /><br></br>
                <div ref={ref} className='password__checklist'>
                    <PasswordChecklist
                    rules={["minLength","specialChar","number","capital","match"]}
                    minLength={8}
                    value={password}
                    valueAgain={password2}
                    />
                </div>
                

                <p>
                    <input type='checkbox' text="please acknowledge the conditions and use of terms" checked={isChecked} onChange={e=>setIsChecked(!isChecked)} className="checkbox" required />
                   Remember Me  
                </p>
                
                <input type="submit" value="Create Account" className="login__body__button" />
                Already have an account ? <span onClick={login}>Login</span>    
                </form>
            </div>
        </div>
  )
}

export default Signup;