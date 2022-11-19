import { Avatar } from "@mui/material";
import TelegramIcon from '@mui/icons-material/Telegram';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { useEffect,useState } from "react";
import axios from 'axios';

const Comment = ()=>{
 const [colletfiles,setCollectFiles] = useState('')
 console.log(colletfiles);

 useEffect(()=>{ //breellz
const uploadImage = async() => {
const data = new FormData()
data.append("file",colletfiles)
data.append("upload_preset", "Nirmala04");
data.append("cloud_name","duyx1nwga")
const Responce = await axios.post("https://api.cloudinary.com/v1_1/duyx1nwga/image/upload",{
body: data
})
}
uploadImage()
 },[colletfiles])
 
     return (
         <>
         <div class="card">
         <div class="card-header bg-transparent border-success" style={{display:"grid",gridTemplate:"row"}}>
            <div style={{height:"30%",display:"flex",flexDirection:"row"}}>
          <ArrowBackIcon style={{width:"10%",marginTop:"5px",marginLeft:"-20px"}}/>
          <h5 style={{width:"80%"}}>Comments</h5>
          <TelegramIcon style={{width:"10%",marginTop:"5px"}}/>
          </div>
          <div style={{height:"70%",display:"flex",flexDirection:"row",marginTop:"10px"}}>
            <Avatar sx={{ width: 24, height: 24, marginLeft:"5px" }}/>
            <h6 style={{width:"20%",marginLeft:"5px"}}>username</h6>
            <p style={{width:"70%",marginRight:"5px",marginLeft:"5px"}}>Description</p>
          </div>
         </div>
         <div class="card-body">
            <div style={{height:"30%",display:"flex",flexDirection:"row"}}>
          <Avatar sx={{ width: 24, height: 24, marginLeft:"5px"}}/>
          <h6 style={{width:"20%",marginLeft:"5px"}}>commentername</h6>
          <p style={{width:"60%",marginRight:"5px",marginLeft:"5px"}}>comment</p>
          <div style={{width:"10%",marginRight:"5px"}} ><FavoriteBorderIcon/></div>
          </div>
         </div>
         <div class="card-footer bg-transparent border-success" style={{height:"30%",display:"flex",flexDirection:"row"}}>
            <Avatar sx={{ width: 24, height: 24 }}/>
            <input type="text" style={{width:"90%",marginRight:"5px",marginLeft:"5px"}}></input>
            <button style={{width:"10%",marginRight:"5px"}}>Post</button>
         </div>
         <div class="form-group">
         <label for="exampleInputPassword1"><AttachFileIcon/></label>
         <input type="file" class="form-control" id="exampleInputPassword1"  onChange={(e)=>{setCollectFiles(e.target.files[0])}} />
         </div>
         </div>
         </>
     )
}


export default Comment;