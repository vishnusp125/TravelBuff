import { useEffect } from 'react'
import { ToastContainer } from 'react-toastify'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/UserPages/Login';
import Home from './pages/UserPages/Home';
import Register from './pages/UserPages/Register';
import { useDispatch } from 'react-redux'
import { setUser } from './redux/features/authSlice';
import GuideList from './pages/UserPages/GuideList';
import AdminHome from './pages/AdminPages/AdminHome/AdminHome';
import UserManagement from './pages/AdminPages/UserManagement/UserMangement';
import AdminLogin from './pages/AdminPages/AdminLogin/AdminLogin';




function App() {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));

  useEffect(() => {
    dispatch(setUser(user));
  }, []);
  return (
    <div className="App">
      <ToastContainer />
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/guideList' element={<GuideList/>} />

        <Route path="/admindash" element={<AdminHome />}/>
        <Route path="/adminLogin" element={<AdminLogin />}/>
        <Route path="/adminUserMgt" element={<UserManagement/>}/>
      </Routes>
    </div>
  );
}

export default App;
