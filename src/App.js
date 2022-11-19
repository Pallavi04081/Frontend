import Home from "./component/Home/homepageComponent/homepage"
import Login from "./component/login/loginpage"
import {Routes,BrowserRouter, Route, Outlet, Navigate} from 'react-router-dom'
import Post from './component/Home/Post/Postpage'
import {useState} from 'react';
import Context from './component/CommanUtils/Context'
import Profile from './component/Home/Profile/profile'
import SetProfile from "./component/Home/Profile/SetProfile/SetProfile";
import Comment from './component/Home/Post/Comment/Comment'
import Opening from './component/Openingpage/Opening'
import ForgetPassward from './component/ForgetPassword/forgetPassward'
import ChatPage from  './component/Home/Chat/Chatpage'
import FollowingsProfilePag from './component/Home/Follow/ProfilePage'
import './App.css';
 

function App() {
   
   const PrivateRoute = ({auth, ...props})=>{
    return auth?
    <>
    <Outlet/>
    </> :
    <>
    <Navigate replace to="/opening"/>
    </>
    }

const [post,setPost] = useState('')
const [auth,setAuth] = useState('')

  return (
    <>
    <Context>
    <BrowserRouter>
    <Routes>
    <Route path="/opening" element={<Opening/>} />
    <Route path="/login" element={<Login auth={setAuth}/>}/>
    <Route path="/forgetpassward" element={<ForgetPassward auth={setAuth}/>}/>
    <Route path="/" element={<PrivateRoute auth={auth}/>}>
    <Route path="/" element={<Home input={setPost}/>}/>
    <Route path="/Post" element={<Post post={post}/>}/>
    <Route path="/Profile" element={<Profile input={setPost}/>}/>
    <Route path="/setProfile" element={<SetProfile/>}/>
    <Route path="/comment" element={<Comment/>}/>
    <Route path="/Chatpage" element={<ChatPage/>}/>
    <Route path="/FollowingsPage" element={<FollowingsProfilePag/>}/>
    </Route>
     <Route/>
    </Routes>
    </BrowserRouter>
    </Context>
    </>
  );
}


export default App;
