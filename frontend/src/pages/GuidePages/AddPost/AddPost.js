import { MDBBtn, MDBCard, MDBCardBody, MDBCardText, MDBCardTitle, MDBCol, MDBContainer, MDBInput, MDBRow, MDBSpinner } from 'mdb-react-ui-kit'
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import PulseLoader from "react-spinners/PulseLoader";
import { toast } from 'react-toastify';
import { activityPost, descriptionPost, languagePost, pricePost } from '../../../axios/services/GuideServices';
// import { activityPost } from '../../../../../backend/controllers/guide';
import NavbarGuide from '../../../Components/GuideComponents/Navbar/NavBar/Navbar'

function AddPost() {

    const [loading, setLoading] = useState(false);
    const [guideId, setGuideId] = useState("");
    const [activity, setActivity] = useState('');
    const [language, setLanguage] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const formRef = useRef(null);
    const navigate = useNavigate()

    useEffect(() => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 500)
    }, [])

    const token = JSON?.parse(localStorage?.getItem("guide"))?.guide;
    useEffect(() => {
        if (!token) {
            navigate("/guideSignin")
        } else {
            const guideId = JSON.parse(localStorage.getItem("guide")).result._id
            setGuideId(guideId)
        }
    }, [])

    const handleChange = (e) => {
        setActivity(e.target.value);
        setLanguage(e.target.value);
        setDescription(e.target.value);
        setPrice(e.target.value);
    }

    const activityPst = async (e) => {
        e.preventDefault();
        setLoading(true);

        const trimmedActivity = activity.trim();
        if (trimmedActivity !== '') {
            const activityData = { activity, guideId };

            try {
                const response = await activityPost(activityData, token);
                if (response.message) {
                    toast.success(response.message)
                } else {
                    toast.error(response.error)
                }
                formRef.current.reset()
            } catch (error) {
                console.log(error);
            }
        }
        setLoading(false);
    }

    const languagePst = async (e) => {
        e.preventDefault();
        setLoading(true);

        const trimmedLanguage = language.trim();
        if (trimmedLanguage !== '') {
            const languageData = { language, guideId };

            try {
                const response = await languagePost(languageData, token);
                if (response.message) {
                    toast.success(response.message)
                } else {
                    toast.error(response.error)
                }
                formRef.current.reset()
            } catch (error) {
                console.log(error);
            }
        }
        setLoading(false);
    }

    const descriptnPst = async (e) => {
        e.preventDefault();
        setLoading(true);

        const trimmedDescription = description.trim();
        if (trimmedDescription !== '') {
            const descriptionData = { description, guideId }

            try {
                const response = await descriptionPost(descriptionData, token)
                console.log(response);
                const message = response.message;
                toast.success(message)
                formRef.current.reset()

            } catch (error) {
                console.log(error);
            }
        }
        setLoading(false);
    }


    const pricePst = async (e) => {
        e.preventDefault();
        setLoading(true);


        const trimmedPrice = price.trim();
        if (trimmedPrice !== '') {
            const priceData = { price, guideId };

            try {
                const response = await pricePost(priceData, token);
                console.log(response);
                // const message = response.message
                if (response.message) {
                    toast.success(response.message)
                } else {
                    toast.error(response.error)
                }
                formRef.current.reset()
            } catch (error) {
                console.log(error);
            }
        }
        setLoading(false);
    }

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
                        <MDBContainer className="py-5">
                            <MDBRow>
                                <MDBCol className='px-3' lg="6">
                                    <MDBCard>
                                        <MDBCardBody >
                                            <MDBCardTitle className="text-center m-4">Add Activities</MDBCardTitle>
                                            <form ref={formRef} onSubmit={activityPst}>
                                                <MDBInput required label="Add your activities" onChange={handleChange} />
                                                <div className='m-2 text-center'>
                                                    <MDBBtn type="submit" className=' '> Add Activity</MDBBtn>
                                                </div>
                                            </form>
                                        </MDBCardBody>
                                    </MDBCard>
                                </MDBCol>

                                <MDBCol className='px-3' lg="6">

                                    <MDBCard>
                                        <MDBCardBody >
                                            <MDBCardTitle className="text-center m-4">Add Languages</MDBCardTitle>
                                            <form ref={formRef} onSubmit={languagePst}>
                                                <MDBInput required label="Add known languages" onChange={handleChange} />
                                                <div className='m-2 text-center'>
                                                    <MDBBtn type="submit" className=' '> Add Language</MDBBtn>
                                                </div>
                                            </form>
                                        </MDBCardBody>
                                    </MDBCard>

                                </MDBCol>
                            </MDBRow>

                            <MDBRow className=''>

                                <MDBCol className='px-3 py-5' lg="6">
                                    <MDBCard>
                                        <MDBCardBody >

                                            <MDBCardTitle className="text-center m-4">Add Price</MDBCardTitle>
                                            <form ref={formRef} onSubmit={pricePst}>
                                                {/* <MDBInput required label="Add your activities" onChange={handleChange} /> */}
                                                <div className='m-2 text-center'>
                                                    <MDBInput type="number" required label="Add your price for a day" onChange={handleChange} />
                                                    <MDBBtn type="submit" className='m-4 '>Add Price</MDBBtn>
                                                </div>
                                            </form>
                                        </MDBCardBody>
                                    </MDBCard>
                                </MDBCol>

                                <MDBCol className='px-3 py-5' lg="6">
                                    <MDBCard>
                                        <MDBCardBody >

                                            <MDBCardTitle className="text-center m-4">Add Your Description</MDBCardTitle>
                                            <form ref={formRef} onSubmit={descriptnPst}>
                                                {/* <MDBInput required label="Add your activities" onChange={handleChange} /> */}
                                                <textarea className="form-control z-depth-1" id="exampleFormControlTextarea6" rows="3" required placeholder="Add your description" onChange={handleChange} ></textarea>
                                                <div className='m-2 text-center'>
                                                    <MDBBtn type="submit" className=' '>Add Description</MDBBtn>
                                                </div>
                                            </form>
                                        </MDBCardBody>
                                    </MDBCard>
                                </MDBCol>

                            </MDBRow>
                        </MDBContainer>
                    </div>

            }

        </>
    );
}

export default AddPost