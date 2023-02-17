import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getGuides } from '../../../axios/services/UserServices'
// import SearchFilter from '../SearchFilter/SearchFilter'
import { MDBCard, MDBCardBody, MDBInput } from 'mdb-react-ui-kit'
// import { DatePicker, Space } from 'antd'
// import moment from 'moment';
import GuideCard from '../GuideCard/GuideCard'
// const { RangePicker } = DatePicker;

function Guides() {

    const [details, setDetails] = useState([])
    const [query, setQuery] = useState("")

    async function fetchData() {
        const data = await getGuides()
        setDetails(data);
    }

    useEffect(() => {
        fetchData();
    }, [])
    const search = (details) => {
        return details.filter((item) => item.location.toLowerCase().includes(query.toLowerCase()))
    }

    return (
        <div>
            <section className='offer container section'>
                <div className="secContainer">
                    <div className="secIntro">
                        <h2 className="secTitle">
                            Travel guides
                        </h2>
                        <p>
                            Find your guides !!!
                        </p>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center' }} className="mb-5">
                        <MDBCard style={{ width: '55%' }}>
                            <MDBCardBody>
                                <div style={{ display: "flex" }}>
                                    <div>
                                        <p className='text-dark mx-4 mt-1'>Enter your location to search</p>
                                    </div>
                                    <div>
                                        <MDBInput label='Location' id='form1' type='text' onChange={e => setQuery(e.target.value)} />
                                    </div>
                                </div>
                            </MDBCardBody>
                        </MDBCard>
                    </div>
                    <GuideCard guide={search(details)} />
                </div>
            </section>
        </div>
    )
}

export default Guides