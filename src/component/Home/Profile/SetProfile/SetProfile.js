import { Avatar} from '@mui/material';
import {useState,useEffect,useContext} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import useDecode from '../../../CommanUtils/jwtdecode';


const SetProfile = ()=>{
    const [userPost,setUserPost] = useState('')
    const [profile,setProfile] = useState('')
    const userDetails = useDecode();
    const Navigator = useNavigate();
    const [updatedData,setUpdatedData] = useState({
        name:"",
        username:"",
        website:"",
        Bio:"",
        image:""
    })
       
    useEffect(()=>{
        const upload = async()=>{
          if(profile){
             const data = await new FormData();         
              data.append('userpic',profile,profile.name)
              const Responce = await axios.post('https://instaclone-360-app.herokuapp.com/post',data)
               setUserPost(Responce.data.imageData)
               setUpdatedData({image:Responce.data.imageData})
           }
        }
          upload();
        },[profile])   
        
        
        const chnageProfile = (e)=>{
         setProfile(e.target.files[0])
         console.log(profile)
        }

       const updatedata = (e)=>{ 
        setUpdatedData((previous)=>{
            return {...previous,[e.target.name]:e.target.value,}
        })
       }
        
       const sendUpdatedData = async()=>{
          try{
            if(!updatedData.username){
              setUpdatedData((previous)=>{
                return {...previous,username:userDetails.username}})
            }
            if(!updatedData.name){
              setUpdatedData((previous)=>{
                return {...previous,name:userDetails.name}})
            }
            if(!updatedData.image){
              setUpdatedData((previous)=>{
                return {...previous,image:userDetails.image}})
            }
           const Responce = await axios.patch(`https://instaclone-360-app.herokuapp.com/updateddata/${userDetails._id}`,updatedData);
            if(Responce){
              alert('Profile successfully updated')
            }
              Navigator ('/Profile')
         }
        catch(error){
               console.error(error.message);
         }    
       }


    return(
        <>
        <div style={{display:"grid", gridTemplate:"column",height:"70%",width:"60%",margin:"auto",marginTop:"3%"}}>
        <div style={{heigth:"30%",width:"100%"}}>
        <Avatar
        alt="Remy Sharp"
        src={userPost?userPost : userDetails.profileimg}
        sx={{ width: 56, height: 56, margin:"auto" }}
        />
          <form>
          <div class="form-group">
        <label for="email" style={{marginLeft:'40%',color:"skyblue",fontSize:"14px"}}>Change Profile Photo</label>
        <input type="file" class="form-control" id="email" style={{display:"none"}} onChange={((e)=>{chnageProfile(e)})}/>
        </div>
        </form>
        </div>
        <div class="form-group">
        <label for="email">Name:</label>
        <input type="text" class="form-control" id="email" placeholder={`${userDetails.name}`} name="name" onChange={(e)=>{updatedata(e)}}/>
        </div>
         <div class="form-group">
        <label for="pwd">User Name:</label>
        <input type="text" class="form-control" id="pwd" placeholder={`${userDetails.username}`} name="username" onChange={(e)=>{updatedata(e)}}/>
        </div>
        <div class="form-group">
        <label for="pwd">Website:</label>
        <input type="link" class="form-control" id="pwd" name="website" onChange={(e)=>{updatedata(e)}}/>
        </div>
        <div class="form-group">
        <label for="pwd">Bio:</label>
        <textarea type="text" class="form-control" id="pwd" name="Bio" onChange={(e)=>{updatedata(e)}}/>
        </div>
        <button type="submit" class="btn btn-default" style={{color:"skyblue",marginTop:"10px",outLine:"none",border:"none",}} onClick={sendUpdatedData}>Save</button>
        </div>
        </>
    )


}

export default SetProfile

