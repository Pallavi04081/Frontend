import { AppBar,Toolbar,Avatar,} from '@mui/material';
import GridOnIcon from '@mui/icons-material/GridOn';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import { Scrollbars } from 'react-custom-scrollbars';
import { useSearchParams,Link } from 'react-router-dom';
import useDecode from '../../../CommanUtils/jwtdecode';
import UploadPhotos from './UploadPhotos';

const UserProfileDetails = ( props)=>{
    const userDetails = useDecode();
    const profile = props.profile.profile;
    const photos = props.profile.photos
    let length = photos ? photos : [] 

    return(
        <>
        <Scrollbars style={{height:"100%",width:"100%"}}>
       <div className="container-fluid">
        <div>
         <div>
        <Avatar classNmae="profileImage" src={`${profile.profileimg}`} style={{marginLeft:"15px",width:"150px",height:"150px"}}/>
        <p style={{marginLeft:"15px",marginTop:"10px",fontWeight:"600"}}>{`${userDetails.username}`}</p> 
        </div>
        <div>
         <p style={{marginLeft:"8px",fontWeight:"600"}}>{`${length.length}`}</p>
         <p >Posts</p>
        </div>
        <div>
         <p style={{marginLeft:"12px",fontWeight:"600"}}>252</p>
         <p>Followers</p>
         </div>
         <div>
         <p style={{marginLeft:"12px",fontWeight:"600"}}>404</p>
         <p >Following</p>
         </div>
         </div>
         <div>
        <button><Link to='/setProfile' style={{color:"black",textDecoration:"none"}}>Edit Profile</Link></button>
         <select></select> 
         </div>
       <div>
       <GridOnIcon style={{width:"50%",marginTop:"15px"}}/>
       <AssignmentIndIcon style={{width:"50%",marginTop:"15px"}}/>
       </div>
       </div>
       <UploadPhotos photos={photos}/>
       </Scrollbars>
        </>
    )
}

export default UserProfileDetails;