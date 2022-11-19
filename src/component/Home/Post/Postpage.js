import { useEffect, useState, useContext } from 'react';
import axios from 'axios'
import { userData } from '../../CommanUtils/Context';
import { useNavigate } from 'react-router-dom'
import useDecode from '../../CommanUtils/jwtdecode';

const Post = ({ post }) => {
   const Navigator = useNavigate();
   const userDetails  = useDecode();
   const username = userDetails.username;
   const [userPost, setUserPost] = useState('')
   const [postdescription, setPostdescription] = useState({
      description: "",
      location: ""
   })

   useEffect(() => {
      const upload = async () => {
         if (post) {
            const data = await new FormData();
            data.append('userpic', post, post.name)
            const Responce = await axios.post('https://instaclone-360-app.herokuapp.com/post', data)
            setUserPost(Responce.data.imageData)
         }
      }
      upload();
   }, [])

   const postData = (e) => {
      setPostdescription((previous) => {
         return { ...previous, [e.target.name]: e.target.value }
      })
   }


   const shearPost = async () => {
      try {
         const Responce = await axios.post('https://insta-360-backend.herokuapp.com/userData', {
            username: username,
            img: userPost,
            description: postdescription.description,
            location: postdescription.location,
            users:userDetails._id
         })
         Navigator('/')
      }
      catch (error) {
         console.log(error)
      }
   }

   return (
      <>
         <div style={{ width: "50%", heigth: "70%", border: "1px solid", margin: "auto", marginTop: "10px", borderColor: "gray", background: "pink" }}>
            <div style={{ width: "100%", height: "80%", display: "flex", flexDirection: "row", margin: "10px" }}>
               <img src={`${userPost}`} style={{ width: "30%", height: "100%", float: "left", background: "cover" }} />
               <textarea placeholder="Write caption" style={{ width: "40%", height: "100%", float: "right", border: "none", outline: "none", marginLeft: "3px", fontSize: "12px", background: "pink" }} name="description" onChange={(e) => { postData(e) }} />
               <button style={{ outline: "none", border: "none", color: "blue", background: "pink", height: "20%", fontSize: "14px" }} onClick={shearPost}>Share</button>
            </div>
            <lable htmlfor="location" style={{ fontSize: "14px", color: "gray" }}>Add location</lable>
            <input type="text" placeholder='...' id="location" style={{ outline: "none", border: "none", marginLeft: "3px", marginBottom: "5px", background: "pink", }} name="location" onChange={(e) => { postData(e) }}></input>
         </div>
      </>
   )
}

export default Post;