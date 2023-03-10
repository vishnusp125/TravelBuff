import React, { useEffect, useState } from 'react';
import PulseLoader from "react-spinners/PulseLoader";
import DataTable from 'react-data-table-component';
import { cancelBooking, getAllBookings } from '../../../axios/services/UserServices';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from '../../../Components/UserComponents/Footer/Footer';
import Navbar from '../../../Components/UserComponents/Navbar/Navbar';


function Bookings() {
  const [loading, setLoading] = useState(false);
  const [bookings, setBookings] = useState([])
  const jwtToken = JSON.parse(localStorage.getItem('profile')).token
  const userid = JSON.parse(localStorage.getItem('profile')).result._id;

  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 500)
  }, [])

  async function getBookings() {
    const data = await getAllBookings(userid, jwtToken);
    setBookings(data)
  }

  useEffect(() => {
    getBookings()
  }, [])

  async function cancelBkng(bookingid, guideid) {
    try {
      const result = await cancelBooking(bookingid, guideid, jwtToken)
      if (result) {
        getBookings()
      }

      toast.success(result.message)
    } catch (error) {
      console.log(error);
    }
  }

  const columns = [
    {
      name: "No",
      selector: (row, i) => i + 1,
    },
    {
      name: "Guide Name",
      selector: (row) => row?.guidename
    },
    {
      name: "Location",
      selector: (row) => row?.location
    },
    {
      name: "From Date",
      selector: (row) => row?.fromDate,
      sortable: true
    },
    {
      name: "To Date",
      selector: (row) => row?.toDate
    },
    {
      name: "Amount (in Rs.)",
      selector: (row) => row?.totalAmount
    },
    {
      name: "Status",
      selector: "status",
      sortable: true
    },
    {
      name: "Action",
      cell: (row) => {
        if (row?.status !== "Cancelled") {
          return (
            <button className='btn' style={{ backgroundColor: 'red' }}
              onClick={() => { cancelBkng(row._id, row.guideid) }}>Cancel</button>
          )
        }
        return null;
      }
    }
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
            <div style={{ height: "150px" }}>
              <Navbar />
            </div>
            <div className='text-center mb-3'><h2>My Bookings</h2></div>
            <div className='px-5 pt-3 pb-5' style={{ minHeight: "500px" }} >
              <DataTable
                columns={columns}
                data={bookings}
                conditionalRowStyles={conditionalRowStyles}
                pagination
                highlightOnHover
              />
            </div>
            <Footer />
          </div>
      }
    </>
  )
}

export default Bookings