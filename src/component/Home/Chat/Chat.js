import { Avatar } from "@mui/material";
import { useState, useEffect, useContext, useRef, useCallback, useMemo } from "react";
import { userData } from '../../CommanUtils/Context'
import useDecode from "../../CommanUtils/jwtdecode"
import axios from 'axios';
import moment from 'moment';
import { io } from "socket.io-client";
import ConversationMessageList from "./ConversionMessageList";
let socket = io.connect("https://instaclone-360-app.herokuapp.com")

const Chat = () => {
  const [userData1, setUserData] = useState("")
  const { chatUser } = useContext(userData)
  const [responce, setResponce] = useState("")
  const [userRoom, serUserRoom] = useState("")
  const [newMessage, setNewMessage] = useState("")
  const [messageList,setMessageList] = useState([])
  const loginUserData = useDecode();
  const inputdata = useRef();
  moment.locale();
 
  

  useEffect(() => {
    const generatreRoom = async () => {
      try {
        const Result = await axios.post("https://instaclone-360-app.herokuapp.com/conversation", [loginUserData._id, userData1._id])
        setResponce(Result.data)
        setMessageList([])
      }
      catch (error) {
        console.log(error.message)
      }
    }
    generatreRoom();
  }, [userData1])

  useEffect(() => {
    const takeUserChatsandRoomid = async () => {
      try {
        const Result = await axios.get(`https://instaclone-360-app.herokuapp.com/${loginUserData._id}/${userData1._id}`)
        serUserRoom(Result.data)
        setMessageList(Result.data.Result.chats)
      }
      catch (error) {
        console.log(error.message)
      }
    }
    takeUserChatsandRoomid();
  }, [responce])

  useEffect(() => {
    if (socket && userRoom.Result) {
      socket.emit('joinRoom', userRoom.Result._id)
    }
  }, [userRoom, socket])


  useEffect(() => {
    if (chatUser) {
      setUserData(chatUser[0])
    }
  }, [chatUser])

  const onSubmit = () => {
    socket.emit("message", {
      message: inputdata.current.value,
      userName: loginUserData.username,
      userid: userRoom.Result._id,
      time: moment().format('LTS'),
      date: moment().format('L')
    })
    socket.on("sendmessage", (data) => {
      console.log(data)
      setNewMessage(data)
    })
  }

  useEffect(()=>{
    const SeddingMessageToBackendAndSettingDataInmessageList=async()=>{
          try{
           setMessageList([...messageList,newMessage])
           await axios.patch(`https://instaclone-360-app.herokuapp.com/${loginUserData._id}/${userData1._id}`,newMessage)
          }
          catch(error){
            console.log(error )
          }
    }
    SeddingMessageToBackendAndSettingDataInmessageList()
  },[newMessage])
  
  return (
    <>
      <div className="chatPageContainer">
        <div class="navbar navbar-expand-lg bg-light">
          <Avatar style={{ marginLeft: "10px" }} src={userData1 ? userData1.profileimg : ""}></Avatar>
          <p style={{ marginLeft: "5px", marginTop: "5px" }}>{userData1 ? userData1.username : ""}</p>
        </div>
        <div class="messagecontainer">
          <ConversationMessageList conversation={messageList}/>
        </div>
        <div class="navbar navbar-expand-lg bg-light" style={{ display: "flex", flexDirection: "columns" }}>
          <div class="mb-3" style={{ width: "90%", margin: "auto", Position: "relative", marginLeft: "10px", marginRight: "10px" }}>
            <input ref={inputdata} type="text" class="form-control" id="chatpageInputBox" placeholder="Message..." />
          </div>
          <button style={{ border: "none", color: "rgb(57, 184, 235)", background: "white", fontSize: "20px", fontWeight: "600" }} onClick={onSubmit}>Send</button>
        </div>
      </div>
    </>
  )

}

export default Chat;
