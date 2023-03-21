import React, { useEffect, useState } from 'react'
import { getGuides } from '../../../axios/services/UserServices'
import { MDBCard, MDBCardBody, MDBInput } from 'mdb-react-ui-kit'
import PulseLoader from "react-spinners/PulseLoader";
import GuideCard from '../GuideCard/GuideCard'

function Guides() {
    const [loading, setLoading] = useState(false);
    const [details, setDetails] = useState([])
    const [query, setQuery] = useState("")

    async function fetchData() {
        setLoading(true)
        const data = await getGuides()
        setDetails(data);
        setLoading(false)
    }

    useEffect(() => {
        fetchData();
    }, [])
    const search = (details) => {
        return details.filter((item) => item.location.toLowerCase().includes(query.toLowerCase()))
    }

    return (
        <div>
            <section className='offer container section'>
                <div className="secContainer">
                    <div className="secIntro">
                        <h2 className="secTitle">
                            Travel guides
                        </h2>
                        <p>
                            Find your guides !!!
                        </p>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center' }} className="mb-5">
                        <MDBCard style={{ width: '55%' }}>
                            <MDBCardBody>
                                <div style={{ display: "flex" }}>
                                    <div>
                                        <p className='text-dark mx-4 mt-1'>Enter your location to search</p>
                                    </div>
                                    <div>
                                        <MDBInput label='Location' id='form1' type='text' onChange={e => setQuery(e.target.value)} />
                                    </div>
                                </div>
                            </MDBCardBody>
                        </MDBCard>
                    </div>
                    {
                        loading ?
                            <div style={{ position: "relative", width: "100%", height: "100%" }}>

                                <PulseLoader
                                    color={"#551a8b"}
                                    loading={loading}
                                    style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
                                    size={30}
                                    aria-label="Loading Spinner"
                                    data-testid="loader"
                                />
                            </div>
                            :
                            <GuideCard guide={search(details)} />
                    }
                </div>
            </section>
        </div>
    )
}

export default Guides