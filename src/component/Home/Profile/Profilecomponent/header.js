import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import TelegramIcon from '@mui/icons-material/Telegram';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { AppBar,Toolbar,Avatar,} from '@mui/material';

const Profileheader = ()=>{
    return (
        <>
         <header>
        <AppBar position="static" style={{backgroundColor:"white",color:"black"}}>
        <Toolbar style={{display:"flex",flexDirection:"row"}}>
          <div style={{float:"left",width:"50%",}}>
        <CameraAltIcon/>
        </div>
        <div style={{float:"rigth",width:"50%",marginLeft:"70%"}}>
        <FavoriteBorderIcon style={{width:"50%",}}/>
        <TelegramIcon  style={{width:"50%"}}/>
        </div>
       </Toolbar>
       </AppBar>
       </header>
        </>
    )
}

export default Profileheader; 