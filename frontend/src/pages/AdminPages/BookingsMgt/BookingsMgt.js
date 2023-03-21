import React, { useEffect, useState } from 'react';
import PulseLoader from "react-spinners/PulseLoader";
import DataTable from 'react-data-table-component';
import { getAllBookings } from '../../../axios/services/AdminServices';

function BookingsMgt() {

  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    setLoading(true)
    const jwtToken = JSON.parse(localStorage.getItem('admin')).token
    const data = await getAllBookings(jwtToken);
    setDetails(data);
    setLoading(false)
  }

  const columns = [
    {
      name: "No",
      selector: (row, i) => i + 1,
      width: "60px"

    },
    {
      name: 'Username',
      selector: (row) => row.username,
      sortable:true
    },
    {
      name: 'Guidename',
      selector: (row) => row.guidename,
      sortable:true
    },
    {
      name: 'Location',
      selector: (row) => row.location,
      sortable:true
    },
    {
      name: 'From Date',
      selector: (row) => row.fromDate,
      sortable:true
    },
    {
      name: 'To Date',
      selector: (row) => row.toDate,
    },
    {
      name: 'Amount',
      selector: (row) => row.totalAmount,
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
      <h1 style={{ color: "black" }} className='text-center m-5'>Booking Details</h1>
      <DataTable
        columns={columns}
        data ={details}
        conditionalRowStyles={conditionalRowStyles}
        fixedHeader
        fixedHeaderScrollHeight="500px"
        highlightOnHover
        pagination 
      />
    </div>
    }
    </>
  )
}

export default BookingsMgt