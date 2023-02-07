import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { guideSearch } from '../../../axios/services/UserServices';
import "./cover.css"

function Cover() {

  const [search, setSearch] = useState("");


  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await guideSearch(search);
    navigate(`/guideSearch/${search}`)

  }

  return (
    <section className='home'>
      <div className="secContainer container">

        <div className="homeText">
          <h1 className="title">
            Plan Your Trip With Us
          </h1>
          <p className="subTitle">
            Travel to your favourite city with our helpful travel guides !!!
          </p>
          {/* <button className='btn'>
            <a href="">Explore Now</a>
          </button> */}
        </div>

        <div className="homeCard grid">
          <form onSubmit={handleSubmit}>
          <div className="locationDiv">
            <label htmlFor="Where next ?">Enter location</label>
            <input type="text" placeholder=' Where next ?' className='search' required onChange={e => setSearch(e.target.value)} />
          </div>
          <button  type="submit" className='btn'>Browse</button>
          </form>

          {/* <div className="locationDiv">
          <label htmlFor="Date">Date</label>
          <input type="date" placeholder='01-01-2023' />
        </div> */}


          {/* <div className="locationDiv">
          <label htmlFor="Price">Price Range</label>
          <input type="text" placeholder='Enter price' />
        </div> */}


        </div>
      </div>
    </section>
  )
}

export default Cover