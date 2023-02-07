import { useEffect } from 'react'
import { ToastContainer } from 'react-toastify'
import { Navigate, Route, Routes } from 'react-router-dom'
import Login from './pages/UserPages/Login';
import Home from './pages/UserPages/Home';
import Register from './pages/UserPages/Register';
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from './redux/features/authSlice';
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


function App() {
  // const dispatch = useDispatch();
  // const user = JSON.parse(localStorage.getItem("profile"));
  // const isUserAuth = Boolean(window.localStorage.getItem("profile"));
  // const isAdminAuth = Boolean(useSelector((state) => state.admin.token));
  // const isAdminAuth = Boolean(useSelector((state) => state.admin.token));

  // useEffect(() => {
  //   // dispatch(setUser(user));
  //   const isUserAuth = JSON.parse(localStorage.getItem("profile"));
  // }, []);
  return (
    <div className="App">
      <ToastContainer />
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/verification/:id' element={<OTPVerification />} />
        <Route path='/guideList' element={<GuideList/>} />
        <Route path='/guideSingle/:id' element={<GuideSinglePage/>} />
        <Route path='/guideSearch/:id' element={<GuideSearch/>} />
        <Route path='/bookingPage/:id/:from/:to' element={<BookingPage/>} />



        <Route path="/admin" element={<AdminHome />}/>
        <Route path="/adminLogin" element={<AdminLogin />}/>

        <Route path='/guideSignup' element={<GuideSignup />} />
        <Route path='/guideSignin' element={<GuideLogin />} />
        <Route path='/guideHome' element={<GuideHome />} />
        <Route path='/guideAddPost' element={<AddPost/>} />
        
      </Routes>
    </div>
  );
}

export default App;
