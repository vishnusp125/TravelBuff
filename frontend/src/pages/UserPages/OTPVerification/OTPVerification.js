import { MDBBtn, MDBCard, MDBCardBody, MDBCardTitle, MDBCol, MDBContainer, MDBInput, MDBNavbar, MDBNavbarBrand } from 'mdb-react-ui-kit'
import React, { useEffect, useRef, useState } from 'react'
import { SiYourtraveldottv } from 'react-icons/si'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { verifyOtp } from '../../../axios/services/UserServices'
import Footer from '../../../Components/UserComponents/Footer/Footer'




function OTPVerification() {

    // const [details, setDetails] = useState("")
    const [otp, setOtp] = useState('');
    const formRef = useRef(null);
    const navigate = useNavigate()

    const { id } = useParams();

    const handleChange = (e) => {
        setOtp(e.target.value);
    }

    const otpPst = async (e) => {
        e.preventDefault();
        // const otpData = { otp, id };
        console.log(otp);
        console.log(id);
        try {
            const response = await verifyOtp(otp, id);
            console.log(response);
            if (response.status==="Success") {
                toast.success(response.message)
                navigate('/login')
            } else {
                toast.error(response.message)
            }
            formRef.current.reset()
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

            {/* <div className="h-100 d-flex justify-content-center align-items-center mt-4" style={{minHeight:"600px"}}>
                <div className="card" style={{ width: '30%' }}>
                    <div className="card-body">
                        <h5 className="card-title text-center">Enter Your OTP</h5>
                        <form>
                            <div className="form-group">
                                <input type="number" className="form-control" placeholder="Enter OTP" />
                            </div>
                            <button type="submit" className="btn btn-primary btn-block mt-5">Submit</button>
                        </form>
                    </div>
                </div>

            </div> */}
            <div className="h-100 d-flex justify-content-center align-items-center mt-4" style={{ minHeight: "600px" }}>

                <MDBCol className='px-3' lg="4">
                    <MDBCard>
                        <MDBCardBody >
                            <MDBCardTitle className="text-center m-4">Enter Your OTP</MDBCardTitle>
                            <form ref={formRef} onSubmit={otpPst}>
                                <MDBInput type={"number"} required label="Enter the OTP" onChange={handleChange} />
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

export default OTPVerification