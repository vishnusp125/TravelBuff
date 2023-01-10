import React, { useState } from 'react'
import { SiYourtraveldottv } from 'react-icons/si'
import { AiFillCloseCircle } from 'react-icons/ai'
import { TbGridDots } from 'react-icons/tb'
import './Navbar.css'


const Navbar = () => {

  //toggle/show navbar
  const [active, setActive] = useState('navBar')
  const showNav = ()=> {
    setActive('navBar activeNavbar')
  }

  //code to remove navbar
  const removeNav =()=>{
    setActive('navBar')
  }

  //code to add bg color to header
  const [transparent, setTransparent] = useState('header')
  const addBg = () => {
    if (window.scrollY >= 10){
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
            <a href="#" className="logo">
              <h1><SiYourtraveldottv className="icon" />
                Travel Buff</h1>
            </a>
          </div>

          <div className={active}>
            <ul className="navLists flex">
              <li className="navItem">
                <a href="" className='navLink'>Home</a>
              </li>
              <li className="navItem">
                <a href="" className='navLink'>Travel Guides</a>
              </li>
              <li className="navItem">
                <a href="" className='navLink'>Travel Guides</a>
              </li>
              <li className="navItem">
                <a href="" className='navLink'>About Us</a>
              </li>

              <div className="headerBtns flex">
                <button className='btn loginBtn'>
                  <a href="">Login</a>
                </button>
                <button className='btn loginBtn'>
                  <a href="">Sign Up</a>
                </button>
              </div>
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