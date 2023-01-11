import { useEffect } from 'react'
import { ToastContainer } from 'react-toastify'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login';
import Home from './pages/Home';
import Register from './pages/Register';
import { useDispatch } from 'react-redux'
import { setUser } from './redux/features/authSlice';



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
      </Routes>
    </div>
  );
}

export default App;
