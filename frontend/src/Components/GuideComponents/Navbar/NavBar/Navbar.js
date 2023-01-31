import React, { useState } from 'react'
import { MDBCollapse, MDBContainer, MDBIcon, MDBNavbar, MDBNavbarBrand, MDBNavbarItem, MDBNavbarLink, MDBNavbarNav, MDBNavbarToggler } from 'mdb-react-ui-kit';
import { SiYourtraveldottv } from 'react-icons/si';
import './Navbar.css'
import { useDispatch } from 'react-redux';
import { setLogout } from '../../../../redux/features/guideSlice';
import { Link } from 'react-router-dom';


function NavbarGuide() {

    const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(setLogout());
  }

  
  const guide = JSON.parse(localStorage.getItem("guide"));

    const [showNavNoTogglerSecond, setShowNavNoTogglerSecond] = useState(false);

    return (

        <MDBNavbar expand='lg' light bgColor='light'>
            <MDBContainer fluid>
                <Link to="/"> <MDBNavbarBrand style={{ color: "#551a8b" }}> 
                    <h1><SiYourtraveldottv className="icon" />
                        Travel Buff
                    </h1>
                </MDBNavbarBrand>
                </Link>
                <MDBNavbarToggler
                    type='button'
                    data-target='#navbarTogglerDemo02'
                    aria-controls='navbarTogglerDemo02'
                    aria-expanded='false'
                    aria-label='Toggle navigation'
                    onClick={() => setShowNavNoTogglerSecond(!showNavNoTogglerSecond)}
                >
                    <MDBIcon icon='bars' fas />
                </MDBNavbarToggler>
                <MDBCollapse navbar show={showNavNoTogglerSecond}>
                    <MDBNavbarNav className='mr-auto mb-2 mb-lg-0 justify-content-end mx-5 '>

                    <MDBNavbarItem>
                            <p style={{color:"#551a8b",fontWeight:"500"}}> Welcome {guide.result.name}</p>
                        </MDBNavbarItem>
                        <MDBNavbarItem>
                        <Link to ="/guideHome">
                            <a active aria-current='page' className='p-3'>
                                Home
                            </a>
                            </Link>
                        </MDBNavbarItem>

                        <MDBNavbarItem>
                        <Link to="/guideAddPost">
                            <a active aria-current='page' className='p-3'>
                                Add Post
                            </a>
                            </Link>
                        </MDBNavbarItem>

                        <MDBNavbarItem>
                            <a active aria-current='page' className='p-3'>
                                Bookings
                            </a>
                        </MDBNavbarItem>


                        <MDBNavbarItem>
                            <a active aria-current='page' className='p-3'>
                                Payments
                            </a>
                        </MDBNavbarItem>
                        

                        <MDBNavbarItem>
                           <Link to="/guideSignin"><a active aria-current='page' className='p-3' onClick={handleLogout}>
                                Log Out
                            </a></Link> 
                        </MDBNavbarItem>

                    </MDBNavbarNav>
                </MDBCollapse>
            </MDBContainer>
        </MDBNavbar>
    );
}

export default NavbarGuide