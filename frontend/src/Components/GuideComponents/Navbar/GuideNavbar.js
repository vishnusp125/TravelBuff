import React from 'react'
import { MDBContainer, MDBNavbar, MDBNavbarBrand } from 'mdb-react-ui-kit';
import { SiYourtraveldottv } from 'react-icons/si';


function GuideNavbar() {
  return (
    <div>
<MDBNavbar light bgColor='light'>
                <MDBContainer fluid>
                    <MDBNavbarBrand style={{ color: "#551a8b" }} href='/'>
                        <h1><SiYourtraveldottv className="icon" />
                            Travel Buff
                        </h1>
                    </MDBNavbarBrand>
                </MDBContainer>
            </MDBNavbar>
    </div>
  )
}

export default GuideNavbar