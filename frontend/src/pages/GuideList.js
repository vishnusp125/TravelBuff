import React from 'react'
import Footer from '../Components/Footer/Footer'
import Guides from '../Components/Guides/Guides'
import Navbar from '../Components/Navbar/Navbar'


function GuideList() {
  return (
    <div>
    <Navbar/>
      <Guides/>
      <Footer/>
    </div>
  )
}

export default GuideList