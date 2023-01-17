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

  const { user } = useSelector((state) => ({ ...state.auth }))

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
            <a href="/" className="logo">
              <h1><SiYourtraveldottv className="icon" />
                Travel Buff
              </h1>
            </a>
          </div>

          <div className={active}>
            <ul className="navLists flex">
              <li className="navItem">
              <Link to="/"><a className='navLink'>Home</a></Link>
                
              </li>
              <li className="navItem">
              <Link to="/guideList"><a className='navLink'>Travel Guides</a></Link>
              </li>
              <li className="navItem">
                <a href="" className='navLink'>Travel Tips</a>
              </li>
              <li className="navItem">
                <a href="" className='navLink'>About Us</a>
              </li>
              {user?.result?._id && (
                <li className="navItem">
                  <a href="" className='navLink'>Welcome {user?.result?.name}</a>
                </li>

              )}

              {user?.result?._id ? (
                <div className="headerBtns flex">

                  <button className='btn loginBtn' onClick={handleLogout}>

                    <a href="/login">Logout</a>
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