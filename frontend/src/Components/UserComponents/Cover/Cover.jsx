import React from 'react'
import "./cover.css"

function Cover() {
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
          <button className='btn'>
            <a href="">Explore Now</a>
          </button>
        </div>

        <div className="homeCard grid">
        
        <div className="locationDiv">
          <label htmlFor="location">Location</label>
          <input type="text" placeholder='Enter the location' />
        </div>
        
        {/* <div className="locationDiv">
          <label htmlFor="Date">Date</label>
          <input type="date" placeholder='01-01-2023' />
        </div> */}

        
        <div className="locationDiv">
          <label htmlFor="Price">Price Range</label>
          <input type="text" placeholder='Enter price' />
        </div>

        <button className='btn'>Search</button>

        </div>
      </div>
    </section>
  )
}

export default Cover