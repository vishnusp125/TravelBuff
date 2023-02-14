import React from 'react'
import './Message.css'
import {format} from 'timeago.js'

function Message({message, own}) {
  return (
    <div className={own ? "message own" : "message"}>
        <div className="messageTop">
            <img className='messageImg'
             src="https://res.cloudinary.com/dbja8miqr/image/upload/v1676279476/default-profile-pic-e1513291410505_nbhwcf.jpg" 
            alt="image" />
            <p className='messageText'>{message.text}</p>
        </div>
        <div className="messageBottom">{format(message.createdAt)}</div>
    </div>
  )
}

export default Message