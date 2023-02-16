import React from 'react'
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBTypography, MDBIcon } from 'mdb-react-ui-kit';
import Navbar from '../../../Components/UserComponents/Navbar/Navbar';
import Footer from '../../../Components/UserComponents/Footer/Footer';
import { Button } from 'antd';


function UserProfile() {

    const user = JSON.parse(localStorage.getItem("profile"))
    const User = user.result
    return (
        <>
            <Navbar />
            <section className="vh-100" style={{ backgroundColor: '#f4f5f7' }}>
                <MDBContainer className="py-5 h-100">
                    <MDBRow className="justify-content-center align-items-center h-100">
                        <MDBCol lg="12" className="mb-4 mb-lg-0">
                            <MDBCard className="mb-3" style={{ borderRadius: '.5rem' }}>
                                <MDBRow className="g-0">
                                    <MDBCol md="4" className="gradient-custom text-center text-white"
                                        style={{ borderTopLeftRadius: '.5rem', borderBottomLeftRadius: '.5rem' }}>
                                        <MDBCardImage src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                                            alt="Avatar" className="my-5" style={{ width: '80px' }} fluid />
                                        <MDBTypography tag="h5" className='text-danger'>{User.name}</MDBTypography>
                                        <Button className='mb-5'>Edit Profile</Button>
                                    </MDBCol>
                                    <MDBCol md="8">
                                        <MDBCardBody className="p-4">
                                            <MDBTypography tag="h6" className='mt-5'>Information</MDBTypography>
                                            <hr className="mt-0 mb-4" />
                                            <MDBRow className="pt-1">
                                                <MDBCol size="6" className="mb-3">
                                                    <MDBTypography tag="h6">Email</MDBTypography>
                                                    <MDBCardText className="text-muted">{User.email}</MDBCardText>
                                                </MDBCol>
                                                <MDBCol size="6" className="mb-3">
                                                    <MDBTypography tag="h6">Phone</MDBTypography>
                                                    <MDBCardText className="text-muted">{User.phone}</MDBCardText>
                                                </MDBCol>
                                            </MDBRow>
                                        </MDBCardBody>
                                    </MDBCol>
                                </MDBRow>
                            </MDBCard>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </section>
            <Footer />
        </>
    )
}

export default UserProfile