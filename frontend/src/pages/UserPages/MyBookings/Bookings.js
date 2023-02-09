import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { getAllBookings } from '../../../axios/services/UserServices';
import Footer from '../../../Components/UserComponents/Footer/Footer';
import Navbar from '../../../Components/UserComponents/Navbar/Navbar';

function Bookings() {
  const [bookings, setBookings] = useState([])
  const jwtToken = JSON.parse(localStorage.getItem('profile')).token
  const userid = JSON.parse(localStorage.getItem('profile')).result._id

  async function getBookings() {
    const data = await getAllBookings(userid, jwtToken);
    setBookings(data)
  }

  useEffect(() => {
    getBookings()
  }, [])
  
  const columns = [
      {
        name: "No",
        selector: (row, i) => i + 1,
      },
      {
        name:"Guide Name",
        selector:(row) => row.guidename
      },
      {
        name:"Location",
        selector:(row) => row.location
      },
      {
        name:"From Date",
        selector:(row) => row.fromDate,
        sortable:true
      },
      {
        name:"To Date",
        selector:(row) => row.toDate
      },
      {
        name:"Amount",
        selector:(row) => row.totalAmount
      },
      {
        name:"Status",
        selector:(row) => row.status
      }
    ]
    console.log(bookings)
  return (
    <div>
    <div style={{height:"150px"}}>
    <Navbar/>
    </div>
    <div className='text-center mb-3'><h2>My Bookings</h2></div>
    <div className='px-5 pt-3 pb-5' style={{minHeight:"500px"}} >
    <DataTable
    columns={columns}
    data={bookings}
    pagination
    highlightOnHover
    />
    </div>
    <Footer/>
    </div>
  )
}

export default Bookings