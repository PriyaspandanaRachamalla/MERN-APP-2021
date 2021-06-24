import { useEffect, useState } from 'react'
import React from 'react'
import {useParams} from 'react-router-dom'
import axios from 'axios'
import { BrowserRouter,Switch,Link,Route } from 'react-router-dom';
import UserCart from './UserCart'
import ViewProducts from './ViewProducts'


function Userprofile(){
    let [user,setUser]=useState('')
    let [usercart,setUsercart]=useState('')
    let [products,setProducts]=useState('')


    //function to make post tp usercat api
    const addProductToCart=(productObj)=>{
        //get username from localstorge
        let username=localStorage.getItem("username")

        //add username to product object
        //productObj.username=username;
        let newObj={username,productObj}

        console.log("product added by user",newObj)
        //make post req
        axios.post("/user/addtocart",newObj)
        .then(res=>{
            let responseObj=res.data
            alert(responseObj.message)
        })
        .catch(err=>{
            console.log("err in adding to cart",err)
            alert("something went wrong")
        })
    }
    //get username from url
    let paramsObj=useParams();//{username:"spandu"}
    useEffect(()=>{
        //axios.get(`/user/getuser/${paramsObj.username}`)
        //.then(res=>{
          //  let userObj=res.data.message;
            //setUser({...userObj})
        //})
        //get userobj from local storage
        let userObj=JSON.parse(localStorage.getItem('user'))
        setUser({...userObj})
    },[paramsObj.username])    
    return(
        <div>
            <h5 className="text-end">welcome ,<span className="text-info">{paramsObj.username}
            </span>
                 <img src={user.profileImage} width="60px" alt="" />
            </h5>
            <BrowserRouter>
        <ul className="nav nav-pills nav-fill">
          <li className="nav-item">
          <Link to="/user-cart" className="nav-link" data-bs-toggle="collapse" data-bs-target=".navbar-collapse.show">cart</Link>
          </li>
          <li className="nav-item">
          <Link to="/view-products" className="nav-link" data-bs-toggle="collapse" data-bs-target=".navbar-collapse.show">view products</Link>
           
          </li>
  
        </ul>

        <Switch>
        <Route path="/user-cart">
         
          <UserCart/>
        </Route>
        <Route path="/view-products">
           
          <ViewProducts addProductToCart={addProductToCart}/>
          </Route>


       </Switch>
        
    
    
        </BrowserRouter>
           
            
        </div>
    )
}
export default Userprofile