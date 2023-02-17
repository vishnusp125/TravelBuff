import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import PulseLoader from "react-spinners/PulseLoader";
import { guideBookings, guideDetails } from '../../../axios/services/GuideServices';
import NavbarGuide from '../../../Components/GuideComponents/Navbar/NavBar/Navbar';

function GuideBookings() {

  const [loading, setLoading] = useState(false);
  const [bookings, setBookings] = useState([])

  const guideId = JSON.parse(localStorage.getItem('guide')).result._id
  const token = JSON.parse(localStorage.getItem('guide')).guide
  console.log(111,token);

  async function getBookings() {
    const data = await guideBookings(token, guideId);
    setBookings(data)
  }

  useEffect(() => {
    getBookings()
  }, [])

  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
        setLoading(false)
    }, 500)
}, [])

const columns = [
  {
    name: "No",
    selector: (row, i) => i + 1,
  },
  {
    name: "User Name",
    selector: (row) => row?.username
  },
  {
    name: "From Date",
    selector: (row) => row?.fromDate,
    sortable:true
  },
  {
    name: "To Date",
    selector: (row) => row?.toDate
  },
  {
    name: "Price",
    selector: (row) => row?.totalAmount,
    sortable:true
  },
  {
    name: "Status",
    selector: "status",
    sortable:true
  },
]
const conditionalRowStyles = [
  {
    when: (row) => row.status === "Cancelled",
    style: {
      color: "red",
    },
  },
  {
    when: (row) => row.status === "Confirmed",
    style: {
      color: "green",
    },
  },
];



  return (
    <>
      {
        loading ?

          <PulseLoader
            color={"#551a8b"}
            loading={loading}
            style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
            size={30}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
          :
          <div>
          <NavbarGuide />
          <div className='m-5'>
          <h2 className='text-center mb-5'>Bookings</h2>
          <DataTable
          columns={columns}
          data={bookings}
          conditionalRowStyles={conditionalRowStyles}
          pagination
          highlightOnHover
        />
        </div>
          </div>
      }
    </>
  )
}

export default GuideBookings