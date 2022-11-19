import {createContext,useState} from 'react'
export const userData = createContext();


const Context = ({children})=>{
  const[userDetails,setUserDetials] = useState({
    username:"",
    _id:"",
    name:"",
    image:""
  })
 const[chatUser,setChatUser]= useState("")
 const [token,setToken] = useState('')
     return(
       <>
      <userData.Provider  value={{
        userDetails,
        setUserDetials,
        chatUser,
        setChatUser,
        token,
        setToken
    }}>
         {children}
      </userData.Provider>
       </>
     )
}


export default  Context;