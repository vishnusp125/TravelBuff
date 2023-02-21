import React from 'react'
import "./popular.scss"
import { BsArrowLeftShort, BsArrowRightShort, BsDot } from "react-icons/bs"

//image import
import img1 from '../../../assets/images/banglore.jpg'
import img2 from '../../../assets/images/kerala.jpeg'
import img3 from '../../../assets/images/pune.jpg'
import img4 from '../../../assets/images/chennai.jpeg'

const Data = [
    {
        id:1,
        imgSrc:img1,
        descTitle:'Machu Picchu',
        location:'Banglore',
        grade:'Cultural Relax'
    },
    {
        id:2,
        imgSrc:img2,
        descTitle:'Machu Picchu',
        location:'Kerala',
        grade:'Cultural Relax'
    },
    {
        id:3,
        imgSrc:img3,
        descTitle:'Machu Picchu',
        location:'Pune',
        grade:'Cultural Relax'
    },
    {
        id:4,
        imgSrc:img4,
        descTitle:'Machu Picchu',
        location:'Chennai',
        grade:'Cultural Relax'
    }
]

function Popular() {
    return (
        <section className='popular section container'>
            <div className="secContainer">
                <div className="secHeader flex">
                    <div className="textDiv">
                        <h2 className='secTitle'>
                        <br/>
                        <br/>
                            Popular Destinations
                        </h2>
                        <p>
                            From historical cities to natural spectaculars , come see the best of the world!!
                        </p>
                    </div>
                    {/* <div className="iconsDiv flex">
                        <BsArrowLeftShort className="icon leftIcon" />
                        <BsArrowRightShort className="icon" />
                    </div> */}
                </div>
                <div className="mainContent grid">
                {
                    Data.map(({id,imgSrc,descTitle,location,grade}) => {
                        return (
                            <div className="singleDestination" key={id}>
                        <div className="destImage">
                            <img src={imgSrc} alt="title" />
                            <div className="overlayInfo">
                                <h3>{location}</h3>
                                <p>
                                    Lorem ipsum dolor sit amet.
                                </p>
                                {/* <BsArrowRightShort className='icon' /> */}
                            </div>
                        </div>


                        <div className="destFooter">
                            <div className="number">
                               0{id}
                            </div>

                            <div className="destText flex">
                                <h6>
                                   {location}
                                </h6>
                                <span className="flex">
                                    <span className="dot">
                                        <BsDot className="icon" />
                                    </span>
                                   Travel Buff
                                </span>

                            </div>
                        </div>
                    </div>
                        )
                    })
                }
                </div>
            </div>
        </section>
    )
}

export default Popular