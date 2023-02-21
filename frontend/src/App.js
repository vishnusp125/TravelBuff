import { ToastContainer } from 'react-toastify'
import { Route, Routes } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
import Login from './pages/UserPages/Login';
import Home from './pages/UserPages/Home';
import Register from './pages/UserPages/Register';
import GuideList from './pages/UserPages/GuideList';
import AdminHome from './pages/AdminPages/AdminHome/AdminHome';
import AdminLogin from './pages/AdminPages/AdminLogin/AdminLogin';
import GuideSignup from './pages/GuidePages/SignUp/GuideSignup';
import GuideLogin from './pages/GuidePages/SignIn/GuideLogin';
import GuideHome from './pages/GuidePages/GuideHome/GuideHome';
import AddPost from './pages/GuidePages/AddPost/AddPost';
import GuideSinglePage from './pages/UserPages/GuideSinglepage/GuideSinglePage';
import OTPVerification from './pages/UserPages/OTPVerification/OTPVerification';
import GuideSearch from './pages/UserPages/GuideSearch/GuideSearch';
import BookingPage from './pages/UserPages/BookingPage/BookingPage';
import Bookings from './pages/UserPages/MyBookings/Bookings';
import ResendOTP from './pages/UserPages/ResendOTP/ResendOTP';
import ErrorPage from './pages/UserPages/404/ErrorPage';
import GuideBookings from './pages/GuidePages/Bookings/GuideBookings';
import ChatPage from './pages/UserPages/ChatPage/ChatPage';
import Chat from './pages/GuidePages/Chat/Chat';
import UserProfile from './pages/UserPages/UserProfile/UserProfile';
import EditProfile from './pages/GuidePages/EditProfile/EditProfile';


function App() {
  return (
    <div className="App">
      <ToastContainer />
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/verification/:id' element={<OTPVerification />} />
        <Route path='/resentOtp' element={<ResendOTP />} />
        <Route path='/guideList' element={<GuideList />} />
        <Route path='/guideSingle/:id' element={<GuideSinglePage />} />
        <Route path='/guideSearch/:id' element={<GuideSearch />} />
        <Route path='/bookingPage/:id/:from/:to' element={<BookingPage />} />
        <Route path='/bookings' element={<Bookings />} />
        <Route path='/chat' element={<ChatPage />} />
        <Route path='/profile' element={<UserProfile />} />


        <Route path="/admin" element={<AdminHome />} />
        <Route path="/adminLogin" element={<AdminLogin />} />


        <Route path='/guideSignup' element={<GuideSignup />} />
        <Route path='/guideSignin' element={<GuideLogin />} />
        <Route path='/guideHome' element={<GuideHome />} />
        <Route path='/guideAddPost' element={<AddPost />} />
        <Route path='/guideBookings' element={<GuideBookings />} />
        <Route path='/guideMessages' element={<Chat />} />
        <Route path='/editProfile' element={<EditProfile />} />


        <Route path='/*' element={<ErrorPage />} />
      </Routes>
    </div>
  );
}

export default App;
