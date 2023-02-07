import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getGuides } from '../../../axios/services/UserServices'
// import SearchFilter from '../SearchFilter/SearchFilter'
import { MDBCard, MDBCardBody, MDBInput } from 'mdb-react-ui-kit'
// import { DatePicker, Space } from 'antd'
// import moment from 'moment';
import GuideCard from '../GuideCard/GuideCard'
import { height } from '@mui/system'
// const { RangePicker } = DatePicker;

function Guides() {

    const [details, setDetails] = useState([])
    const [query, setQuery] = useState("")

    const jwtToken = JSON.parse(localStorage.getItem('profile')).token
    async function fetchData() {
        const data = await getGuides(jwtToken)
        setDetails(data);
    }
    useEffect(() => {
        fetchData();
    }, [])
    const search = (details) => {
        return details.filter((item) => item.location.toLowerCase().includes(query.toLowerCase()))
    }

    // const [fromDate, setfromDate] = useState()
    // const [toDate, settoDate] = useState()
    // const [filterGuide, setFilterGuide] = useState([])


    // useEffect(() => {
    //     setFilterGuide(details);
    // }, []);

    // const disabledDate = current => {
    //     // Disable all days that are earlier than today
    //     return current && current < moment().endOf('day');
    // };
    // console.log("in filter",details)

    // function filterByDates(dates) {
    //     setfromDate(dates[0].format("DD-MM-YYYY"))
    //     settoDate(dates[1].format("DD-MM-YYYY"))

    //     var tempguides = []
    //     // console.log(tempguides)
    //     var availability = false;

    //     for (const details of filterGuide) {
    //         if (details.bookings.length > 0) {
    //             for (const booking of details.bookings) {

    //                 if (!moment(dates[0].format("DD-MM-YYYY")).isBetween(booking.fromDate, booking.toDate) &&
    //                     moment(dates[1].format("DD-MM-YYYY")).isBetween(booking.fromDate, booking.toDate)
    //                 ) {

    //                     if (
    //                         (dates[0]).format("DD-MM-YYYY") !== booking.fromDate &&
    //                         (dates[0]).format("DD-MM-YYYY") !== booking.toDate &&
    //                         (dates[1]).format("DD-MM-YYYY") !== booking.fromDate &&
    //                         (dates[1]).format("DD-MM-YYYY") !== booking.toDate
    //                     ) {
    //                         availability = true;
    //                     }
    //                 }
    //             }
    //         }
    //         if (availability === true || details.bookings.length === 0) {
    //             tempguides.push(details)
    //             // setFilterGuide([...filterGuide, details])
    //         }
    //         setDetails(tempguides)
    //     }
    // }

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