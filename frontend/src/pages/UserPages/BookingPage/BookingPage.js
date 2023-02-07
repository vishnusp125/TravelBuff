import { MDBCard, MDBCardBody, MDBCardImage, MDBCardText, MDBCardTitle, MDBCol, MDBRow } from 'mdb-react-ui-kit'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { guideBooking, guideSingle } from '../../../axios/services/UserServices';
import Navbar from '../../../Components/UserComponents/Navbar/Navbar'
import moment from 'moment';
import StripeCheckout from 'react-stripe-checkout';
import Footer from '../../../Components/UserComponents/Footer/Footer';

function BookingPage() {
    const { id } = useParams();
    const { from } = useParams();
    const { to } = useParams();

    async function guideDetails() {
        const data = await guideSingle(id, jwtToken);
        setGuideDetails(data);
    }
    useEffect(() => {
        guideDetails()
    }, [])


    const toDate = moment(to, "DD-MM-YYYY")
    const fromDate = moment(from, "DD-MM-YYYY")
    const totalDays = moment.duration(toDate.diff(fromDate)).asDays() + 1;
    const jwtToken = JSON.parse(localStorage.getItem('profile')).token
    const userid = JSON.parse(localStorage.getItem('profile')).result._id
    const username = JSON.parse(localStorage.getItem('profile')).result.name

    const [guidedetails, setGuideDetails] = useState()
    const totalAmount = totalDays * guidedetails?.price

    async function bookGuide() {
        const bookingDetails = {
            username,
            guidedetails,
            userid,
            fromDate,
            toDate,
            totalAmount,
            totalDays
        }
        try {
            const result = await guideBooking(bookingDetails)

        } catch {

        }

    }

    async function onToken(token) {
        console.log(token);
        const bookingDetails = {
            username,
            guidedetails,
            userid,
            fromDate,
            toDate,
            totalAmount,
            totalDays,
            token
        }
        try {
            const result = await guideBooking(bookingDetails)

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div >
            <div style={{ height: "100px" }}>
                <Navbar />
            </div>
            <MDBCard style={{}} className="m-5">
                <MDBRow className='g-0'>
                    <MDBCol md='4'>
                        <MDBCardImage style={{ height: "200px", width: "150px" }} className="mx-5 my-5" src={guidedetails?.image} alt='...' fluid />
                    </MDBCol>
                    <MDBCol md='8'>
                        <MDBCardBody>
                            <MDBCardTitle className='text-danger'>Booking Details</MDBCardTitle>
                            <hr />
                            <div>
                                <p className='text-dark'>Name of the guide: <b>{guidedetails?.name}</b> </p>
                                <p className='text-dark'>From Date: <b>{from} </b></p>
                                <p className='text-dark'>To Date: <b>{to}</b></p>
                                <p className='text-dark'>Location: <b>{guidedetails?.location} </b></p>
                            </div>
                            <div>
                                <MDBCardTitle className='text-danger'>Amount Details</MDBCardTitle>
                                <hr />
                                <p className='text-dark'>Amount per day: Rs.{guidedetails?.price}/-</p>
                                <p className='text-dark'>No: of days: {totalDays}</p>
                                <b><p className='text-dark'>Total Amount: Rs.{totalAmount}/-</p></b>
                            </div>
                            <div style={{ float: "right" }}>

                                <StripeCheckout
                                    token={onToken}
                                    amount={totalAmount}
                                    currency="INR"
                                    stripeKey="pk_test_51MYixKSFRPUBWQdzfRc2ZuER1DJa7as4V5b1Yk76nA6E117owWRR5EvhSGh1m0G0Fc612qaDtHmIZFBl9RhzVkcl00iG2mLcjI"
                                >
                                    <button className="btn btn-outline-dark mb-4">Pay Now</button>
                                </StripeCheckout>
                            </div>
                        </MDBCardBody>
                    </MDBCol>
                </MDBRow>
            </MDBCard>
            <Footer />
        </div>
    )
}

export default BookingPage