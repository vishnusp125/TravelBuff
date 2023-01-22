import React, { useEffect } from 'react'
import './userpage.css'
import Cover from '../../Components/UserComponents/Cover/Cover'
import Navbar from '../../Components/UserComponents/Navbar/Navbar'
import Popular from '../../Components/UserComponents/Popular/Popular'
import PopularGuides from '../../Components/UserComponents/PopularGuides/PopularGuides'
import TravelTips from '../../Components/UserComponents/Travel Tips/TravelTips'
import Footer from '../../Components/UserComponents/Footer/Footer'
// import jwt from 'jwt-decode';
import { useNavigate } from 'react-router-dom';


function Home() {

  // useEffect(() => {
  //   if(window.localStorage.getItem("profile")){
  //     useNavi

  //   }
  // })
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('profile');
    if (token) {
      // const user = jwt(token);
      // console.log('iam here');
      // console.log(user);
      // console.log(token);
      // if (user) {
        navigate('/');
      // }
    } else {
      navigate('/login');
    }
  }, [navigate]);
  return (
    <div>
      <Navbar />
      <Cover />
      <Popular />
      <PopularGuides />
      <TravelTips />
      <Footer/>
    </div>
  )
}

export default Home       