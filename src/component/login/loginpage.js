import { useState,useContext} from "react";
import axios from 'axios';
import {userData} from "../CommanUtils/Context";
import {useNavigate,Link} from 'react-router-dom';
import './login.css'

const Login = ({auth})=>{
     const Navigator = useNavigate();
     const {setUserDetials,setToken} = useContext(userData);
     const [toggleInput,setToggleInput] = useState('false')
     const [registrationData,setRegistationData]=useState({
         name:"",
         username:"",
         password:"",
         email:""
     })
      
     const [logginData,setLoginData] = useState({
      username:"",
      password:""
     })

     const toggle=()=>{
        if(toggleInput=='true'){
        setToggleInput('flase')}
        else{
         setToggleInput('true')
        }
     }

      const Register = (e)=>{ 
       setRegistationData((previous)=>{
        return{...previous,[e.target.name]:e.target.value}
       })
       console.log(registrationData)
      }

      const sendRegisterData = async()=>{
            try{
              await axios.post('https://instaclone-360-app.herokuapp.com/Register',registrationData)
              setToggleInput('false')
            }
            catch(error){
              console.log(error)
            }
      }
         
      const userLoginData = (e)=>{
        setLoginData((previous)=>{
        return {...previous,[e.target.name]:e.target.value}
        })
      }
      
      const sendLoginData = async()=>{
        try{
          const Responce = await axios.post('https://instaclone-360-app.herokuapp.com/login',logginData)
           if(Responce.data.token){
            auth('true')
            sessionStorage.setItem('ExperiedToken',Responce.data.token);
            setToken(Responce.data.token)
          }
            setUserDetials({username:Responce.data.userdata[0].username,_id:Responce.data.userdata[0]._id,name:Responce.data.userdata[0].name,img:Responce.data.userdata[0].profileimg})
            Navigator('/');
        }
        catch(error){
          console.log(error)
        }
      }


    return(
      <>
  
      {
toggleInput === 'true' ?
<div className="card">
<div style={{fontSize:"30px",fontStyle:"italic",margin:"auto",fontWeight:"600"}}>Instagram</div>
        <input type="text" name="name" class="form-control" placeholder="name" onChange={(e)=>{Register(e)}}/>
        <input type="text" name="username" class="form-control" placeholder="username" onChange={(e)=>{Register(e)}}/>
        <input type="text" name="password" class="form-control" placeholder="password" onChange={(e)=>{Register(e)}}/>
        <input type="email" name="email" class="form-control" placeholder="email" onChange={(e)=>{Register(e)}}/>
        <button  class="btn btn-primary" style={{width:"80%",height:"20%",margin:"10px 40px 10px 40px",fontWeight:"400",backgroundColor:"#5B51D8",marginLeft:"55px"}} onClick={sendRegisterData}>Register</button>
         <p style={{margin:"auto",fontSize:"16px"}}>OR</p>
        <button class="btn btn-outline-primary" style={{width:"80%",height:"15%",margin:"auto",border:"none",textDecoration:"none",fontSize:"18px",color:"#4267B2",background:"none"}}  onClick={toggle}>Login</button>
 </div> :
 <div className="card" >
 <div style={{fontSize:"30px",fontStyle:"italic",margin:"auto",fontWeight:"600"}}>Instagram</div>
 <input type="text" name="username" class="form-control" placeholder="username" onChange={(e)=>{userLoginData(e)}}/>
 <input type="text" name="password" class="form-control"  placeholder="password" onChange={(e)=>{userLoginData(e)}}/>
 <button  class="btn btn-primary" style={{width:"80%",height:"20%",margin:"auto",fontWeight:"400",backgroundColor:"#4267B2",marginTop:"15px",marginLeft:"55px" }} onClick={sendLoginData}>Login</button>
  <p style={{margin:"auto",fontSize:"16px"}}>OR</p>
 <button class="btn btn-outline-primary" style={{width:"80%",height:"15%",border:"none",textDecoration:"none",fontSize:"18px",color:"#4267B2",background:"none",margin:"auto"}}  onClick={toggle}>Register</button>
 <Link to="/forgetpassward" style={{textDecoration:"none",margin:"auto"}}><p className="forgetpassowrd">Forget Passward</p></Link>
 </div>
}
 </>

    )
}

export default Login