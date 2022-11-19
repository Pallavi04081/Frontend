import DisplayChatUsers from "./dispalyChatUsers";
import Chat from './Chat'
import './chat.css'

const Chatpage = ()=>{
   
   return(
    <>
   <div className="outerContiner">
    <DisplayChatUsers/>
    <Chat />  
   </div>
    </>
   )

}

export default Chatpage;
