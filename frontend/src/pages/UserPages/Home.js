import React from 'react'
import '../../App.css'
import Cover from '../../Components/UserComponents/Cover/Cover'
import Navbar from '../../Components/UserComponents/Navbar/Navbar'
import Popular from '../../Components/UserComponents/Popular/Popular'
import PopularGuides from '../../Components/UserComponents/PopularGuides/PopularGuides'
import TravelTips from '../../Components/UserComponents/Travel Tips/TravelTips'
import Footer from '../../Components/UserComponents/Footer/Footer'


function Home() {
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