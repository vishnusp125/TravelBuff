import React from 'react'
import './Message.css'

function Message({own}) {
  return (
    <div className={own ? "message own" : "message"}>
        <div className="messageTop">
            <img className='messageImg'
             src="https://res.cloudinary.com/dbja8miqr/image/upload/v1676279476/default-profile-pic-e1513291410505_nbhwcf.jpg" 
            alt="image" />
            <p className='messageText'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi, ex?</p>
        </div>
        <div className="messageBottom">1 hour ago</div>
    </div>
  )
}

export default Message