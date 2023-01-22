import React, { useState } from "react";
import "./Sidebar.css";
import { SidebarData } from "../Data/Data";
import { UilBars } from "@iconscout/react-unicons";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { setLogout } from "../../../redux/features/adminSlice";
import { useDispatch } from "react-redux";
import { MDBBtn } from "mdb-react-ui-kit";
import { MdSecurityUpdateGood } from "react-icons/md";

const Sidebar = ({setPage}) => {
  const [selected, setSelected] = useState(0);
  const [expanded, setExpaned] = useState(true)

  const dispatch = useDispatch()

  const HandleLogout = () => {
    dispatch(setLogout())   
  }

  const sidebarVariants = {
    true: {
      left: '0'
    },
    false: {
      left: '-60%'
    }
  }
  console.log(window.innerWidth)
  return (
    <>
      <div className="bars" style={expanded ? { left: '60%' } : { left: '5%' }} onClick={() => setExpaned(!expanded)}>
        <UilBars />
      </div>
      <motion.div className='sidebar'
        variants={sidebarVariants}
        animate={window.innerWidth <= 768 ? `${expanded}` : ''}
      >
        {/* logo */}
        <div className="logo">
          {/* <img src={Logo} alt="logo" /> */}
          <span style={{color:"black"}}>
            Travel Buff
          </span>
        </div>

        <div className="menu">
          {SidebarData.map((item, index) => {
            return (
              <div
                className={selected === index ? "menuItem active" : "menuItem"}
                key={index}
                onClick={() => {
                setPage(item.page)
                setSelected(index)}
                }
                >
                <item.icon/>
                <span>{item.heading}</span>
              </div>
            );
          })}
          {/* signoutIcon */}
          <div className="menuItem">
          </div>
        </div>
        <div>
        <Link to="/adminLogin"
          onClick={() => HandleLogout()}>
          <MDBBtn style={{ marginLeft: "25px", marginTop: "25px" ,background:"black"}}> Log Out</MDBBtn>
            {/* <UilSignOutAlt /> */}
        </Link>
        </div>
      </motion.div>
    </>
  );
};

export default Sidebar;
