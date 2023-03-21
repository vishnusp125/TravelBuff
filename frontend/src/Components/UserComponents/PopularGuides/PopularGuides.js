import React, { useEffect, useState } from 'react'
import PulseLoader from "react-spinners/PulseLoader";
import './PopularGuides.css'
import { MdLocationOn } from 'react-icons/md'
import { BsArrowRightShort } from 'react-icons/bs'
import { Link, useNavigate } from 'react-router-dom'
import { getGuides } from '../../../axios/services/UserServices'


function PopularGuides(props) {
    const [loading, setLoading] = useState(false);
    const [details, setDetails] = useState([])
    const navigate = useNavigate();

    async function fetchData() {
        setLoading(true)
        const data = await getGuides()
        setDetails(data);
        setLoading(false)
    }

    useEffect(() => {
        fetchData();
    }, [])

    return (
        <>
         {
        loading ?
        <div style={{ position: "relative", width: "100%", height: "100%" }}>

          <PulseLoader
            color={"#551a8b"}
            loading={loading}
            style={{position:"absolute",top:"50%", left: "50%" ,transform: "translate(-50%, -50%)"}}
            size={30}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
          </div>
          :
            <section className='offer container section'>
                <div className="secContainer">
                    <div className="secIntro">
                        <h2 className="secTitle">
                            {props.heading}
                        </h2>
                        <p>
                            {props.subheading}
                        </p>
                    </div>
                    <div className="mainContent grid">
                        {
                            details.map(({ _id, image, name, location, price, activities }) => {
                                return (
                                    <div className="singleOffer" key={_id}>
                                        <div className="destImage">
                                            <img style={{ maxHeight: "250px", maxWidth: "300px" }} src={image} alt="images" />
                                            {/* <span className="discount">
                                30% off
                            </span> */}
                                        </div>
                                        <div className="offerBody">
                                            <div className="price flex space-between">
                                                <h4>
                                                   Rs. {price}/D
                                                </h4>
                                                <h4>
                                                    {name}
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

                                            <div className="location">
                                                <MdLocationOn className='icon' style={{color:"red"}} />
                                                <small style={{color:"green"}}>
                                                    {location}
                                                </small>
                                            </div>
                                            <button className='btn flex'>
                                                <Link to={`/guideSingle/${_id}`}>
                                                    View Details
                                                    <BsArrowRightShort />
                                                </Link>
                                            </button>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>

            </section>
         }
        </>
    )
}

export default PopularGuides