import React from 'react'
import { BsArrowRightShort } from 'react-icons/bs'
import './TravelTips.css'


import img1 from '../../assets/images/tip1.jpg'
import img2 from '../../assets/images/tip2.jpg'
import img3 from '../../assets/images/tip3.jpg'
import img4 from '../../assets/images/tip4.jpg'

const Posts =[
    {
        id:1,
        postImage:img1,
        title:"How to Plan a Trip: 7 Easy Tips for Your Next Adventure",
        desc:"Planning a trip is an exciting part of your new upcoming travel adventure. It’s not for everyone as some swear by only booking a flight ticket."
    },
    {
        id:2,
        postImage:img2,
        title:"Travel Safety: 17 Tips on How to Travel Safe",
        desc:"Planning a trip is an exciting part of your new upcoming travel adventure. It’s not for everyone as some swear by only booking a flight ticket."
    },
    {
        id:3,
        postImage:img3,
        title:"Work and Travel: Go Abroad on a Working Holiday",
        desc:"Planning a trip is an exciting part of your new upcoming travel adventure. It’s not for everyone as some swear by only booking a flight ticket."
    },
    {
        id:4,
        postImage:img4,
        title:"Best Travel Insurances for Backpackers",
        desc:"Planning a trip is an exciting part of your new upcoming travel adventure. It’s not for everyone as some swear by only booking a flight ticket."
    },
    
]


function TravelTips() {
  return (
    <section className='blog container section'>
    <div className="secContainer">
        <div className="secIntr">
            <h2 className='secTitle'>
                Travel Tips
            </h2>
            <p>
                An insight to the incredible experience in the world
            </p>
        </div>
        <br/>
        <div className="mainContainer grid">
        {
            Posts.map(({id,postImage,title,desc}) => {
                return(
                    <div className="singlePost grid" key={id}>
                <div className="imgDiv">
                    <img src={postImage} alt={title} />
                </div>
                <div className="postDetails">
                    <h3>
                        {title}
                    </h3>
                    <p>{desc}</p>
                </div>
                
                <a href="#" className='flex'>
                <BsArrowRightShort className='icon'/>
                    Read More
                </a>
                    </div>
                )

            })
        }
        </div>
    </div>

    </section>
  )
}

export default TravelTips