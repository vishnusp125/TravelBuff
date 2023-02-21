import React, { useEffect, useState } from "react";
import { getAllDetails } from "../../../axios/services/AdminServices";
import BarChart from "../../GuideComponents/BarChart/BarChart";
import Card from "../Card/Card";
import "./MainDash.css";
const MainDash = () => {

  // const Userdata = [
  //   {
  //     id: 1,
  //     year: 2016,
  //     userGain: 1000
  //   },
  //   {
  //     id: 2,
  //     year: 2017,
  //     userGain: 2000
  //   },
  //   {
  //     id: 3,
  //     year: 2018,
  //     userGain: 4000
  //   },
  // ]

  useEffect(() => {
    fetchData();
  }, []);

  const [details, setDetails] = useState([]);
  const jwtToken = JSON.parse(localStorage.getItem('admin')).token
  async function fetchData() {
    const data = await getAllDetails(jwtToken);
    setDetails(data);
  }

  // const [userData, setUserData] = useState({
  //   labels: details?.map((data) => data.createdAtDates),
  //   datasets: [{
  //     label: "Users Gained",
  //     data: details?.map((data) => data.totalAmounts)
  //   }]
  // })

  const createdAtDates = details?.createdAtDates
  const totalAmounts = details?.totalAmounts

  const data = {
    labels: createdAtDates?.map(date => new Date(date).toISOString().substr(0, 10)),
    datasets: [
      {
        label: 'Total Amount',
        data: totalAmounts,
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ]
  };
  console.log(details);

  return (
    <div style={{ whiteSpace: 'nowrap' }}>
      <div className="text-center m-5">
        <h1 style={{ color: "black" }}>Admin Dashboard</h1>
      </div>
      <div className="d-flex flex-row justify-content-between" style={{ marginRight: "50px", gap: "20px" }}>
        <Card data={`Total Users : ${details?.numUsers}`} />
        <Card data={`Total Guides : ${details?.numGuides}`} />
        <Card data={`Total Bookings : ${details?.numBookings}`} />
        <Card data={`Total Revenue : Rs. ${details?.bookingTotal}`} />
      </div>
      <div className="mt-5" style={{ width: "1200px" }}>
        <h3 className="text-center m-5"> Bookings Bar  Chart </h3>
        <BarChart chartData={data} />
      </div>
    </div>
  );
};

export default MainDash;
