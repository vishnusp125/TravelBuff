import React, { useEffect, useState } from 'react'
import PulseLoader from "react-spinners/PulseLoader";
import './userpage.css'
import Cover from '../../Components/UserComponents/Cover/Cover'
import Navbar from '../../Components/UserComponents/Navbar/Navbar'
import Popular from '../../Components/UserComponents/Popular/Popular'
import PopularGuides from '../../Components/UserComponents/PopularGuides/PopularGuides'
import TravelTips from '../../Components/UserComponents/Travel Tips/TravelTips'
import Footer from '../../Components/UserComponents/Footer/Footer'
import { useNavigate } from 'react-router-dom';


function Home() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 500)
  }, [])

  const navigate = useNavigate();

  useEffect(() => {
    const jwtToken = JSON.parse(localStorage.getItem('profile'))?.token
    if (jwtToken) {
      navigate('/');
    }
  }, []);
  return (
    <>
      {
        loading ?

          <PulseLoader
            color={"#551a8b"}
            loading={loading}
            style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
            size={30}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
          :
          <div>
            <Navbar />
            <Cover />
            <Popular />
            <PopularGuides
              heading="Popular Guides" subheading="Most rated Guides" />
            <TravelTips />
            <Footer />
          </div>
      }
    </>
  )
}

export default Home       