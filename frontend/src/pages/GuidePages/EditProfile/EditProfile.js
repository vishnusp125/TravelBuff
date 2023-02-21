import React, { useEffect, useState } from 'react'
import NavbarGuide from '../../../Components/GuideComponents/Navbar/NavBar/Navbar';
import { activityDelete, editProfile, guideDetails, languageDelete } from '../../../axios/services/GuideServices';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { toast } from 'react-toastify';
import './EditProfile.css';
import { Link, useNavigate } from 'react-router-dom';

function EditProfile() {
    const guideId = JSON.parse(localStorage.getItem("guide")).result._id
    const Token = JSON.parse(localStorage.getItem("guide")).guide
    const navigate = useNavigate();



    const [guideData, setGuideData] = useState("")
    async function fetchData() {
        const data = await guideDetails(Token, guideId);
        setGuideData(data);
    }

    useEffect(() => {
        fetchData()
    }, []);
    const activities = guideData?.activities;
    const languages = guideData?.languages;

    const handleSubmit = async (values, { setSubmitting }) => {
        const data = {
            name: values.name,
            email: values.email,
            phone: values.phone,
            location: values.location,
            image: values.image
        };
        const result = await editProfile(Token, data, guideId);
        if (result.status) {
            setSubmitting(false);
            toast.success("Updated Successfully")
            navigate('/guideHome')
        }
    }

    if (!guideData) {
        return <div>Loading....</div>
    }

    const handleDeleteActivity = async (index) => {
        const result = await activityDelete(guideId, index, Token)
        if (result) {
            toast.success(result)
            fetchData()
        }
    }

    const handleDeleteLanguage = async (index) => {
        const result = await languageDelete(guideId, index, Token)
        if (result) {
            toast.success(result)
            fetchData()
        }
    }

    return (
        <Formik
            initialValues={{ name: guideData?.name, email: guideData?.email, phone: guideData?.phone, location: guideData?.location, image: guideData?.image }}
            validate={values => {
                const errors = {};
                if (!values.name) {
                    errors.name = 'Name is required';
                }
                if (!values.email) {
                    errors.email = 'Email is required';
                } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                    errors.email = 'Invalid email address';
                }
                if (!values.phone) {
                    errors.phone = 'Phone number is required';
                }
                if (!values.location) {
                    errors.location = 'Location is required';
                }
                return errors;
            }}
            onSubmit={handleSubmit}
        >
            {({ isSubmitting, setFieldValue, values }) => (
                <>
                    <NavbarGuide />
                    <div className="mx-5 my-5">
                        <div className="row gutters">
                            <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
                                <div className="card h-100">
                                    <div className="card-body">
                                        <div className="account-settings">
                                            <div className="user-profile">
                                                <div className="user-avatar">
                                                    {/* <img src={guideData?.image} alt="gudieImage" /> */}
                                                    <div className='mx-3 my-3' style={{ width: "250px", height: "30px" }}>
                                                        {guideData?.image && <img src={values?.image || guideData?.image} alt="Profile Image" className='float-start mb-2' style={{ width: '100px', height: '110px' }} />}
                                                        <div className='px-2'>
                                                            <input style={{ height: "40px" }} type="file" id="image" name="image" className="form-control" placeholder='choose'
                                                                onChange={(event) => {
                                                                    const file = event.currentTarget.files[0];
                                                                    const reader = new FileReader();
                                                                    reader.readAsDataURL(file);
                                                                    reader.onloadend = () => {
                                                                        setFieldValue("image", reader.result);
                                                                        const img = document.getElementById('image-preview');
                                                                        if (img) {
                                                                            img.src = reader.result;
                                                                        }
                                                                    }
                                                                }} />
                                                        </div>
                                                    </div>
                                                </div>
                                                <h5 className="user-name">{guideData?.name}</h5>
                                                <h6 className="user-email">{guideData?.email}</h6>
                                            </div>
                                            <div className="about mt-5 p-5">
                                                <h5 className=''>Description</h5>
                                                <p>{guideData.description}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">

                                <Form>
                                    <div className="card h-100">
                                        <div className="card-body">
                                            <div className="row gutters">
                                                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                    <h5 className="mb-2 text-primary">Edit Details</h5>
                                                </div>
                                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12 my-3">
                                                    <div className="form-group">
                                                        <label htmlFor="name">Full Name</label>
                                                        <Field type="text" className="form-control" id="name" name="name" />
                                                        <ErrorMessage name="name" component="div" className="" style={{ color: 'red' }} />
                                                    </div>
                                                </div>
                                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12 my-3">
                                                    <div className="form-group">
                                                        <label htmlFor="email">Email</label>
                                                        <Field type="email" className="form-control" id="email" name="email" />
                                                        <ErrorMessage name="email" component="div" className="" style={{ color: 'red' }} />
                                                    </div>
                                                </div>
                                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                                    <div className="form-group">
                                                        <label htmlFor="phone">Phone</label>
                                                        <Field type="number" className="form-control" id="phone" name="phone" />
                                                        <ErrorMessage name="phone" component="div" className="" style={{ color: 'red' }} />
                                                    </div>
                                                </div>
                                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                                    <div className="form-group">
                                                        <label htmlFor="website">Location</label>
                                                        <Field type="text" className="form-control" id="location" name="location" />
                                                        <ErrorMessage name="location" component="div" className="" style={{ color: 'red' }} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row gutters">
                                                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 mt-5">
                                                    <div className="text-right">
                                                        <Link to="/guideHome"><button type="button" className="btn mx-3" style={{ backgroundColor: "Red" }}>Cancel</button></Link>
                                                        <button type="submit" className="btn" disabled={isSubmitting} style={{ backgroundColor: "green" }}>Update</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Form>
                                <div className='col-md-12 d-flex'>
                                    <div className="card py-3 col-md-6" style={{ marginRight: "10px" }} >
                                        <div className="card-body">
                                            <div className="row gutters">
                                                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                    <h5 className="mb-3 text-primary">Activity Management</h5>

                                                    {activities?.length > 0
                                                        ? activities?.map((activity, index) => (
                                                            <div className='d-flex' key={index}>
                                                                <p className='text-success' key={index}> - {activity}</p><span>
                                                                    <i className="fa fa-trash mx-3 text-danger" style={{ cursor: "pointer" }} onClick={() => handleDeleteActivity(index)}></i>
                                                                </span>
                                                            </div>
                                                        ))
                                                        : <p>No Activities to show please Complete your profile</p>
                                                    }
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                    <div className="card py-3 col-md-6">
                                        <div className="card-body">
                                            <div className="row gutters">
                                                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                    <h5 className="mb-3 text-primary">Language Management</h5>

                                                    {activities?.length > 0
                                                        ? languages?.map((activity, index) => (
                                                            <div className='d-flex' key={index}>
                                                                <p className='text-success' key={index}> - {activity}</p>
                                                                <span>
                                                                    <i className="fa fa-trash mx-3 text-danger" style={{ cursor: "pointer" }} onClick={() => handleDeleteLanguage(index)}></i>
                                                                </span>
                                                            </div>
                                                        ))
                                                        : <p>No Languages to show please Complete your profile</p>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </Formik>
    )
}

export default EditProfile