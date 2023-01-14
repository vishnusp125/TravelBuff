import React from 'react'
// import { toast } from 'react-toastify'
import Navbar from '../Components/Navbar/Navbar.jsx'
import Cover from '../Components/Cover/Cover.jsx'
import Popular from '../Components/Popular/Popular.jsx'
import PopularGuides from '../Components/PopularGuides/PopularGuides.js'
import TravelTips from '../Components/Travel Tips/TravelTips.jsx'
import Footer from '../Components/Footer/Footer.jsx'
import '../App.css'

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