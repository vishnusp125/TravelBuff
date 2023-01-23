import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import GuideNavbar from '../../../Components/GuideComponents/Navbar/GuideNavbar'
import Footer from '../../../Components/UserComponents/Footer/Footer.jsx';

const initialState = {
    email: "",
    password: "",
};

function GuideLogin() {


    const [formValue, setFormValue] = useState(initialState);
    const { loading, error } = useSelector((state) => ({ ...state.auth }));
    const { email, password } = formValue;
    const dispatch = useDispatch();
    const navigate = useNavigate();


  return (
    <div>
        <GuideNavbar/>
        <div className="container py-5 h-100 justify-content-center align-items-center" style={{minHeight: '100vh'}} >
            <div className="row justify-content-center align-items-center h-100">
            <h1 className="row justify-content-center align-items-center mx-5 my-5">Tour Guide Sign In</h1>
              <div className="col-md-6 col-lg-6 mx-auto">
                <div className="card shadow-2-strong card-registration w-70" style={{ borderRadius: '15px' }}>
                  <div className="card-body p-4 p-md-5">
                    <h3 className="mb-3 text-center">
                     Welcome !!!
                    </h3>
                    <form>
                      <div className="row">
                            <label className="form-label">Email</label>
                            <br />
                            <input
                              type="text"
                              id="Name"
                            />
                      </div>
                      <div className="row">
                            <label className="form-label">Password</label>
                            <br />
                            <input
                              type="password"
                              id="password"
                            />
                          </div>
                          <div className="mt-3 pt-2 d-flex justify-content-center align-items-center ">
                        <input
                          className="btn btn-lg"
                          type="submit"
                          value="Sign In"/>
                      </div>
                    </form>
                    <h5 className='pt-5'>Don't have an account ?<Link to='/guideSignup' className='btnhover'> Sign Up</Link></h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        <Footer/>

    </div>
  )
}

export default GuideLogin