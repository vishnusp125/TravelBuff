import React, { useEffect, useState } from 'react'
import PulseLoader from "react-spinners/PulseLoader";
import { MdLocationOn } from 'react-icons/md'
import { BsArrowRightShort } from 'react-icons/bs'
import { Link, useParams } from 'react-router-dom'
import { guideSearch } from '../../../axios/services/UserServices'
import Navbar from '../../../Components/UserComponents/Navbar/Navbar'
import Footer from '../../../Components/UserComponents/Footer/Footer'
import './GuideSearch.css'

function GuideSearch() {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 500)
    }, [])

    const { id } = useParams();
    const [details, setDetails] = useState([])

    async function fetchData() {
        const data = await guideSearch(id)
        setDetails(data);
    }

    useEffect(() => {
        fetchData();
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
                    <div >
                        <Navbar />
                        <section className='offer container section' style={{ minHeight: "600px" }}>
                            <div className="secContainer">
                                <div className="secIntro">
                                    <h2 className="secTitle">
                                        Travel guides
                                    </h2>
                                    <p>
                                        Find your guides !!!
                                    </p>
                                </div>
                                    {details && details.length ? (
                                <div className="mainContent grid" style={{ minHeight: "500px" }}>
                                       { details.map(({ _id, image, name, location, price, activities }) => {
                                            return (
                                                <div className="singleOffer" key={_id}>
                                                    <div className="destImage">
                                                        <img src={image} alt="images" />
                                                        {/* <span className="discount">
                                             30% off
                                            </span> */}
                                                    </div>
                                                    <div className="offerBody">
                                                        <div className="price flex">
                                                            <h4>Rs. {price}/D</h4>
                                                            <h4>{name}</h4>
                                                            <span className="status">Available</span>
                                                        </div>
                                                        <div className="amenities flex">
                                                            {activities?.slice(0, 3).map((activity, index) => {
                                                                return (
                                                                    <div key={index} className="singleAmenity flex">
                                                                        <small>{activity}</small>
                                                                    </div>
                                                                );
                                                            })}
                                                        </div>
                                                        <div className="location flex">
                                                            <MdLocationOn className="icon" />
                                                            <small>{location}</small>
                                                        </div>
                                                        <button className="btn flex">
                                                            <Link to={`/guideSingle/${_id}`}>
                                                                View Details
                                                                <BsArrowRightShort />
                                                            </Link>
                                                        </button>
                                                    </div>
                                                </div>
                                            );
                                        })}
                            </div>
                                    ) : (
                                        <div className='newdiv' style={{ textAlign: "center" }}>
                                            <div><p style={{color:"red"}}><b>No results found</b></p></div>
                                            <div></div>
                                        </div>
                                    )}
                                </div>

                        </section>
                        <Footer />
                    </div>
            }
        </>
    )
}


export default GuideSearch