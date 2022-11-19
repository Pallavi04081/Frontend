import { AppBar,Toolbar} from '@mui/material';
import {Link}  from 'react-router-dom'
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import TelegramIcon from '@mui/icons-material/Telegram';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const Header = ({setPost})=>{  
    return(
        <>
        <header className='header'>
       <AppBar position="fixed" style={{backgroundColor:"white",color:"black"}}>
        <Toolbar style={{display:"flex",flexDirection:"row"}}>
        <div className="headerImage">
        <img className='image' src="insta.jpg"/>
        </div>
        <div className="headerIcon">
        <div class="form-group">
         <label for="exampleInputPassword1"><CameraAltIcon /></label>
        <input type="file" class="form-control" id="exampleInputPassword1" placeholder="Password" onChange={(e)=>{setPost(e.target.files[0])}} style={{display:"none"}}/>
        </div>
         <FavoriteBorderIcon style={{width:"33.33%",}}/>
         <Link to="/Chatpage" style={{width:"33.33%",color:"black",marginLeft:"20px",marginTop:"-2px"}}><TelegramIcon/></Link>
        </div>
       </Toolbar>
       </AppBar>
       </header>
       </>
    )
}

export default Header;