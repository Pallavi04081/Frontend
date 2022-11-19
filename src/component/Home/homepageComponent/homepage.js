import React from "react";
import {useState,useEffect,useContext} from 'react'
import {useNavigate}  from 'react-router-dom'
import DisplayPost from "./Homecomponent/displaypost";
import Footer from '../footer'
import Header from "./Homecomponent/header"
import useDecode from '../../CommanUtils/jwtdecode';
import axios from 'axios'
import './home.css'


const Home = ({input})=>{
 const [allPost,setAllPost] = useState([])
 console.log(allPost)
 const [post,setPost] = useState('')
 const Navigator = useNavigate();
 const userDetails = useDecode()
  
 const profileDetails ={
     setPost,
   _id:userDetails._id
 }
  
 useEffect(()=>{
 if(post!==""){
  input(post);
  Navigator('/Post')
}
},[post])

 useEffect(()=>{
    const getAllpost = async()=>{
        try{
          const Responce = await axios.get(`https://instaclone-360-app.herokuapp.com/getAllPost`)
           setAllPost(Responce.data.Result.reverse())
        }
        catch(error){
           console.log(error)
        }
    }
    getAllpost()
 },[])
 
 
 return(
      <>
       <div class="container-xxl" style={{width:"100%"}}>
        <div>
       <Header setPost={setPost}/>
       </div>
       <div>
       <DisplayPost displayPost={{allPost,setAllPost}}/>
       </div>
       <div>
       <Footer setPost={profileDetails}/>
       </div>
       </div>
        </>
    )
}

export default Home;