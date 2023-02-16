import React, { useEffect, useState } from 'react'
import NavbarGuide from '../../../Components/GuideComponents/Navbar/NavBar/Navbar';
import { guideDetails } from '../../../axios/services/GuideServices';
import './EditProfile.css';

function EditProfile() {

    const [guideData, setGuideData] = useState("")

    useEffect(() => {
        const Curguide = JSON.parse(localStorage.getItem("guide"));
        const guideId = Curguide.result._id
        fetchData(guideId)
    }, []);

    async function fetchData(id) {
        const token = localStorage.getItem('guide');
        const data = await guideDetails(token, id);
        setGuideData(data);
    }
    console.log(guideData);

    return (
        <>
            <NavbarGuide />
            <div className="mx-5 my-5">
                <div className="row gutters">
                    <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
                        <div className="card h-100">
                            <div className="card-body">
                                <div className="account-settings">
                                    <div className="user-profile">
                                        <div className="user-avatar">
                                            <img src={guideData?.image} alt="Maxwell Admin" />
                                            <div className='mx-3 my-3' style={{width:"250px",height:"30px"}}>
                                            <input style={{height:"400px"}} type="file" class="form-control" placeholder='choose'/>
                                            </div>
                                        </div>
                                        <h5 className="user-name">{guideData?.name}</h5>
                                        <h6 className="user-email">{guideData?.email}</h6>
                                    </div>
                                    <div className="about">
                                        <h5>Description</h5>
                                        <p>{guideData.description}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
                        <div className="card h-100">
                            <div className="card-body">
                                <div className="row gutters">
                                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                        <h6 className="mb-2 text-primary">Personal Details</h6>
                                    </div>
                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12 my-3">
                                        <div className="form-group">
                                            <label for="fullName">Full Name</label>
                                            <input type="text" className="form-control" value={guideData.name} id="fullName" placeholder="Enter full name"/>
                                        </div>
                                    </div>
                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12 my-3">
                                        <div className="form-group">
                                            <label for="eMail">Email</label>
                                            <input type="email" className="form-control" id="eMail" placeholder="Enter email ID" />
                                        </div>
                                    </div>
                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div className="form-group">
                                            <label for="phone">Phone</label>
                                            <input type="text" className="form-control" id="phone" placeholder="Enter phone number" />
                                        </div>
                                    </div>
                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div className="form-group">
                                            <label for="website">Website URL</label>
                                            <input type="url" class="form-control" id="website" placeholder="Website url" />
                                        </div>
                                    </div>
                                </div>
                                <div className="row gutters">
                                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                        <h6 className="mt-3 mb-2 text-primary">Address</h6>
                                    </div>
                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div className="form-group">
                                            <label for="Street">Street</label>
                                            <input type="name" className="form-control" id="Street" placeholder="Enter Street" />
                                        </div>
                                    </div>
                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div className="form-group">
                                            <label for="ciTy">City</label>
                                            <input type="name" className="form-control" id="ciTy" placeholder="Enter City" />
                                        </div>
                                    </div>
                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div className="form-group">
                                            <label for="sTate">State</label>
                                            <input type="text" className="form-control" id="sTate" placeholder="Enter State" />
                                        </div>
                                    </div>
                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div className="form-group">
                                            <label for="zIp">Zip Code</label>
                                            <input type="text" className="form-control" id="zIp" placeholder="Zip Code" />
                                        </div>
                                    </div>
                                </div>
                                <div className="row gutters">
                                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 mt-5">
                                        <div className="text-right">
                                            <button type="button" id="submit" name="submit" class="btn btn-secondary mx-3" style={{ backgroundColor: "Red" }}>Cancel</button>
                                            <button type="button" id="submit" name="submit" class="btn btn-primary" style={{ backgroundColor: "green" }}>Update</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EditProfile