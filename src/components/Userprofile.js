import { useEffect, useState } from 'react'
import React from 'react'
import {useParams} from 'react-router-dom'
import axios from 'axios'

function Userprofile(){
    let [user,setUser]=useState('')
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
            <h5 className="text-end">welcome ,<span className="text-info">{paramsObj.username}</span></h5>
            <div className="text-center">
                  <h3>{user.email}</h3>
                  <h3>{user.dob}</h3>
                  <img src={user.profileImage} width="200px" alt="" />
            </div>
            
        </div>
    )
}
export default Userprofile