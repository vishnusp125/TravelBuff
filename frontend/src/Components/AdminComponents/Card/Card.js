import { MDBCard, MDBCardBody, MDBCardText, MDBCardTitle } from 'mdb-react-ui-kit'
import React from 'react'

function Card({data}) {
    return (
        <div>
            <MDBCard className='mx-5 w-100' border='primary'>
                <MDBCardBody>
                    <MDBCardTitle style={{color:"red"}}>{data}</MDBCardTitle>
                </MDBCardBody>
            </MDBCard>
        </div>
    )
}

export default Card