import MoreVertIcon from '@mui/icons-material/MoreVert';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import TelegramIcon from '@mui/icons-material/Telegram';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import { Scrollbars } from 'react-custom-scrollbars';
import { Avatar } from '@mui/material';
import { useNavigate,Link } from 'react-router-dom'
import useDecode from '../../../CommanUtils/jwtdecode';
import axios from 'axios'


const DisplayPost = ({ displayPost }) => {
  const Navigator = useNavigate();
  const userDetails = useDecode();
  const allPost = displayPost.allPost
  

  const comm = () => {
    Navigator('/comment')
  }

 const like = async(e)=>{
    e.target.style.color='red'
    const userPost = allPost.filter((element)=>{
           return (element._id===e.target.id)
    })

     const UserisAlradyLikeThePost = userPost[0].likes.some((element)=>{
           return (element.username==userDetails.username)
    })
        
    if(!UserisAlradyLikeThePost){
     const Result = await axios.patch(`https://instaclone-360-app.herokuapp.com/updateddata/addlike/${e.target.id}`,{username:userDetails.username,userid:userDetails._id})
     if(Result){
       displayPost.setAllPost(allPost.map((element)=>{
           return (element._id==Result.data.Result._id) ? Result.data.Result : element
       }))
     }
     }
 }

  return (
    <>
      <Scrollbars style={{ minHeight: "100%", width: "100%" }}>
        {
          allPost.map((element) => {
            return (
              <>
                <div className='postcontainer' key={element._id}>
                  <div class="card-header">
                    <div>
                      <Avatar src={`${userDetails.profileimg}`} />
                    </div>
                    <div>
                      <p><Link to={`/FollowingsPage/?id=${element._id}&username=${element.username}`} style={{textDecoration:"none",color:"black"}}>{`${element.username}`}</Link></p>
                      <p>{`${element.location}`}</p>
                    </div>
                    <div>
                      <MoreVertIcon style={{ float: "right", marginRight: "15px" }} />
                    </div>
                  </div>
                  <div class="card-body">
                    <img src={`${element.img}`} />
                  </div>
                  <div class="card-footer">
                    <div>
                    <FavoriteBorderIcon id={element._id} onClick={like}/>
                    </div>
                    <ChatBubbleOutlineIcon onClick={comm} />
                    <TelegramIcon />
                    <BookmarkBorderIcon />
                  </div>
                  <div style={{marginTop:"-2px",marginLeft:"5px"}}><p style={{fontSize:"16px",marginLeft:"6px",width:"100%",marginBottom:"0px"}}>{element.likes.length > 3 ? `Liked by ${element.likes[1].username} and ${element.likes.length-2} others`:`${element.likes.length}likes`}</p></div>
                  {
                    element.description ? <div className="postdiscription"> <span>{`${element.username}`}</span>
                      <span>{`${element.description}`}</span></div> :
                      <div></div>
                  }
                </div>
              </>
            )
          })}
      </Scrollbars>
    </>
  )
}

export default DisplayPost;