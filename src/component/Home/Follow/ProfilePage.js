import Footer from '../footer'
import { useState, useEffect, useContext } from 'react'
import { useNavigate,useSearchParams } from 'react-router-dom';
import axios from 'axios';
import Profileheader from '../Profile/Profilecomponent/header';
import UserProfileDetails from './ProfileDetails';
import useDecode from '../../CommanUtils/jwtdecode';
import './Followings.css'


const FollowingsProfilePage = ({ input }) => {
  const [photos, setPhotos] = useState("")
  console.log(photos)
  const [post, setPost] = useState('')
  const [profile, setProfile] = useState("");
  const Navigator = useNavigate()
  const userDetails = useDecode();
  const [searchparams] = useSearchParams()
  const id = searchparams.get('id');
  const username = searchparams.get('username')

  const profileDetail = { photos: photos, profile: profile }

  const profileDetails = {
    setPost,
    _id: userDetails._id
  }

  useEffect(() => {
    const userPost = async () => {
      try {
        const Responce = await axios.get(`https://instaclone-360-app.herokuapp.com/userPost?username=${username}`)
        setPhotos(Responce.data.Result);
        setProfile(Responce.data.Result);
      }
      catch (error) {
        console.log(error)
      }
    }
    userPost();
  }, [username])


  useEffect(() => {
    if (post !== "") {
      input(post);
      Navigator('/Post')
    }
  }, [post])

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

export default FollowingsProfilePage;