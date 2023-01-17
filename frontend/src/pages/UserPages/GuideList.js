import React from 'react'
import Navbar from '../../Components/UserComponents/Navbar/Navbar'
import Guides from '../../Components/UserComponents/Guides/Guides'
import Footer from '../../Components/UserComponents/Footer/Footer'


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