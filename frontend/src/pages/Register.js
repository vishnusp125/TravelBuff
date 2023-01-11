import React, { useState, useEffect } from 'react'
import {
  MDBBtn, MDBCard, MDBCardBody, MDBCardFooter,
  MDBContainer,
  MDBIcon, MDBInput, MDBNavbar, MDBNavbarBrand, MDBSpinner, MDBValidation
} from "mdb-react-ui-kit"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { register } from '../redux/features/authSlice'
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import { SiYourtraveldottv } from 'react-icons/si';

const initialState = {
  firstName:"",
  lastName:"",
  email: "",
  password: "",
  confirmPassword:"",
  phone:""
};

function Register() {

  const [formValue, setFormValue] = useState(initialState);
  const { loading, error } = useSelector((state) => ({ ...state.auth }));
  const { email, firstName,lastName,password,confirmPassword,phone } = formValue;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    error && toast.error(error)
  }, [error])

  const handleSubmit = (e) => {
    e.preventDefault();
    if(password !== confirmPassword) {
      return toast.error("Password should match")
    }
    if (email && password && firstName && lastName && confirmPassword && phone) {
      dispatch(register({ formValue, navigate, toast }))
    }
  };

  const onInputChange = (e) => {
    let { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  }


  return (
    <>
              <MDBNavbar light bgColor='light'>
        <MDBContainer fluid>
          <MDBNavbarBrand style={{color:"#551a8b"}} href='/'>
          <h1><SiYourtraveldottv className="icon" />
                Travel Buff
              </h1>
          </MDBNavbarBrand>
        </MDBContainer>
      </MDBNavbar>
  
    <div
      style={{
        margin: "auto", padding: "15px", maxWidth: "450px",
        alignContent: "center", marginTop: "120px",color:"#551a8b"
      }}>
      <MDBCard alignment='center'>
        <MDBIcon fas icon='user-circle' className='fa-3x' />
        <h5>Sign Up </h5>
        <MDBCardBody>
          <MDBValidation onSubmit={handleSubmit} noValidate className='row g-3'>

            <div className="col-md-6">
              <MDBInput
                label="First Name"
                type="text"
                value={firstName}
                name="firstName"
                onChange={onInputChange}
                required
                invalid
                validation="Please provide your first name"
              />
            </div>

            <div className="col-md-6">
              <MDBInput
                label="Last Name"
                type="text"
                value={lastName}
                name="lastName"
                onChange={onInputChange}
                required
                invalid
                validation="Please provide your last name"
              />
            </div>

            <div className="col-md-12">
              <MDBInput
                label="Email"
                type="email"
                value={email}
                name="email"
                onChange={onInputChange}
                required
                invalid
                validation="Please provide your email"
              />
            </div>

            <div className="col-md-12">
              <MDBInput
                label="Password"
                type="password"
                value={password}
                name="password"
                onChange={onInputChange}
                required
                invalid="false"
                validation="Please provide your password"
              />
            </div>

            <div className="col-md-12">
              <MDBInput
                label="Password Confirm"
                type="password"
                value={confirmPassword}
                name="confirmPassword"
                onChange={onInputChange}
                required
                invalid="false"
                validation="Please provide your confirm password"
              />
            </div>

            <div className="col-md-12">
              <MDBInput
                label="Phone"
                type="text"
                value={phone}
                name="phone"
                onChange={onInputChange}
                required
                invalid="false"
                validation="Please provide your Phone Number"
              />
            </div>

            <div className="col-12">
              <MDBBtn style={{ width: "100%" }} className="mt-2">
                {loading && (
                  <MDBSpinner
                    size='sm'
                    role="status"
                    tag="span"
                    className='me-2'
                  />
                )}
              Register
              </MDBBtn>
            </div>
          </MDBValidation>
        </MDBCardBody>
        <MDBCardFooter>
          <Link to='/login'>
            <p style={{color: "#551a8b"}}>Already have an account ? <span style={{color: "red"}}>Sign In </span> </p>
          </Link>
        </MDBCardFooter>
      </MDBCard>
    </div>
    </>
  )
}

export default Register