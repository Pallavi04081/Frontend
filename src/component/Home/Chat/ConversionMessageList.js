import { Scrollbars } from 'react-custom-scrollbars'
import useDecode from "../../CommanUtils/jwtdecode";

const ConversationMessageList=({conversation})=>{ 
    const loginUserData = useDecode();
    return(
<>
<Scrollbars style={{width:"100%",height:"100%"}}>
{conversation.map((messagedata)=>{
            return(
                <>
                <div style={{width:"60%"}}>
            {
    messagedata.userName===loginUserData.username?
            <ul class="list-unstyled" style={{width:"60%"}}>
                <li>{`${messagedata.message}`}</li>
            </ul>:
            <div>
            <div>{messagedata.message}</div>
            <p style={{float:"right",fontSize:"10px",marginLeft:"auto"}}>{messagedata.time}</p>
            </div>}
            </div>
                 </>
            )
         })
        }
        </Scrollbars>
    </>
    )
    
         }

export default  ConversationMessageList;