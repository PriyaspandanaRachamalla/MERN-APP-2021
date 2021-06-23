import { BrowserRouter,Switch,Link,Route } from 'react-router-dom';
import Home from './components/Home'
import Login from './components/Login'
import Register from './components/Register'
import Userprofile from './components/Userprofile'
import AdminProfile from './components/AdminProfile'
import {useState} from 'react'
import Test from './components/Test'
//import Technologies from './components/Technologies'





function App(){
  let [userLoginStatus,setUserLoginStatus]=useState('');


  const logOutUser=()=>{
    localStorage.clear();
    setUserLoginStatus(false)
  }
  
  return(
    <BrowserRouter>
    <div className={StyleSheet.main}>
      <ul className="nav bg-dark ">
        <li className="nav-item">
          <Link to="/home" className="nav-link">Home</Link>
        </li>
        <li className="nav-item">
          <Link to="/register" className="nav-link">Register</Link>
        </li>

        <li className="nav-item">
          <Link to="/ Userprofile" className="nav-link">Userprofile</Link>
        </li>

        <li className="nav-item">
          <Link to="/ test" className="nav-link">Test</Link>
        </li>


        {
          !userLoginStatus?
        <li className="nav-item">
          <Link to="/login" className="nav-link">Login</Link>
        </li>:

        <li className="nav-item">
           <Link to="/login" className="nav-link" onClick={()=>logOutUser} >Logout</Link>
        </li>
      
        }


      </ul>
      {/* switches for components */}
      <Switch>
        <Route path="/home">
          {/* route for home element */}
          <Home/>
        </Route>
        <Route path="/Register">
           {/* route for register element */}
          <Register/>
          
        </Route>
        <Route path="/Userprofile/:username">
          {/* route for Userprofile element */}
          <Userprofile/>
        </Route>

        <Route path="/adminprofile/:username">
          {/* route for adminprofile element */}
          <AdminProfile/>
        </Route>


        <Route path="/login">
          {/* route for login element */}
          <Login setUserLoginStatus={setUserLoginStatus}/>
        </Route>

        <Route path="/test">
           {/* route for test element */}
           <Test/>
          </Route>

        


         
      </Switch>
      
    </div>
    



    </BrowserRouter>
    

    
      
    
  )
}
export default App;