import {useForm} from 'react-hook-form'
import {useState} from 'react'
import {useHistory} from 'react-router-dom'
import axios from 'axios'
export default function Register(){
    let {register,handleSubmit,formState:{errors}}=useForm()
    const [file, setFile]=useState(null)
    let history=useHistory();

    //console.log('history is', history)
   


    
    const onFormSubmit = (userobj) => {
            //create formdata obj
        let formData = new FormData();
        //add files to formdata obj
        formData.append('photo',file,file.name)
        //add userobj to formdata object
        formData.append("userobj",JSON.stringify(userobj))




      console.log(userobj)
      //post req
      axios.post("/user/createuser",formData)
      .then(res=>{
              let resobj=res.data;
              alert(resobj.message)
              //navigate to login component
              history.push('/Login')
      })
      .catch(err=>{
              console.log(err);
              alert("something went wrong")

      })
    }

     //to get selected
     const onFileSelect=(e)=>{
        setFile(e.target.files[0])
    }


   
    
    return (
        <form className="w-50 mx-auto" onSubmit={handleSubmit(onFormSubmit)}>
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


            
            <label htmlFor="em">email</label>
            <input type="text"
                    id="em"
                    {...register('email',{required:true,minlength:10})}
                    className="form-control mb-3"
                    autoComplete="öff"  />
            {errors.username?.type==='required' && <p className="text-danger">email is required</p>}

            <label htmlFor="dob">date of birth</label>
            <input type="date"
                    id="dob"
                    {...register('dob',{required:true,minlength:4})}
                    className="form-control mb-3"
                    autoComplete="öff"  />
            {errors.username?.type==='required' && <p className="text-danger">date of birth is required</p>}


            
              <input type="file" name="profile" className="form-control mb-3" onChange={(e)=>{onFileSelect(e)}} ></input> 
    
    
    
    

        


        <button type="submit" className="btn btn-warning mt-4">Register</button>

      </form>
    )        
    
}