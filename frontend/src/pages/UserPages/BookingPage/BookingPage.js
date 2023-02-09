import { MDBCard, MDBCardBody, MDBCardImage, MDBCardText, MDBCardTitle, MDBCol, MDBRow } from 'mdb-react-ui-kit'
import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { guideBooking, guideSingle, orderVerifyPayment } from '../../../axios/services/UserServices';
import Navbar from '../../../Components/UserComponents/Navbar/Navbar'
import moment from 'moment';
import useRazorpay from 'react-razorpay';
import Footer from '../../../Components/UserComponents/Footer/Footer';

function BookingPage() {
    const navigate = useNavigate();
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

    const Razorpay = useRazorpay();

    const doPayment = useCallback(async () => {
        const bookingDetails = {
            username,
            guidedetails,
            userid,
            fromDate,
            toDate,
            totalAmount,
            totalDays,
        }

        try {

            const result = await guideBooking(bookingDetails, jwtToken)
            const options = {
                key: 'rzp_test_BBlNJOeGGPkzYf',
                amount: result.order.amount,
                currency: 'INR',
                name: 'TravelBuff',
                description: 'Test Transaction',
                image: 'https://example.com/your_logo',
                order_id: result.order.id,
                handler: (res) => {
                    verifyPayment(res, result.order);
                },
                prefill: {
                    name: 'Piyush Garg',
                    email: 'youremail@example.com',
                    contact: '9999999999',
                },
                notes: {
                    address: 'Razorpay Corporate Office',
                },
                theme: {
                    color: '#551a8b',
                },
            };

            const rzpay = new Razorpay(options);
            rzpay.open();
            async function verifyPayment(res, order) {
                const verification = await orderVerifyPayment(jwtToken, res, order);
                if (verification.status) {
                    toast.success("Booking Successfull !!!")
                    navigate('/bookings');
                } else {
                    toast.error("Payment failed please try again")
                }
            }
        } catch (error) {
            console.log(error)
        }
    }, [
        Razorpay,
        fromDate,
        guidedetails,
        toDate,
        totalAmount,
        totalDays,
        userid,
        username,
        navigate,
        jwtToken
    ])
    return (
        <div >
            <div style={{ height: "100px" }}>
                <Navbar />
            </div>
            <MDBCard className="m-5">
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
                                <button className="btn btn-outline-dark mb-4" onClick={doPayment}>Pay Now</button>
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