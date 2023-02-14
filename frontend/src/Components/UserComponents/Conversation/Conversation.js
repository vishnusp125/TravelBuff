import React, { useEffect, useState } from 'react'
import './Conversation.css'

function Conversation({conversation, currentUser}) {

  const[user, setuser] = useState(null)

  useEffect(() => {

    const guideId = conversation.member.find((m) => m !== currentUser)
    const getGuide = async () => {
      try {

      } catch (err) {
        console.log(err);
      }
    }

  },[])

  return (
    <div className='conversation'>
        <img className='conversationImg' 
        src="https://res.cloudinary.com/dbja8miqr/image/upload/v1676279476/default-profile-pic-e1513291410505_nbhwcf.jpg" 
        alt="avatar" />
        <span className='conversationName'>John Doe</span>
    </div>
  )
}

export default Conversation