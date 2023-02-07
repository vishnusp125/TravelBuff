import React, { useEffect, useState } from 'react'
import { MDBCard, MDBCardBody } from 'mdb-react-ui-kit';
import { DatePicker, Space } from 'antd';
import moment from 'moment';

function SearchFilter(props) {
    const [fromDate, setfromDate] = useState()
    const [toDate, settoDate] = useState()
    const [filterGuide, setFilterGuide] = useState([])
    const { RangePicker } = DatePicker;
    const details = props?.details
    // console.log("filterguide", filterGuide)


    useEffect(() => {
        setFilterGuide(details);
    }, [details]);

    const disabledDate = current => {
        // Disable all days that are earlier than today
        return current && current < moment().endOf('day');
    };
    // console.log("in filter",details)

    function filterByDates(dates) {
        setfromDate(dates[0].format("DD-MM-YYYY"))
        settoDate(dates[1].format("DD-MM-YYYY"))

        var tempguides = []
        // console.log(tempguides)
        var availability = false;

        for (const details of filterGuide) {
            if (details.bookings.length > 0) {
                for (const booking of details.bookings) {

                    if (!moment(dates[0].format("DD-MM-YYYY")).isBetween(booking.fromDate, booking.toDate) &&
                        !moment(dates[1].format("DD-MM-YYYY")).isBetween(booking.fromDate, booking.toDate)
                    ) {

                        if (
                            moment(dates[0]).format("DD-MM-YYYY") !== booking.fromDate &&
                            moment(dates[0]).format("DD-MM-YYYY") !== booking.toDate &&
                            moment(dates[1]).format("DD-MM-YYYY") !== booking.fromDate &&
                            moment(dates[1]).format("DD-MM-YYYY") !== booking.toDate
                        ) {
                            availability = true;
                        }
                    }
                }

            }
            if (availability == true || details.bookings.length == 0) {
                filterGuide.push(details)
                // setFilterGuide([...filterGuide, details])
            }
        }
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center' }} className="mb-5">
            <MDBCard style={{ width: '30%' }}>
                <MDBCardBody>
                    <div style={{ display: "flex" }}>
                        <div>
                            <Space direction="vertical" size={12}>
                                <RangePicker format="DD-MM-YYYY" disabledDate={disabledDate} onChange={filterByDates} />
                            </Space>
                        </div>
                        {/* <div className='mt-1' style={{ marginLeft: '50px' }}>
                            <select className="form-select" aria-label="Default select example">
                                <option selected>Select location</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </select>
                        </div> */}
                    </div>
                </MDBCardBody>
            </MDBCard>
        </div>
    )
}

export default SearchFilter