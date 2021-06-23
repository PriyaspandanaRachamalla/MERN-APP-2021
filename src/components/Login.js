import {useForm} from 'react-hook-form'
import {useHistory} from 'react-router-dom'
import axios from 'axios'
export default function Login(props){
    let {register,handleSubmit,formState:{errors}}=useForm()
    let history=useHistory();

    //console.log('history is', history)

    
    const onFormSubmit = (credentials) => {
      //console.log(credentials)
      //make post req
      axios.post(`/${credentials.type}/login`,credentials)
      .then(res=>{
        //get resonse data
        let resObj=res.data;
        
        if(resObj.message==='login-success'){
          //save token in local storage
          localStorage.setItem("token",resObj.token)
        
          localStorage.setItem('username',resObj.username)

          localStorage.setItem("user",JSON.stringify(resObj.userObj))
           //update user login state
           props.setUserLoginStatus(true)
           //navigate to user profile
           if(credentials.type==="user"){
           history.push(`/userprofile/${resObj.username}`)
           }

           if(credentials.type==="admin"){
            history.push(`/adminprofile/${resObj.username}`)
            }
        }
          else{
            alert(resObj.message)
          }
        })
        .catch(err=>{
          console.log(err)
          alert("some thing went wrong in login")
        })
    }
    return (
        <form className="w-50 mx-auto" onSubmit={handleSubmit(onFormSubmit)}>

          <div class="form-check">
            <input class="form-check-input" type="radio" id="admin" {...register("type")} value="admin" />
            <label class="form-check-label" for="admin">
              Admin
            </label>

          </div>
          <div class="form-check">
            <input class="form-check-input" type="radio" id="user" {...register("type")} value="user" />
            <label class="form-check-label" for="user">
              user
            </label>

          </div>

        
            {/*username */}
            <label htmlFor="un">Username</label>
            <input type="text"
                    id="un"
                    {...register('username',{required:true,minlength:4})}
                    className="form-control mb-3"
                    autoComplete="öff"  />
            {errors.username?.type==='required' && <p className="text-danger">username is required</p>}
            
            <label htmlFor="pw">password</label>
            <input type="text"
                    id="pw"
                    {...register('password',{required:true,minlength:4})}
                    className="form-control mb-3"
                    autoComplete="öff"  />
            {errors.username?.type==='required' && <p className="text-danger">password is required</p>}
    
    

        


        <button type="submit" className="btn btn-warning mt-4">Login</button>
        
      </form>
    )  
  }      
  
