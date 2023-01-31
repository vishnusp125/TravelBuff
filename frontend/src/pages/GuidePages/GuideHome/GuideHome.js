import React, { useEffect, useState } from 'react'
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
import { useNavigate } from 'react-router-dom';
import { guideDetails } from '../../../axios/services/GuideServices';


function GuideHome() {
  const [details, setDetails] = useState([]);
  const [guideData, setGuideData] = useState([]);


  const navigate = useNavigate();
  useEffect(() => {
    const guide = JSON.parse(localStorage.getItem('guide'));
    setDetails(guide)
    if (guide) {
      navigate('/guideHome');
    } else {
      navigate('/guideSignin');
    }
  }, [navigate]);

  useEffect(() => {
    const Curguide = JSON.parse(localStorage.getItem("guide"));
    // console.log("1111",guide);
    const guideId = Curguide.result._id
    console.log("useEffectt", guideId);
    fetchData(guideId)
  }, []);

  useEffect(() => {
    fetchData()
  }, [])

  async function fetchData(id) {
    const token = localStorage.getItem('guide');
    const data = await guideDetails(token, id);
    setGuideData(data);
    console.log("loggg", data);
    if (data) {
      // fetchData()
    }
  }
  const activities = guideData?.activities;
  console.log("helooo", activities);
  const languages = guideData?.languages;

  console.log("guideDatraaa", guideData);

  return (
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
                  <MDBBtn>EDIT PROFILE</MDBBtn>
                  {/* <MDBBtn outline className="ms-1">Message</MDBBtn> */}
                </div>
              </MDBCardBody>
            </MDBCard>


            <MDBCard className="mb-4 mb-lg-0">
              <MDBCardBody className="p-0">
                <MDBListGroup flush className="rounded-3">
                  <MDBListGroupItem className=" text-align-center p-3">
                    <MDBCardText>Upcoming Bookings</MDBCardText>
                  </MDBListGroupItem>

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
                    <MDBCardText className="text-muted">{guideData?.description}</MDBCardText>
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
                        <MDBCardSubTitle key={index} style={{ color: "green", fontWeight: "500" }}> - {activity}</MDBCardSubTitle>
                      ))
                      : <MDBCardSubTitle>No Activities to show please Complete your profile</MDBCardSubTitle>
                    }
                  </MDBCardBody>

                </MDBCard>
              </MDBCol>
              {/* 
              <MDBCol md="6">
                <MDBCard className="mb-4 mb-md-0">
                  <MDBCardBody>
                    <MDBCardText className="mb-4"><span className="text-primary font-italic me-1">assigment</span> Project Status</MDBCardText>
                    <MDBCardText className="mb-1" style={{ fontSize: '.77rem' }}>Web Design</MDBCardText>
                    <MDBProgress className="rounded">
                      <MDBProgressBar width={80} valuemin={0} valuemax={100} />
                    </MDBProgress>

                    <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Website Markup</MDBCardText>
                    <MDBProgress className="rounded">
                      <MDBProgressBar width={72} valuemin={0} valuemax={100} />
                    </MDBProgress>

                    <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>One Page</MDBCardText>
                    <MDBProgress className="rounded">
                      <MDBProgressBar width={89} valuemin={0} valuemax={100} />
                    </MDBProgress>

                    <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Mobile Template</MDBCardText>
                    <MDBProgress className="rounded">
                      <MDBProgressBar width={55} valuemin={0} valuemax={100} />
                    </MDBProgress>

                    <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Backend API</MDBCardText>
                    <MDBProgress className="rounded">
                      <MDBProgressBar width={66} valuemin={0} valuemax={100} />
                    </MDBProgress>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol> */}

              <MDBCol md="6">
                <MDBCard className="mb-4 mb-md-0">
                  <MDBCardBody>
                    <MDBCardTitle style={{ color: "black", fontWeight: "600", fontSize: "25px" }}>Languages</MDBCardTitle>
                    {languages?.length > 0
                      ? languages?.map((language, index) => (
                        <MDBCardSubTitle key={index} style={{ color: "green", fontWeight: "500" }}> - {language}</MDBCardSubTitle>
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
  )
}

export default GuideHome