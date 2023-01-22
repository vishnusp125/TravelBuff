import React, { useState, useEffect } from 'react'
import { useFormik } from 'formik';
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux';
import { Guidesignup } from '../../../axios/services/GuideServices'
import Footer from '../../../Components/UserComponents/Footer/Footer';
import { guideSchema } from '../../../validation/validation';
import { SiYourtraveldottv } from 'react-icons/si'
import './GuideSignup.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function GuideSignup() {

  const [image1, setImage1] = useState([]);
  const [image2, setImage2] = useState([]);

  const [error, setError] = useState('');
  const onSubmit = async (values, actions) => {
    console.log('submitted');
    const status = await Guidesignup({values,img1:image1,img2:image2});
    console.log(values);
    if (status.status === 'error') {
      setError('Client already existed');
    } else if (status.status === 'success') {
      toast("Signup request success !!!", {
        type: "success",
        autoClose: 4000
      });
      
    }
  };

  // handle and convert to base64
  const handleImage1 = (e) => {
    const file = e.target.files[0];
    console.log(file);
    setFileToBase(file);
    console.log(file);
  }

  const setFileToBase = (file) => {
    console.log('in setfile to base');
    const reader = new FileReader();
    console.log(reader);
    console.log(reader.result);
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImage1(reader.result);
      console.log(reader.result);
    }
  }

  const handleImage2 = (e) => {
    const file = e.target.files[0];
    setFileToBase2(file);
    console.log(file);
  }

  const setFileToBase2 = (file) => {
    const reader = new FileReader();
    console.log(reader);
    console.log(reader.result);
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImage2(reader.result);
      console.log(reader.result);
    }
  }

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        firstName: '',
        lastName: '',
        email: "",
        password: "",
        confirmPassword: "",
        phone: "",
        image: "",
        certificate: "",
        location: ""
      },
      validationSchema: guideSchema,
      onSubmit,
    });
  console.log(errors);
  const navigate = useNavigate();
  return (
    <>

      <div className="row Csignup-Main py-3 justify-content-center align-items-center" >
        {/* <img src="" alt="modelimage" /> */}
        <section className="py-5">
          <div className="container py-5 h-100 justify-content-center align-items-center bg-dark">
            <div className="row justify-content-center align-items-center h-100">
              <div className="col-12 col-lg-12 col-xl-12">
                <div className="card shadow-2-strong card-registration" style={{ borderRadius: '15px' }}>
                  <div className="card-body p-4 p-md-5">
                    <h3 className="mb-3 text-start">
                      Guide Sign Up Form
                    </h3>
                    <form onSubmit={handleSubmit}>
                      {error ? <p className="red-error">{error}</p> : ''}
                      <div className="row">
                        <div className="col-md-6 mb-4">
                          <div className="form-outline">
                            <label className="form-label">First Name</label>
                            <input
                              style={{ background: "blue" }}
                              type="text"
                              id="firstName"
                              placeholder='first name'
                              value={values.firstName}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className={
                                errors.firstName && touched.firstName
                                  ? 'form-control form-control-lg input-error'
                                  : 'form-control form-control-lg'
                              }
                            />

                            {errors.firstName && touched.firstName && (
                              <p className="red-error">{errors.firstName}</p>
                            )}
                          </div>
                        </div>
                        <div className="col-md-6 mb-4">
                          <div className="form-outline">
                            <label className="form-label">Last Name</label>
                            <input
                              style={{ background: "blue" }}
                              type="text"
                              id="lastName"
                              value={values.lastName}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className={
                                errors.lastName && touched.lastName
                                  ? 'form-control form-control-lg input-error'
                                  : 'form-control form-control-lg'
                              }
                            />
                            {errors.lastName && touched.lastName && (
                              <p className="red-error">{errors.lastName}</p>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-12 mb-4 d-flex align-items-center">
                          <div className="form-outline datepicker w-100">
                            <label className="form-label">Email</label>

                            <input style={{ background: "blue" }}
                              type="email"

                              className={
                                errors.email && touched.email
                                  ? 'form-control form-control-lg input-error'
                                  : 'form-control form-control-lg'
                              }
                              value={values.email}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              id="email"
                            />
                            {errors.email && touched.email && (
                              <p className="red-error">{errors.email}</p>
                            )}
                          </div>
                        </div>
                      </div>


                      <div className="row">
                        <div className="col-md-6 mb-4 pb-2">
                          <div className="form-outline">
                            <label className="form-label">password</label>

                            <input
                              style={{ background: "blue" }}
                              type="password"
                              value={values.password}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              id="password"
                              className={
                                errors.password && touched.password
                                  ? 'form-control form-control-lg input-error'
                                  : 'form-control form-control-lg'
                              }
                            />
                            {errors.password && touched.password && (
                              <p className="red-error">{errors.password}</p>
                            )}
                          </div>
                        </div>
                        <div className="col-md-6 mb-4 pb-2">
                          <div className="form-outline">
                            <label className="form-label">Confirm password</label>
                            <input
                              style={{ background: "blue" }}
                              type="password"
                              id="confirmPassword"
                              value={values.confirmPassword}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className={
                                errors.confirmPassword && touched.confirmPassword
                                  ? 'form-control form-control-lg input-error'
                                  : 'form-control form-control-lg'
                              }
                            />
                            {errors.confirmPassword && touched.confirmPassword && (
                              <p className="red-error">{errors.confirmPassword}</p>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6 mb-4 pb-2">
                          <div className="form-outline">
                            <label className="form-label">Phone</label>

                            <input
                              style={{ background: "blue" }}
                              type="number"
                              id="phone"
                              value={values.phone}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className={
                                errors.phone && touched.phone
                                  ? 'form-control form-control-lg input-error'
                                  : 'form-control form-control-lg'
                              }
                            />
                            {errors.phone && touched.phone && (
                              <p className="red-error">{errors.phone}</p>
                            )}
                          </div>
                        </div>
                        <div className="col-md-6 mb-4 pb-2">
                          <div className="form-outline">
                            <label className="form-label">location</label>
                            <input
                              style={{ background: "blue" }}
                              type="text"
                              id="location"
                              value={values.location}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className={
                                errors.location && touched.location
                                  ? 'form-control form-control-lg input-error'
                                  : 'form-control form-control-lg'
                              }
                            />

                            {errors.location && touched.location && (
                              <p className="red-error">{errors.location}</p>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6 mb-4 pb-2">
                          <div className="form-outline">
                            <label className="form-label">image</label>
                            <input
                              style={{ background: "blue" }}
                              type="file"
                              id="image1"
                              name='image1'
                              // value={values.image}
                              onChange={handleImage1}
                              onBlur={handleBlur}
                              className={
                                errors.image && touched.image
                                  ? 'form-control form-control-lg input-error'
                                  : 'form-control form-control-lg'
                              }
                            />

                            {errors.image && touched.image && (
                              <p className="red-error">{errors.image}</p>
                            )}
                          </div>
                        </div>
                        <div className="col-md-6 mb-4 pb-2">
                          <div className="form-outline">
                            <label className="form-label">certificate</label>
                            <input
                              style={{ background: "blue" }}
                              type="file"
                              name='image2'
                              id="image2"
                              // value={values.certificate}
                              onChange={handleImage2}
                              onBlur={handleBlur}
                              className={
                                errors.certificate && touched.certificate
                                  ? 'form-control form-control-lg input-error'
                                  : 'form-control form-control-lg'
                              }
                            />
                            {errors.certificate && touched.certificate && (
                              <p className="red-error">{errors.certificate}</p>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 pt-2">
                        <input
                          className="btn btn-lg"
                          type="submit"
                          value="Submit"
                        />
                      </div>
                    </form>
                    <h5 className='pt-5'>Already have an account ?<Link to='/guideLogin' className='btnhover'> Sign In</Link></h5>
                    <h5>Or</h5>
                    <h5 className=''>Join as a Guide ?<Link to='/guidesignup' className='btnhover'> Register</Link></h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </>
  )
}

export default GuideSignup