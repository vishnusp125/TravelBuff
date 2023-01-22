import React from 'react'


function GuideProfile() {
    return (
        <div>
            <h1 style={{ textAlign: "center", marginTop: "30px", marginLeft: "10px" }}>Guides To Approve</h1>
            
            <div className="card mb-3" style={{ width: "100%" }}>
  <div className="row g-0">
    <div className="col-md-4">
      <img src={require('../../../assets/images/guide2.jpg')} className="img-fluid rounded-start" alt="guideimage" style={{height:"300px",Width:"20px"}} />
    </div>
    <div className="col-md-8 d-flex align-items-end">
      <div className="card-body">
        <h5 className="card-title">Card title</h5>
        <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content
        This is a wider card with supporting text below as a natural lead-in to additional content
        . This content is a little bit longer.</p>
        <p className="card-text">
          <small className="text-muted">Last updated 3 mins ago</small>
        </p>
        <button className="btn btn-primary align-self-end" style={{background:"green"}}>Button</button>
      </div>
    </div>
  </div>
</div>
        </div>

    )
}

export default GuideProfile