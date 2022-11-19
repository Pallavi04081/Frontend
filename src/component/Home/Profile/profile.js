import Footer from '../footer'
import { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Profileheader from './Profilecomponent/header';
import UserProfileDetails from './Profilecomponent/UserProfileDetails';
import useDecode from '../../CommanUtils/jwtdecode';
import './profile.css'


const Profile = ({ input }) => {
  const [photos, setPhotos] = useState("")
  const [post, setPost] = useState('')
  const [profile, setProfile] = useState("");
  const Navigator = useNavigate()
  const userDetails = useDecode();
  
  const profileDetail = { photos: photos, profile: profile }

  const profileDetails = {
    setPost,
    _id: userDetails._id
  }

  useEffect(() => {
    const userPost = async () => {
      try {
        const Responce = await axios.get(`https://instaclone-360-app.herokuapp.com/userPost/${userDetails._id}`)
        setPhotos(Responce.data.Result);
      }
      catch (error) {
        console.log(error)
      }
    }
    userPost();
  }, [])


  useEffect(() => {
    if (post !== "") {
      input(post);
      Navigator('/Post')
    }
  }, [post])

  useEffect(() => {
    const getProfileData = async () => {
      const Responce = await axios.get(`https://instaclone-360-app.herokuapp.com/updateddata/${userDetails._id}`);
      setProfile(Responce.data.Result);
    }
    getProfileData();
  }, [])

  return (
    <>
      <div className="profileContainer">
        <Profileheader />
        <UserProfileDetails profile={profileDetail} />
        <Footer setPost={profileDetails} />
      </div>
    </>
  )
}

export default Profile;