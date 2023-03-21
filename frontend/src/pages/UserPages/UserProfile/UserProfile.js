import React, { useEffect, useState } from 'react';
import PulseLoader from "react-spinners/PulseLoader";
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBTypography, MDBIcon, MDBInput } from 'mdb-react-ui-kit';
import Navbar from '../../../Components/UserComponents/Navbar/Navbar';
import Footer from '../../../Components/UserComponents/Footer/Footer';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { toast } from 'react-toastify';
import { Button } from 'antd';
import { userDetails, UserEditProfile } from '../../../axios/services/UserServices';
import { useNavigate } from 'react-router-dom';


function UserProfile() {
    const [loading, setLoading] = useState(false);

    const Token = JSON.parse(localStorage.getItem("profile")).token

    const [userData, setUserData] = useState("")
    const userid = JSON.parse(localStorage.getItem("profile"))?.result?._id
    const navigate = useNavigate();

    async function fetchData() {
        setLoading(true)
        const data = await userDetails(Token, userid);
        setUserData(data);
        setLoading(false)
    }

    // useEffect(() => {
    //     setLoading(true)
    //     setTimeout(() => {
    //         setLoading(false)
    //     }, 500)
    // }, [])

    useEffect(() => {
        fetchData()
    }, []);

    const [showEditProfile, setShowEditProfile] = useState(false);

    if (!userData) {
        return <div>
            <PulseLoader
                color={"#551a8b"}
                loading={loading}
                style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
                size={30}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
        </div>
    }

    const handleEditProfile = () => {
        setShowEditProfile(true);
    }

    const handleSubmit = async (values, { setSubmitting }) => {
        const data = {
            name: values.name,
            phone: values.phone,
        };
        const result = await UserEditProfile(Token, data, userid);
        if (result.status) {
            setSubmitting(false);
            toast.success("Updated Successfully")
            navigate('/profile')
            setShowEditProfile(false);
            fetchData()
        }
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
                        <Formik
                            initialValues={{ name: userData?.name, phone: userData?.phone }}
                            validate={values => {
                                const errors = {};
                                if (!values.name) {
                                    errors.name = 'Name is required';
                                }
                                if (!values.phone) {
                                    errors.phone = 'Phone number is required';
                                }

                                return errors;
                            }}
                            onSubmit={handleSubmit}
                        >
                            {({ isSubmitting, setFieldValue, values }) => (
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
                                                                <MDBTypography tag="h5" className='text-danger'>{userData?.name}</MDBTypography>
                                                                <Button className='mb-5' onClick={handleEditProfile}>Edit Profile</Button>
                                                            </MDBCol>
                                                            <MDBCol md="8">
                                                                <MDBCardBody className="p-4">
                                                                    <MDBTypography tag="h6" className='mt-5'>Information</MDBTypography>
                                                                    <hr className="mt-0 mb-4" />
                                                                    <MDBRow className="pt-1">
                                                                        <MDBCol size="6" className="mb-3">
                                                                            <MDBTypography tag="h6">Email</MDBTypography>
                                                                            <MDBCardText className="text-muted">{userData?.email}</MDBCardText>
                                                                        </MDBCol>
                                                                        <MDBCol size="6" className="mb-3">
                                                                            <MDBTypography tag="h6">Phone</MDBTypography>
                                                                            <MDBCardText className="text-muted">{userData?.phone}</MDBCardText>
                                                                        </MDBCol>
                                                                    </MDBRow>
                                                                    <MDBRow size="6" className="pt-1">
                                                                        {showEditProfile &&
                                                                            <>
                                                                                <Form>
                                                                                    <MDBTypography tag="h6" className='mt-3 mb-1 '>Enter your details</MDBTypography>
                                                                                    <hr />
                                                                                    <div className=''>
                                                                                        <label htmlFor="name">Enter your Full Name</label>
                                                                                        <Field type="text" className="form-control mb-2" id="name" name="name" style={{ flex: 1 }} />
                                                                                        <ErrorMessage name="name" component="div" className="" style={{ color: 'red' }} />
                                                                                        <label htmlFor="name">Enter your Phone Number</label>
                                                                                        <Field type="number" className="form-control mb-2" id="phone" name="phone" style={{ flex: 1 }} />
                                                                                        <ErrorMessage name="phone" component="div" className="" style={{ color: 'red' }} />
                                                                                    </div>
                                                                                    <button type='submit' className='btn' disabled={isSubmitting}>Save Profile</button>
                                                                                </Form>
                                                                            </>
                                                                        }
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
                            )}
                        </Formik>
                    </div>
            }
        </>
    )
}

export default UserProfile