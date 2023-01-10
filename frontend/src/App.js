// import './App.css';
import { ToastContainer } from 'react-toastify'
import { Route, Routes} from 'react-router-dom'
import Login from './pages/Login';
import Home from './pages/Home';
import Register from './pages/Register';
// import Navbar from './Components/Navbar/Navbar';
// import Home from './Components/Home/Home';
// import Popular from './Components/Popular/Popular';
// import PopularGuides from './Components/PopularGuides/PopularGuides';
// import TravelTips from './Components/Travel Tips/TravelTips';
// import Footer from './Components/Footer/Footer';
// import UserLogin from './Screens/UserLogin/UserLogin.jsx';
// import UserRegister from './Screens/UserRegister/UserRegister';


function App() {
  return (
    // <BrowserRouter>
    <div className="App">
    <ToastContainer/>
    <Routes>
      <Route exact path='/' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
    </Routes>
    {/* <Navbar/>
    <Home/>
    <Popular/>
    <PopularGuides/>
    <TravelTips/>
    <Footer/> */}
    {/* <UserLogin/> */}
    {/* <Login/> */}
    {/* <UserRegister/> */}
    {/* <UserRegister/> */}
    </div>
 
  );
}

export default App;
