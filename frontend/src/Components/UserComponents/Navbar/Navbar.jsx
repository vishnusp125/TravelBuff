import React, { useState } from 'react'
import { SiYourtraveldottv } from 'react-icons/si'
import { AiFillCloseCircle } from 'react-icons/ai'
import { TbGridDots } from 'react-icons/tb'
import './Navbar.css'
import { useSelector, useDispatch } from 'react-redux'
import { setLogout } from '../../../redux/features/authSlice'
import { Link } from 'react-router-dom'


const Navbar = () => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(setLogout());
  }

 const user = JSON.parse(localStorage.getItem("profile"));


  //toggle/show navbar
  const [active, setActive] = useState('navBar')
  const showNav = () => {
    setActive('navBar activeNavbar')
  }

  //code to remove navbar
  const removeNav = () => {
    setActive('navBar')
  }

  //code to add bg color to header
  const [transparent, setTransparent] = useState('header')
  const addBg = () => {
    if (window.scrollY >= 10) {
      setTransparent('header activeHeader')
    }
    else {
      setTransparent('header')
    }
  }
  window.addEventListener('scroll', addBg)

  return (
    <section>
      <div className='navBarSection'>
        <div className={transparent}>
          <div className="logoDiv">
          <Link to ='/'>
            <li  className="logo">
              <h1><SiYourtraveldottv className="icon" />
                Travel Buff
              </h1>
            </li>
            </Link>
          </div>

          <div className={active}>
            <ul className="navLists flex">
              <li className="navItem">
              <Link to="/"><li className='navLink'>Home</li></Link>
                
              </li>
              <li className="navItem">
              <Link to="/guideList"><li className='navLink'>Travel Guides</li></Link>
              </li>
                        
              {user?.result?._id && (
                <div style={{display:"flex"}}>

                <li className="navItem">
                <Link to="/bookings"><li className='navLink'>Bookings</li></Link>
                </li>

                <li className="navItem">
                <Link to="/profile"><li className='navLink'>Profile</li></Link>
                </li>

                <li className="navItem">
                 <Link to="/chat"><li href="" className='navLink'>Messages</li></Link>
              </li>
                
                <li className="navItem">
                  <li href="" className='navLink'> Welcome {user?.result?.name}</li>
                </li>
                </div>

              )}
              {/* <li className="navItem">
                <li href="" className='navLink'>About Us</li>
              </li> */}

              {user? (
                <div className="headerBtns flex">
                  <button className='btn loginBtn' onClick={handleLogout}>
                    <Link to="/login">Logout</Link> 
                  </button>
                </div>

              ) : (
                <div className="headerBtns flex">
                  <button className='btn loginBtn'>
                    <Link to="/login">
                      Login
                    </Link>
                  </button>
                  <button className='btn loginBtn'>
                    <Link to="/register">
                      Sign Up
                    </Link>
                  </button>
                </div>
              )}
            </ul>
            <div onClick={removeNav} className="closeNavbar">
              <AiFillCloseCircle className="icon" />
            </div>
          </div>
          <div onClick={showNav} className="toggleNavbar">
            <TbGridDots className="icon" />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Navbar