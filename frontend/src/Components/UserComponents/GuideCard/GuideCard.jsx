import React from 'react'
import { BsArrowRightShort } from 'react-icons/bs'
import { MdLocationOn } from 'react-icons/md'
import { Link } from 'react-router-dom'

function GuideCard(props) {

    // console.log("child",props.guide[0]);
    const details = props.guide;
    console.log(details);


    // console.log("in childd");
    // console.log(details);

    // function ChildComponent(props) {
    //     const { name, title, location } = props.guide;


    return (
        <div>
            <div className="mainContent grid">
                {
                    details?.map(({ _id, image, name, location, price, activities }) => {
                        return (
                            <div className="singleOffer" key={_id}>
                                <div className="destImage">
                                    <img src={image} alt="images" />

                                </div>
                                <div className="offerBody">
                                    <div className="price flex">
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

                                    <div className="location flex">
                                        <MdLocationOn className='icon' />
                                        <small>
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
    )
}

export default GuideCard