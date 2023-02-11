import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './404.css'

function ErrorPage() {
    const navigate = useNavigate()

    function handleBackButton() {
        navigate(-1)
    }
    return (
        <div>
            <div class="mainbox">
                <div class="err" style={{color:"#551a8b"}}>4</div>
                <i class="far fa-question-circle fa-spin"></i>
                <div class="err2" style={{color:"#551a8b"}}>4</div>
                <div class="msg ">Maybe this page moved? Got deleted? Is hiding out in quarantine? Never existed in the first
                    place?<p><button class="btn" onClick={handleBackButton}>
                        Click here to go back</button></p>
                </div>
            </div>
        </div>
    )
}

export default ErrorPage