import React, { useEffect, useState } from 'react'
import PulseLoader from "react-spinners/PulseLoader";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { guideSingle } from '../../../axios/services/UserServices';
import Navbar from '../../../Components/UserComponents/Navbar/Navbar';
import image from '../../../assets/images/istockphoto-958510852-170667a.jpg';
import { DatePicker, Space } from 'antd';
import {
  MDBCol,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,

} from 'mdb-react-ui-kit';
import moment from 'moment';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { postConversation } from '../../../axios/services/ConversationServices';
const { RangePicker } = DatePicker;


function GuideSinglePage() {

  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState("")
  const [fromDate, setfromDate] = useState()
  const [toDate, settoDate] = useState()
  const [bookButton, setBookButton] = useState(false)

  const jwtToken = JSON?.parse(localStorage?.getItem('profile'))?.token
  const { id } = useParams();
  const navigate = useNavigate()

  useEffect(()=>{
    if(!jwtToken){
      navigate('/login')
    }
  },[])

  async function guideDetails() {
    const data = await guideSingle(id, jwtToken);
    setDetails(data);
  }

  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 500)
  }, [])

  useEffect(() => {
    guideDetails()
  }, [])

  function filterByDates(dates) {
    setfromDate(dates[0].format("DD-MM-YYYY"))
    settoDate(dates[1].format("DD-MM-YYYY"))

    var availability = false;
    if (details.bookings.length > 0) {
      for (const booking of details.bookings) {
        if (moment(dates[0].format("DD-MM-YYYY")).isBetween(booking.fromDate, booking.toDate) ||
          moment(dates[1].format("DD-MM-YYYY")).isBetween(booking.fromDate, booking.toDate) ||
          (moment(booking.fromDate).isBetween(dates[0].format("DD-MM-YYYY"), dates[1].format("DD-MM-YYYY")) &&
            moment(booking.toDate).isBetween(dates[0].format("DD-MM-YYYY"), dates[1].format("DD-MM-YYYY"))) ||
          (dates[0].format("DD-MM-YYYY") <= booking.toDate && dates[1].format("DD-MM-YYYY") >= booking.fromDate) ||
          dates[0].format("DD-MM-YYYY") === booking.fromDate ||
          dates[0].format("DD-MM-YYYY") === booking.toDate ||
          dates[1].format("DD-MM-YYYY") === booking.fromDate ||
          dates[1].format("DD-MM-YYYY") === booking.toDate) {
          availability = false;
          break;
        } else {
          availability = true;
        }
      }
    }
    if (availability || details.bookings.length == 0) {
      console.log("Availability: True");
      setBookButton(true)
    } else {
      console.log("Availability: False");
      toast.error("Sorry guide not available on that date")
      setBookButton(false)
    }
  }


  const disabledDate = current => {
    // Disable all days that are earlier than today
    return current && current < moment().endOf('day');
  };

  async function postConversatn () {
    const userid = JSON.parse(localStorage.getItem("profile"))
    const userId = userid?.result?._id
    const guideId = details?._id
    const data = await postConversation(userId, guideId);
  }

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
            <div style={{ height: "100px" }}>
              <Navbar />
            </div>
            <div>
              <section className="h-100 gradient-custom-2 w-100">
                <div className="container py-2 h-100 " style={{ background: 'white' }}>
                  <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col col-lg-12 col-xl-12">
                      <div className="card">
                        <div className="rounded-top text-white d-flex flex-row" style={{ height: "300px", backgroundImage: `url(${image})`, backgroundSize: "cover", backgroundPosition: "center" }}>
                          <div className="ms-4 d-flex flex-column" style={{ width: "150px" }}>
                            <img src={details.image} className="img-fluid img-thumbnail mt-4 mb-2"
                              style={{ width: "150px", zIndex: 1 }} />
                            {/* <button type="button" className="btn btn-outline-dark" data-mdb-ripple-color="dark"
                                style={{ zIndex: "1" }}>
                                Message Me
                              </button> */}
                          </div>
                          <div className="ms-3" style={{ marginTop: "130px" }}>
                            <h5>{details.name}</h5>
                            <p>{details.location}</p>
                          </div>
                        </div>
                        <div className="p-4 text-black" style={{ backgroundColor: "#f8f9fa" }}>
                          <div className="d-flex justify-content-end text-center py-1">
                            <div>
                              <p className="mb-1 h5">-/10</p>
                              <p className="small text-muted mb-0">Rating</p>
                            </div>
                            {/* <div className="px-3">
                          <p className="mb-1 h5">1026</p>
                          <p className="small text-muted mb-0">Followers</p>
                        </div>
                        <div>
                          <p className="mb-1 h5">478</p>
                          <p className="small text-muted mb-0">Following</p>
                        </div> */}
                          </div>
                        </div>

                        <div className='d-flex justify-content-between'>
                          <h4 style={{ textAlign: 'left' }} className="my-5 mx-5">Explore {details.location} with {details.name} !!!</h4>

                          <div style={{ textAlign: 'right' }} className="m-3">
                            <h4 style={{ textAlign: 'right' }} className="mx-5 mb-3">Pick your date</h4>
                            {/* <form action=""> */}
                            <Space direction="vertical" size={12}>
                              <RangePicker format="DD-MM-YYYY" disabledDate={disabledDate} onChange={filterByDates} />
                            </Space>
                            <div style={{ marginRight: "100px" }}>
                              {/* {(fromDate && toDate) && ( */}
                              <Link to={`/bookingPage/${details._id}/${fromDate}/${toDate}`}>
                                <div>
                                  {bookButton ?
                                    <button className="btn btn-outline-dark mt-3">Book Now</button>
                                    : null
                                  }
                                </div>
                                {/* <button type="button" className="btn btn-outline-dark mt-3" data-mdb-ripple-color="dark"
                                    style={{ zIndex: "1" }}>
                                    Create Trip
                                  </button> */}
                              </Link>
                              {/* )} */}
                            </div>
                            {/* </form>  */}
                          </div>
                        </div>
                        <div>
                          <Link to="/chat" onClick={postConversatn}><button className='btn mx-5' >Message Me</button></Link>
                        </div>
                        <div className="card-body p-4 text-black">
                          <div className="mb-5">
                            <p className="lead fw-normal mb-1">Description</p>
                            <div className="p-4" style={{ backgroundColor: "#f8f9fa" }}>
                              <p className="font-italic mb-1">{details.description}</p>
                              {/* <p className="font-italic mb-1">Lives in New York</p>
                        <p className="font-italic mb-0">Photographer</p> */}
                            </div>
                          </div>
                          {/* <div className="d-flex justify-content-between align-items-center mb-4">
                      <p className="lead fw-normal mb-0">Recent photos</p>
                      <p className="mb-0"><a href="#!" className="text-muted">Show all</a></p>
                    </div> */}
                          <MDBCol lg="12">
                            <MDBCard className="mb-4">
                              <MDBCardBody style={{ backgroundColor: "white" }}>

                                {/* <MDBRow>
                              <MDBCol sm="3">
                                <MDBCardText className='text-start fw-bold'>Gender</MDBCardText>
                              </MDBCol>
                              <MDBCol sm="9">
                                <MDBCardText className="text-black text-start">{details.gender}</MDBCardText>
                              </MDBCol>
                            </MDBRow>
                            <hr /> */}

                                <MDBRow>
                                  <MDBCol sm="3">
                                    <MDBCardText className='text-start fw-bold'>Email</MDBCardText>
                                  </MDBCol>
                                  <MDBCol sm="9">
                                    <MDBCardText className="text-black text-start">{details.email}</MDBCardText>
                                  </MDBCol>
                                </MDBRow>
                                <hr />
                                <MDBRow>
                                  <MDBCol sm="3">
                                    <MDBCardText className='text-start fw-bold'>Phone</MDBCardText>
                                  </MDBCol>
                                  <MDBCol sm="9">
                                    <MDBCardText className="text-black text-start">{details.phone}</MDBCardText>
                                  </MDBCol>
                                </MDBRow>
                                <hr />

                                <MDBRow>
                                  <MDBCol sm="3">
                                    <MDBCardText className='text-start fw-bold'>Activities</MDBCardText>
                                  </MDBCol>
                                  <MDBCol sm="9">
                                    {details.activities?.map((item, index) => {
                                      return (
                                        <MDBCardText key={index} className="text-black text-start">{index + 1}. {item}</MDBCardText>
                                      )
                                    })}
                                  </MDBCol>
                                </MDBRow>
                                <hr />
                                <MDBRow>
                                  <MDBCol sm="3">
                                    <MDBCardText className='text-start fw-bold'>Languages Known</MDBCardText>
                                  </MDBCol>
                                  <MDBCol sm="9">
                                    {details.languages?.map((item, index) => {
                                      return (
                                        <MDBCardText key={index} className="text-black text-start">{index + 1}. {item}</MDBCardText>
                                      )
                                    })}
                                  </MDBCol>
                                </MDBRow>
                                <hr />
                                <MDBRow>
                                  <MDBCol sm="3">
                                    <MDBCardText className='text-start fw-bold'>Amount</MDBCardText>
                                  </MDBCol>
                                  <MDBCol sm="9">
                                    <MDBCardText className="text-black text-start">Rs. {details.price} /day</MDBCardText>
                                  </MDBCol>
                                </MDBRow>
                              </MDBCardBody>
                            </MDBCard>
                          </MDBCol>
                          {/* <div className="row g-2">
              <div className="col mb-2">
                <img src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(112).webp"
                  alt="image 1" className="w-100 rounded-3"/>
              </div>
              <div className="col mb-2">
                <img src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(107).webp"
                  alt="image 1" className="w-100 rounded-3"/>
              </div>
            </div>
            <div className="row g-2">
              <div className="col">
                <img src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(108).webp"
                  alt="image 1" className="w-100 rounded-3"/>
              </div>
              <div className="col">
                <img src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(114).webp"
                  alt="image 1" className="w-100 rounded-3"/>
              </div>
            </div> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
      }
    </>

  )
}

export default GuideSinglePage