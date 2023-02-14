import React, { useEffect, useState } from 'react'
import { guideDetails } from '../../../axios/services/ConversationServices'
import './Conversation.css'

function Conversation({conversation, currentUser}) {

  const [user, setUser] = useState(null)
  
 
  const guideId = conversation.members.find((m) => m !== currentUser)
  useEffect(() => {
    const getGuide = async () => {
      try {
        const response = await guideDetails(guideId)
        setUser(response)

      } catch (err) {
        console.log(err);
      }
    }
    getGuide()
  },[currentUser, conversation])

  return (
    <div className='conversation'>
        <img className='conversationImg' 
        src={user?.image ? user?.image:"https://res.cloudinary.com/dbja8miqr/image/upload/v1676279476/default-profile-pic-e1513291410505_nbhwcf.jpg"}
        alt="avatar" />
        <span className='conversationName'>{user?.name}</span>
    </div>
  )
}

export default Conversation