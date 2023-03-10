import React, { useState, useEffect } from 'react'
import {
    MDBBtn, MDBCard, MDBCardBody, MDBCardFooter,
    MDBContainer,
    MDBIcon, MDBInput, MDBNavbar, MDBNavbarBrand, MDBSpinner, MDBValidation, MDBValidationItem
} from "mdb-react-ui-kit"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { login } from '../../redux/features/authSlice';
import { adminlogin } from '../../../axios/services/AdminServices.js';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import { SiYourtraveldottv } from 'react-icons/si'


const initialState = {
    email: "",
    password: "",
};

function AdminLogin() {

    const [formValue, setFormValue] = useState(initialState);
    const { loading, error } = useSelector((state) => ({ ...state.admin }));
    const { email, password } = formValue;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        error && toast.error(error)
    }, [error])

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email && password) {
            dispatch(adminlogin({ formValue, navigate, toast }))
        }
    };

    const onInputChange = (e) => {
        let { name, value } = e.target;
        setFormValue({ ...formValue, [name]: value });
    }
    useEffect(() => {
        const token = localStorage.getItem('admin');
        if (!token) {
          navigate('/adminLogin');
        } else {
          navigate('/admin');
        }
      }, [navigate])

    return (
        <div>
            <MDBNavbar light bgColor='light'>
                <MDBContainer fluid>
                    <MDBNavbarBrand style={{ color: "black" }} href='/'>
                        <h1><SiYourtraveldottv className="icon" />
                            Travel Buff Admin Panel
                        </h1>
                    </MDBNavbarBrand>
                </MDBContainer>
            </MDBNavbar>

            <div
                style={{
                    margin: "auto", padding: "15px", maxWidth: "450px",
                    alignContent: "center", marginTop: "100px", color: "black", minHeight: '70vh'
                }}>
                <h2 style={{ paddingLeft: "50px", paddingBottom: "15px", alignContent: "center" }} className="text-align-center">Welcome Admin</h2>
                <MDBCard alignment='center'>

                    <MDBIcon fas icon='user-circle' className='fa-3x' />
                    <h5>Admin Sign In </h5>
                    <MDBCardBody>
                        <MDBValidation onSubmit={handleSubmit} noValidate className='row g-3'>
                            <div className="col-md-12">
                                <MDBValidationItem className='col-md-12' feedback='Please provide your email.' invalid>
                                    <MDBInput
                                        label="Email"
                                        type="email"
                                        value={email}
                                        name="email"
                                        onChange={onInputChange}
                                        required
                                        validation="Please provide your email"
                                        invalid
                                    />
                                </MDBValidationItem>
                            </div>
                            <div className="col-md-12">
                                <MDBValidationItem className='col-md-12' feedback='Please provide a password.' invalid>
                                    <MDBInput
                                        label="Password"
                                        type="password"
                                        value={password}
                                        name="password"
                                        onChange={onInputChange}
                                        required
                                    />
                                </MDBValidationItem>
                            </div>
                            <div className="col-12">
                                <MDBBtn style={{ width: "100%", background:"black" }} className="mt-2">
                                    {loading && (
                                        <MDBSpinner
                                            size='sm'
                                            role="status"
                                            tag="span"
                                            className='me-2'
                                        />
                                    )}
                                    Login
                                </MDBBtn>
                            </div>
                        </MDBValidation>
                    </MDBCardBody>
                    {/* <MDBCardFooter>
                        <Link to='/register'>
                            <p style={{ color: "#551a8b" }}>Don't have an account ? <span style={{ color: "red" }}>Sign Up </span> </p>
                        </Link>
                        <h5>Or</h5>
                        <Link to='/register'>
                        <p style={{ color: "#551a8b" }}>Tour Guide<span style={{ color: "red" }}> Sign Up </span> </p>
                        </Link>
                        
                    </MDBCardFooter> */}
                </MDBCard>
            </div>
        </div>
    )
}

export default AdminLogin

