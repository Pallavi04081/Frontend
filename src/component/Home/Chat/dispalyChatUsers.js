import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useState, useEffect } from 'react';
import axios from 'axios'
import ChatedPersonsList from './ChatedPresonsList';
import { userData } from '../../CommanUtils/Context'
import { useContext } from 'react'

const DisplayChatUsers = () => {
   const [userNameChar, setUserNameChar] = useState({ char: "" })
   const [userNameList, setUserNameList] = useState([])
   const [getId, setGetID] = useState("")
   const { setChatUser } = useContext(userData)

   const userName = {
      userNameList: userNameList,
      setGetID
   }

   useEffect(() => {
      const getList = async () => {
         try {
            const responce = await axios.post("https://instaclone-360-app.herokuapp.com/getAllUsers", userNameChar)
            setUserNameList(responce.data.Result);
         }
         catch (error) {
            console.log(error)
         }
      }
      getList();
   }, [userNameChar])

   useEffect(() => {
      const userDetails = userNameList.filter((element) => {
         return (element._id) === getId
      })
      setChatUser(userDetails)
   }, [getId])

   
   return (
      <>
         <div className="displaychatuser">
            <div class="navbar navbar-expand-lg bg-light">
               <div>
                  <KeyboardBackspaceIcon style={{ display: "inline", marginTop: "-7px" }} />
                  <h4 style={{ display: "inline" }}>Direct</h4>
               </div>
               <form class="active-cyan-4 mb-4" role="search">
                  <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" onChange={(e) => { setUserNameChar({ char: e.target.value }) }}  style={{height:"70%",margin:"auto",marginLeft:"20px"}}/>
               </form>
            </div>
            <ChatedPersonsList userNameList={userName} />
         </div>
      </>
   )
}

export default DisplayChatUsers;
