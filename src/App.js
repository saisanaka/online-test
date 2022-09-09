import './App.css';
import Exam from './Exam';
import {useState , useEffect} from 'react'
import axios from './axios';
import Score from './Score';
import Login from './Login';
import Signup from './Signup';
import { useStateValue } from './StateProvider';
import {BrowserRouter as Router , Route , Switch} from 'react-router-dom';
import HomePage from './HomePage';


function App() {
  const [{questions} , dispatch] = useStateValue()

  useEffect(()=>{
    (
      async()=>{
        
          const retrived__data = await axios.get("/questions",{
            headers : {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${localStorage.Authorization}`,
            }
          })
          retrived__data.data.data?.map((item)=>{
            dispatch({
              type: "Add_new",
              item: item,
            })
          })
        }
      
    )();
      
  },[])

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/submit">
            <Score />
          </Route>
          <Route path="/login">
            <HomePage />
            <Login />
          </Route>
          <Route path="/register">
            <HomePage />
            <Signup />
          </Route>
          <Route path="/exam">
            <Exam />
          </Route>
          <Route path="/">
            <HomePage />
            {localStorage.getItem("email") ? <h1 className='abc__abc' > Click on view Data to start the test</h1> : <h1 className='abc__abc' > please signup or Login to start the test</h1>}
          </Route >
        </Switch>
      
    </div>
    </Router>
    
  );
}

export default App;
