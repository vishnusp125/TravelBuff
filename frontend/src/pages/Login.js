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
import { login } from '../redux/features/authSlice';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import { SiYourtraveldottv } from 'react-icons/si'

const initialState = {
    email: "",
    password: "",
};

function Login() {

    const [formValue, setFormValue] = useState(initialState);
    const { loading, error } = useSelector((state) => ({ ...state.auth }));
    const { email, password } = formValue;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        error && toast.error(error)
    }, [error])

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email && password) {
            dispatch(login({ formValue, navigate, toast }))
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
                    <MDBNavbarBrand style={{ color: "#551a8b" }} href='/'>
                        <h1><SiYourtraveldottv className="icon" />
                            Travel Buff
                        </h1>
                    </MDBNavbarBrand>
                </MDBContainer>
            </MDBNavbar>

            <div
                style={{
                    margin: "auto", padding: "15px", maxWidth: "450px",
                    alignContent: "center", marginTop: "120px", color: "#551a8b"
                }}>
                <MDBCard alignment='center'>
                    <MDBIcon fas icon='user-circle' className='fa-3x' />
                    <h5>Sign In </h5>
                    <MDBCardBody>
                        <MDBValidation onSubmit={handleSubmit} noValidate className='row g-3'>
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
                                    invalid
                                    validation="Please provide your password"
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
                                    Login
                                </MDBBtn>
                            </div>
                        </MDBValidation>
                    </MDBCardBody>
                    <MDBCardFooter>
                        <Link to='/register'>
                            <p style={{ color: "#551a8b" }}>Don't have an account ? <span style={{ color: "red" }}>Sign Up </span> </p>
                        </Link>
                    </MDBCardFooter>
                </MDBCard>
            </div>
        </>
    )
}

export default Login

