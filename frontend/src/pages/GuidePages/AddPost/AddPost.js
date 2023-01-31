import { MDBBtn, MDBCard, MDBCardBody, MDBCardText, MDBCardTitle, MDBCol, MDBContainer, MDBInput, MDBRow } from 'mdb-react-ui-kit'
import React, { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify';
import { activityPost, descriptionPost, languagePost, pricePost } from '../../../axios/services/GuideServices';
// import { activityPost } from '../../../../../backend/controllers/guide';
import NavbarGuide from '../../../Components/GuideComponents/Navbar/NavBar/Navbar'

function AddPost() {

    const [guideId, setGuideId] = useState("");
    const [activity, setActivity] = useState('');
    const [language, setLanguage] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const formRef = useRef(null);

    useEffect(() => {
        const guide = JSON.parse(localStorage.getItem("guide"))
        const guideId = guide.result._id
        setGuideId(guideId)
    }, [])

    const handleChange = (e) => {
        setActivity(e.target.value);
        setLanguage(e.target.value);
        setDescription(e.target.value);
        setPrice(e.target.value);
    }

    const activityPst = async (e) => {
        e.preventDefault();
        const activityData = { activity, guideId };

        try {
            const response = await activityPost(activityData);
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

    const languagePst = async (e) => {
        e.preventDefault();
        const languageData = { language, guideId };

        try {
            const response = await languagePost(languageData);
            if (response.message) {
                toast.success(response.message)
            } else {
                toast.error(response.error)
            }
            formRef.current.reset()
        } catch (error) {
            console.log(error);
        }

        // try {
        //     const response = await languagePost(languageData);
        //     const message = response.message
        //     toast.success(message)
        //     formRef.current.reset()
        // } catch (error) {
        //     console.log(error);
        // }
    }

    const descriptnPst = async (e) => {
        e.preventDefault();
        const descriptionData = { description, guideId }

        try {
            const response = await descriptionPost(descriptionData)
            console.log(response);
            const message = response.message;
            toast.success(message)
            formRef.current.reset()

        } catch (error) {
            console.log(error);
        }

    }


    const pricePst = async (e) => {
        e.preventDefault();
        const activityData = { price, guideId };

        try {
            const response = await pricePost(activityData);
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

    return (
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
                                        <MDBBtn type="submit" className='m-4 '>Add Activity</MDBBtn>
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
                                        <MDBBtn className='m-4'>Add Language</MDBBtn>
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
    )
}

export default AddPost