import { Avatar } from "@mui/material";
import { Scrollbars } from 'react-custom-scrollbars'

const ChatedPersonsList = ({userNameList})=>{
 const userNameList11 = userNameList.userNameList;
 
 const getId = (e)=>{
   const id = e.target.id
   userNameList.setGetID(id)
 }

 return (
      <>
   <div class="chatedPersonListcontainer">
   <Scrollbars style={{height:"100%",width:"100%"}}>
    {
    userNameList11.map((element)=>{
   return(
   <div className="personsList" id={element._id} >
   <Avatar src={`${element.profileimg}`}></Avatar>
   <p id={element._id} onClick={getId}>{`${element.username}`}</p>
   </div>)}) 
    }
  </Scrollbars>  
   </div>
      </>   
     )

}

export default ChatedPersonsList
