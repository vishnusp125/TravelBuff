import React, { useEffect, useState } from 'react'
import PulseLoader from "react-spinners/PulseLoader";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBListGroup,
  MDBListGroupItem,
  MDBCardTitle,
  MDBCardSubTitle,
} from 'mdb-react-ui-kit';
import NavbarGuide from '../../../Components/GuideComponents/Navbar/NavBar/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { guideDetails, guideBookings } from '../../../axios/services/GuideServices';


function GuideHome() {
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState([]);
  const [guideData, setGuideData] = useState([]);
  const [bookings, setBookings] = useState([])
  const [bookingsToShow, setBookingsToShow] = useState([]);

  
  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 500)
  }, [])
  const filteredBookings = bookings.filter(booking => booking.status === "Booked");
  useEffect(() => {
    setBookingsToShow(filteredBookings);
  }, [bookings]);


  const navigate = useNavigate();
  useEffect(() => {
    const guide = JSON.parse(localStorage.getItem('guide'));
    setDetails(guide)
    if (!guide) {
      navigate('/guideSignin');
    } else {
      navigate('/guideHome');
    }
  }, [navigate]);

  useEffect(() => {
    const Curguide = JSON.parse(localStorage.getItem("guide"));
    const guideId = Curguide.result._id
    fetchData(guideId)
  }, []);

  async function fetchData(id) {
    const token = localStorage.getItem('guide');
    const data = await guideDetails(token, id);
    setGuideData(data);
  }
  const activities = guideData?.activities;
  const languages = guideData?.languages;



  const guideId = JSON.parse(localStorage.getItem('guide')).result._id
  const token = JSON.parse(localStorage.getItem('guide')).guide

  async function getBookings() {
    const data = await guideBookings(token, guideId);
    setBookings(data)
  }

  useEffect(() => {
    getBookings()
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
      <NavbarGuide />

      <MDBContainer className="py-5">
        <MDBRow>
          <MDBCol lg="4">
            <MDBCard className="mb-4">
              <MDBCardBody className="text-center">
                <MDBCardImage


                  src={guideData.image}
                  alt="profileImage"
                  // className="rounded-circle"
                  style={{ width: '200px', height: "200px", objectFit: "contain" }}
                  fluid />
                <p className="mb-1" style={{ fontSize: "35px", color: "Black" }}>{guideData?.name}</p>
                <p className="mb-4" style={{ fontSize: "20px", color: "Black" }}>{guideData?.location}</p>
                <div className="d-flex justify-content-center mb-2">
                 <Link to="/editProfile"><MDBBtn>EDIT PROFILE</MDBBtn></Link>
                </div>
              </MDBCardBody>
            </MDBCard>


            <MDBCard className="mb-4 mb-lg-0">
              <MDBCardBody className="p-0">
                <MDBListGroup flush className="rounded-3">
                  <MDBListGroupItem className=" text-align-center p-3">
                    <MDBCardText style={{color:"Black"}} tag="h4">Upcoming Bookings</MDBCardText>
                  </MDBListGroupItem>
                  {bookingsToShow?.length > 0
                      ? bookingsToShow?.map((booking, index) => (
                        <MDBCardSubTitle key={index} className='mx-3 my-3 text-success'>- {booking?.username} booked from {booking?.fromDate} to {booking?.toDate}</MDBCardSubTitle>
                      ))
                      : <MDBCardSubTitle>No Bookings to show</MDBCardSubTitle>
                    }
                </MDBListGroup>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol lg="8">
            <MDBCard className="mb-4">
              <MDBCardBody>
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Full Name</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{guideData?.name}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Email</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{guideData?.email}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Mobile</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{guideData?.phone}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Price</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">Rs. {guideData?.price}/day</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Description</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">
                    {guideData && guideData.description ? guideData.description : "Please enter your description"}
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>

            <MDBRow>
              <MDBCol md="6">
                <MDBCard className="mb-4 mb-md-0">

                  <MDBCardBody>
                    <MDBCardTitle style={{ color: "black", fontWeight: "600", fontSize: "25px" }}>Activities</MDBCardTitle>
                    {activities?.length > 0
                      ? activities?.map((activity, index) => (
                        <MDBCardSubTitle key={index} className="my-2" style={{ color: "green", fontWeight: "500" }}> - {activity}</MDBCardSubTitle>
                      ))
                      : <MDBCardSubTitle>No Activities to show please Complete your profile</MDBCardSubTitle>
                    }
                  </MDBCardBody>

                </MDBCard>
              </MDBCol>
              <MDBCol md="6">
                <MDBCard className="mb-4 mb-md-0">
                  <MDBCardBody>
                    <MDBCardTitle style={{ color: "black", fontWeight: "600", fontSize: "25px" }}>Languages</MDBCardTitle>
                    {languages?.length > 0
                      ? languages?.map((language, index) => (
                        <MDBCardSubTitle key={index} className="my-2" style={{ color: "green", fontWeight: "500" }}> - {language}</MDBCardSubTitle>
                      ))
                      : <MDBCardSubTitle>No Languages to show please Complete your profile</MDBCardSubTitle>
                    }
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>

            </MDBRow>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
    }
    </>
  )
}

export default GuideHome