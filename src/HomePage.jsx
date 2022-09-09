import React  from 'react'
import './HomePage.css'
import {Link , useHistory} from 'react-router-dom';

function HomePage() {
    const history = useHistory()

    const user = localStorage.getItem("email")
    
    const view__data=()=>{
        if(user){
            history.push("/exam")
        }
        else{
            alert("You need to signin / Login first")
        }
        
    }

    const logout = () =>{
        localStorage.removeItem("email");
        localStorage.removeItem("Authorization");
        alert("logout")
        history.push("/");
    }
  return (
    <div className='homePage'>
        <h1 className='d'><Link to="/">Home</Link></h1>
        
        <h1 onClick={view__data} className='a'>Start Test</h1>
        {user ? (<><h1 onClick={logout} className='b'><Link to="/">Logout</Link></h1></>) : (<><h1 className='b'><Link to="/register">Signup</Link></h1>
        <h1 className='c'><Link to="/login">Login</Link></h1></>)}
        
    </div>
  )
}

export default HomePage