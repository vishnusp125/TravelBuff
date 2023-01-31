import React, { useEffect, useState } from 'react'
import { MdLocationOn } from 'react-icons/md'
import { BsArrowRightShort } from 'react-icons/bs'

//import image
import guide1 from '../../../assets/images/guide1.jpg'
import guide2 from '../../../assets/images/guide2.jpg'
import guide3 from '../../../assets/images/guide3.jpg'
import guide4 from '../../../assets/images/guide4.jpg'
import { useNavigate } from 'react-router-dom'
import { getGuides } from '../../../axios/services/UserServices'

function Guides() {

    const [details, setDetails] = useState([])
    const navigate = useNavigate();


    async function fetchData() {
        const data = await getGuides()
        setDetails(data);
    }

    useEffect(() => {
        fetchData();
    }, [])


  return (
    <div>
        <section className='offer container section'>
            <div className="secContainer">
                <div className="secIntro">
                    <h2 className="secTitle">
                       Travel guides
                    </h2>
                    <p>
                       Find your guides !!!
                    </p>
                </div>
                <div className="mainContent grid">
                    {
                        details.map(({id,image,name,location,price,activities}) => {
                            return (
                                <div className="singleOffer" key={id}>
                                    <div className="destImage">
                                        <img src={image} alt="images" />
                                        {/* <span className="discount">
                                30% off
                            </span> */}
                                    </div>
                                    <div className="offerBody">
                                        <div className="price flex">
                                            <h4>
                                               {name}
                                            </h4>
                                            <h4>
                                                {price}
                                            </h4>
                                            <span className="status">
                                                Available
                                            </span>
                                        </div>

                                        <div className="amenities flex">
                                        {activities?.slice(0, 3).map((activity, index) => {
                                                    return (
                                                        <div key={index} className="singleAmenity flex">
                                                            <small>{activity}</small>
                                                        </div>
                                                    )
                                                })
                                                }
                                        </div>

                                        <div className="location flex">
                                            <MdLocationOn className='icon' />
                                            <small>
                                            {location}
                                            </small>
                                        </div>

                                        <button className='btn flex'>
                                            View Details
                                            <BsArrowRightShort />
                                        </button>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>

        </section>
    </div>
  )
}

export default Guides