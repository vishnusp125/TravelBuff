import { MDBBtn, MDBCard, MDBCardBody, MDBCardTitle, MDBCol, MDBContainer, MDBInput, MDBNavbar, MDBNavbarBrand } from 'mdb-react-ui-kit'
import React, { useEffect, useRef, useState } from 'react'
import { SiYourtraveldottv } from 'react-icons/si'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { resendOTP } from '../../../axios/services/UserServices'
import Footer from '../../../Components/UserComponents/Footer/Footer'


function ResendOTP() {
    // const [details, setDetails] = useState("")
    const [email, setEmail] = useState('');
    const formRef = useRef(null);
    const navigate = useNavigate()

    const { id } = useParams();

    const handleChange = (e) => {
        setEmail(e.target.value);
    }

    const emailPost = async (e) => {
        e.preventDefault();
        try {
            const response = await resendOTP(email);
            console.log(response);
            // console.log(response.message);
            if  (response.status==="Pending") {
                const id = response.data.userId;
                console.log(id);
                toast.success(response.message)
                navigate(`/verification/${id}`)
                formRef.current.reset()
            }
            else if(response.message) {
                toast.error(response.message)
            }
        
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div>
            <MDBNavbar light bgColor='light'>
                <MDBContainer fluid>
                    <MDBNavbarBrand style={{ color: "#551a8b" }} href='/'>
                        <h1><SiYourtraveldottv className="icon" />
                            Travel Buff
                        </h1>
                    </MDBNavbarBrand>
                </MDBContainer>
            </MDBNavbar>
            
            <div className="h-100 d-flex justify-content-center align-items-center mt-4" style={{ minHeight: "600px" }}>

                <MDBCol className='px-3' lg="4">
                    <MDBCard>
                        <MDBCardBody >
                            <MDBCardTitle className="text-center m-4">Enter Your Email</MDBCardTitle>
                            <form ref={formRef} onSubmit={emailPost}>
                                <MDBInput type={"email"} required label="Enter the email" onChange={handleChange} />
                                <div className='m-2 text-center'>
                                    <MDBBtn className='m-4'>Submit</MDBBtn>
                                </div>
                            </form>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </div>

            <Footer />
        </div>

    )
}

export default ResendOTP