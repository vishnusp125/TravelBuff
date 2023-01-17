import React from 'react'
import "./Footer.css"
import { SiYourtraveldottv } from 'react-icons/si'
import { ImFacebook, ImInstagram, ImTwitter } from 'react-icons/im'


function Footer() {
  return (
    <div className="footer">
      <div className="secContainer container grid">
        <div className="logoDiv">

          <div className="footerLogo">
            <a href="#" className="logo flex">
            <h1 className='logo'>
            <SiYourtraveldottv className="icon"/>
              Travel Buff
            </h1>
            </a>
          </div>

          <div className="socials flex">
          <ImFacebook className="icon"/>
          <ImTwitter className="icon"/>
          <ImInstagram className="icon"/>
        </div>

        </div>

        <div className="footerLinks">
          <span className="linkTitle">
            Information
          </span>
          <li>
            <a href="#">Home</a>
          </li>
          <li>
            <a href="#">Travel Guides</a>
          </li>
          <li>
            <a href="#">Travel Tips</a>
          </li>
        </div>

        <div className="footerLinks">
          <span className="linkTitle">
            Helpful Links
          </span>
          <li>
            <a href="#">Destinations</a>
          </li>
          <li>
            <a href="#">Support</a>
          </li>
          <li>
            <a href="#">Travel Conditions</a>
          </li>
        </div>

        <div className="footerLinks">
          <span className="linkTitle">
           Contact
          </span>
          <li>
            <a href="#">+ 123 456 789  </a>
          </li>
          <li>
            <a href="#">travelbuff@support.com</a>
          </li>
        
        </div>

      

      </div>
    </div>
  
  )
}

export default Footer