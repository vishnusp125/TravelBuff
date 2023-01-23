import React, { useEffect, useState } from 'react'
import { approveGuides, verifyGuide } from '../../../axios/services/AdminServices';


function GuideProfile() {

  const [details, setDetails] = useState([]);

  async function fetchData() {
      const token = localStorage.getItem('admin');
      const data = await approveGuides(token);
      console.log("data",data);
      setDetails(data.guideDetails);
    }

  useEffect(() => {
    fetchData()
  }, []);

  async function verify(id) {
    const token = localStorage.getItem('admin');
    const data = await verifyGuide(token, id);
    console.log(data);
    console.log("approvedd", data);
    if (data.guideDetails) {
      fetchData()
    }
  }

  return (
    <div>
      <h1 style={{ textAlign: "center", marginTop: "30px", marginLeft: "10px" }}>Guides To Approve</h1>
      {details.map(item => {
        return (
          <div className="card mb-3" style={{ width: "100%" }} key={item._id}>
            <div className="row g-0">
              <div className="col-md-4">
                <img src={item.image} className="img-fluid rounded-start" alt="guideimage" style={{ height: "300px", objectFit: "contain" }} />
              </div>
              <div className="col-md-8 d-flex align-items-end">
                <div className="card-body">
                  <h5 className="card-title">{item.name}</h5>
                  <span style={{ display: 'inline-block' }}> Email: <p style={{ display: 'inline-block' }}>{item.email}</p></span>
                  <br />
                  <span style={{ display: 'inline-block' }}> Location: <p style={{ display: 'inline-block' }}>{item.location}</p></span>
                  <br />
                  <span style={{ display: 'inline-block' }}> Phone: <p style={{ display: 'inline-block' }}>{item.phone}</p></span>
                  <br />
                  <a href={item.certificate} className="bold border hover-effect" target="_blank" style={{ color: "blue" }}> View Certificate </a>
                  <p className="card-text">
                    {/* <small className="text-muted">Last updated 3 mins ago</small> */}
                  </p>
                  <button className="btn btn-primary align-self-end" style={{ background: "green", marginRight: "10px" }}
                    onClick={() => verify(item._id)}>Approve</button>
                  <button className="btn btn-primary align-self-end" style={{ background: "red" }}>Reject</button>
                </div>
              </div>
            </div>
          </div>
        )

      })}
    </div>

  )
}

export default GuideProfile