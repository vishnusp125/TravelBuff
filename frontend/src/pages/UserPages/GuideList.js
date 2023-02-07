import React, { useEffect, useState } from 'react'
import Navbar from '../../Components/UserComponents/Navbar/Navbar'
import Guides from '../../Components/UserComponents/Guides/Guides'
import Footer from '../../Components/UserComponents/Footer/Footer'
import PulseLoader from "react-spinners/PulseLoader";
import SearchFilter from '../../Components/UserComponents/SearchFilter/SearchFilter';


function GuideList() {

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 500)
  }, [])

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
            <Navbar/>
            <Guides />
            <Footer />
          </div>
      }
    </>
  )
}

export default GuideList