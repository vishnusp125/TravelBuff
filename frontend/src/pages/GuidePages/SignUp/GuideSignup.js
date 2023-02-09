import React, { useEffect, useState } from 'react'
import PulseLoader from "react-spinners/PulseLoader";
import { useFormik } from 'formik';
import { Link, useNavigate } from "react-router-dom"
import { Guidesignup } from '../../../axios/services/GuideServices'
import Footer from '../../../Components/UserComponents/Footer/Footer.jsx';
import { guideSchema } from '../../../validation/validation';
import { SiYourtraveldottv } from 'react-icons/si'
import './GuideSignup.css'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MDBContainer, MDBNavbar, MDBNavbarBrand } from 'mdb-react-ui-kit';

function GuideSignup() {

  const [loading, setLoading] = useState(false);
  const [image1, setImage1] = useState([]);
  const [image2, setImage2] = useState([]);

  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 500)
  }, [])


  const navigate = useNavigate();

  const [error, setError] = useState('');
  const onSubmit = async (values, actions) => {
    setLoading(true)
    const status = await Guidesignup({ values, img1: image1, img2: image2 });
  
    if (status.status === 'error') {
      setError('Client already existed');
    } else if (status.status === 'success') {
      toast("Signup request success !!!", {
        type: "success",
        autoClose: 4000
      });
      navigate('/guideSignin')
      setLoading(false)
    }
  };

  // handle and convert to base64
  const handleImage1 = (e) => {
    const file = e.target.files[0];
    setFileToBase(file);

  }

  const setFileToBase = (file) => {

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImage1(reader.result);
    }
  }

  const handleImage2 = (e) => {
    const file = e.target.files[0];
    setFileToBase2(file);
  }

  const setFileToBase2 = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImage2(reader.result);
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
        image1: "",
        image2: "",
        location: ""
      },
      validationSchema: guideSchema,
      onSubmit,
    });
  console.log(errors);

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

            <MDBNavbar light bgColor='light'>
              <MDBContainer fluid>
                <MDBNavbarBrand style={{ color: "#551a8b" }} href='/'>
                  <h1><SiYourtraveldottv className="icon" />
                    Travel Buff
                  </h1>
                </MDBNavbarBrand>
              </MDBContainer>
            </MDBNavbar>
            <h1 className='text-center font-weight-bold my-3'>Travel Guide Sign Up Form</h1>

            <div className="row Csignup-Main py-3 px-5 justify-content-center align-items-center no-scroll"  >
              <section>
                <div className="container py-5 h-100 justify-content-center align-items-center"  >
                  <div className="row justify-content-center align-items-center h-100" >
                    <div className="col-md-8 col-lg-8 mx-auto" >
                      <div className="card shadow-2-strong card-registration" style={{ borderRadius: '15px' }}>
                        <div className="card-body p-4 p-md-5">
                          <h3 className="mb-3 text-center">
                            Join us Now !!!
                          </h3>
                          <form onSubmit={handleSubmit}>
                            {error ? <p className="red-error">{error}</p> : ''}
                            <div className="row">
                              <div className="col-md-6 mb-4">
                                <label className="form-label">First Name</label>
                                <input
                                  // style={{ background: "beige" }}
                                  type="text"
                                  id="firstName"
                                  // placeholder='Enter your First name'
                                  value={values.firstName}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  className={
                                    errors.firstName && touched.firstName
                                      ? 'form-control form-control-md sample'
                                      : 'form-control form-control-m sample'
                                  }
                                />

                                {errors.firstName && touched.firstName && (
                                  <p className="red-error">{errors.firstName}</p>
                                )}

                              </div>
                              <div className="col-md-6 mb-4">

                                <label className="form-label">Last Name</label>
                                <input

                                  type="text"
                                  id="lastName"
                                  value={values.lastName}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  className={
                                    errors.lastName && touched.lastName
                                      ? 'form-control form-control-lg sample'
                                      : 'form-control form-control-lg sample'
                                  }
                                />
                                {errors.lastName && touched.lastName && (
                                  <p className="red-error">{errors.lastName}</p>
                                )}

                              </div>
                            </div>

                            <div className="row">
                              <div className="col-md-12 mb-4 pb-2 ">
                                <label className="form-label">Email</label>
                                <br />
                                <input
                                  type="email"

                                  className={
                                    errors.email && touched.email
                                      ? 'form-control form-control-lg sample'
                                      : 'form-control form-control-lg sample'
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


                            <div className="row">
                              <div className="col-md-6 mb-4 pb-2">

                                <label className="form-label">Password</label>

                                <input

                                  type="password"
                                  value={values.password}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  id="password"
                                  className={
                                    errors.password && touched.password
                                      ? 'form-control form-control-lg sample'
                                      : 'form-control form-control-lg sample'
                                  }
                                />
                                {errors.password && touched.password && (
                                  <p className="red-error">{errors.password}</p>
                                )}

                              </div>
                              <div className="col-md-6 mb-4 pb-2">

                                <label className="form-label">Confirm password</label>
                                <input

                                  type="password"
                                  id="confirmPassword"
                                  value={values.confirmPassword}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  className={
                                    errors.confirmPassword && touched.confirmPassword
                                      ? 'form-control form-control-lg sample'
                                      : 'form-control form-control-lg sample'
                                  }
                                />
                                {errors.confirmPassword && touched.confirmPassword && (
                                  <p className="red-error">{errors.confirmPassword}</p>
                                )}

                              </div>
                            </div>
                            <div className="row">
                              <div className="col-md-6 mb-4 pb-2">

                                <label className="form-label">Phone</label>

                                <input

                                  type="number"
                                  id="phone"
                                  value={values.phone}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  className={
                                    errors.phone && touched.phone
                                      ? 'form-control form-control-lg sample'
                                      : 'form-control form-control-lg sample'
                                  }
                                />
                                {errors.phone && touched.phone && (
                                  <p className="red-error">{errors.phone}</p>
                                )}

                              </div>
                              <div className="col-md-6 mb-4 pb-2">

                                <label className="form-label">Location</label>
                                <input

                                  type="text"
                                  id="location"
                                  value={values.location}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  className={
                                    errors.location && touched.location
                                      ? 'form-control form-control-lg sample'
                                      : 'form-control form-control-lg sample'
                                  }
                                />
                                {errors.location && touched.location && (
                                  <p className="red-error">{errors.location}</p>
                                )}

                              </div>
                            </div>

                            <div className="row">
                              <div className="col-md-6 mb-4 pb-2">

                                <label className="form-label">Upload your Image</label>
                                <input
                                  type="file"
                                  id="image1"
                                  name='image1'
                                  // value={values.image1}
                                  onChange={handleImage1}
                                  onBlur={handleBlur}
                                  className={
                                    errors.image1 && touched.image1
                                      ? 'form-control form-control-lg sample'
                                      : 'form-control form-control-lg sample'
                                  }
                                />

                                {errors.image1 && touched.image1 && (
                                  <p className="red-error">{errors.image1}</p>
                                )}

                              </div>

                              <div className="col-md-6 mb-4 pb-2">

                                <label className="form-label">Upload your guide certificate</label>
                                <input
                                  type="file"
                                  name='image2'
                                  id="image2"
                                  // value={values.image2}
                                  onChange={handleImage2}
                                  onBlur={handleBlur}
                                  className={
                                    errors.image2 && touched.image2
                                      ? 'form-control form-control-lg sample'
                                      : 'form-control form-control-lg sample'
                                  }
                                />
                                {errors.image2 && touched.image2 && (
                                  <p className="red-error">{errors.image2}</p>
                                )}

                              </div>
                            </div>
                            <div className="mt-4 pt-2">
                              <input
                                className="btn btn-lg"
                                type="submit"
                                value="Sign Up"
                              />
                            </div>
                          </form>
                          <h5 className='pt-5'>Already have an account ?<Link to='/guideSignin' className='btnhover'> Sign In</Link></h5>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            <Footer />
          </div>
      }
    </>
  )
}

export default GuideSignup