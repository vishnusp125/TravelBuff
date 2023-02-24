import React, { useEffect, useState } from "react";
import { getAllDetails } from "../../../axios/services/AdminServices";
import BarChart from "../../GuideComponents/BarChart/BarChart";
import Card from "../Card/Card";
import DataTable from 'react-data-table-component';
import "./MainDash.css";
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { useNavigate } from "react-router-dom";


const MainDash = () => {
  const navigate = useNavigate();

  useEffect(() => {

    const token = localStorage?.getItem('admin');
    if (!token) {
      navigate('/adminLogin');
    } else {
      navigate('/admin');
    }
    fetchData();
  }, []);

  const [details, setDetails] = useState([]);
  const jwtToken = JSON?.parse(localStorage.getItem('admin'))?.token
  async function fetchData() {
    const data = await getAllDetails(jwtToken);
    setDetails(data);
  }

  const createdAtDates = details?.createdAtDates
  const totalAmounts = details?.totalAmounts

  const options = {
    scales: {
      y: {
        title: {
          display: true,
          text: 'Amount'
        }
      },
      x: {
        title: {
          display: true,
          text: 'Date'
        }
      }
    }
  };

  if (!details) {
    return <div>Loading....</div>
  }

  const data = {
    labels: createdAtDates?.map(date => new Date(date).toISOString().substr(0, 10)),
    datasets: [
      {
        label: 'Total Amount',
        data: totalAmounts,
        backgroundColor: 'rgba(85, 26, 139, 0.5)',
        borderColor: '#551a8b',
        tension: 0.1
      }
    ]
  };

  // Calculate total booking amount
  const total = details?.tableData ? details.tableData.reduce((acc, cur) => acc + cur.total_booking_amount, 0) : 0;

  const columns = [
    {
      name: "No",
      selector: (row, i) => i + 1,
    },
    {
      name: "Guide Name",
      selector: (row) => row?.name
    },
    {
      name: "No of bookings",
      selector: (row) => row?.no_of_bookings
    },
    {
      name: "Total Amount (in Rs.)",
      selector: (row) => row?.total_booking_amount
    },
  ]

  const generatePDF = () => {
    const doc = new jsPDF()
    doc.text("Travel Buff Booking Details", 80, 10)
    const tableColumn = ["No", "Guide Name", "No of Bookings", "Total Amount in (Rs.)"];
    const tableRows = [];


    // Iterate over the details and add rows to the table
    details?.tableData.forEach((row, index) => {
      const rowData = [
        index + 1,
        row?.name,
        row?.no_of_bookings,
        row?.total_booking_amount,
      ];
      tableRows.push(rowData);
    });

    // Add the table to the PDF document
    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      foot: [["", "", "GrandTotal:", `Rs. ${total}`]]
    });
    doc.save('table.pdf')
  }


  return (
    <div style={{ whiteSpace: 'nowrap' }}>
      <div className="text-center m-5">
        <h1 style={{ color: "black" }}>Admin Dashboard</h1>
      </div>
      <div className="d-flex flex-row justify-content-between" style={{ marginRight: "50px", gap: "20px" }}>
        <Card data={`Total Users : ${details?.numUsers}`} />
        <Card data={`Total Guides : ${details?.numGuides}`} />
        <Card data={`Total Bookings : ${details?.numBookings}`} />
        <Card data={`Total Revenue : Rs. ${total}`} />
      </div>
      <div className="mt-5 text-center mx-5" style={{ width: "1000px" }}>
        <h3 className="text-center m-5"> Bookings Bar  Chart </h3>
        <BarChart chartData={data} />
      </div>
      <div>
        <h2 className="text-center my-5">Bookings Details</h2>
        <div className="mt-5 mx-5">
          <DataTable
            columns={columns}
            data={details?.tableData}
            // pagination
            highlightOnHover
            footer="footer"
            actions=<button className="btn" onClick={generatePDF}>Export</button>
          />
        </div>
        <div className="text-end text-danger mb-5 mt-2" style={{ marginRight: "250px" }}>Total : Rs.{total}</div>
      </div>
    </div>
  );
};

export default MainDash;
