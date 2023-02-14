import React, { useEffect, useState } from 'react'
import { getConversations } from '../../../axios/services/ConversationServices'
import Conversation from '../../../Components/UserComponents/Conversation/Conversation'
import Message from '../../../Components/UserComponents/Message/Message'
import Navbar from '../../../Components/UserComponents/Navbar/Navbar'
import './ChatPage.css'

function ChatPage() {
    const [conversations, setConversations] = useState([])

    const user = JSON.parse(localStorage.getItem("profile"))
    const userid = user?.result?._id;

    useEffect(() => {
        const getConversatins = async () => {
            const response = await getConversations(userid)
            setConversations(response.data);
        }
        getConversatins()
    }, [])

    return (
        <>
            <div style={{ height: "150px" }}>
                <Navbar />
            </div>
            <div className='messenger mx-5'>
                <div className='chatMenu'><div className="chatMenuWrapper">
                    <input type="text" placeholder='Search' className='chatMenuInput' />
                    {conversations.map((c) => (
                        <Conversation conversation={c} currentUser={userid} />
                    ))}
                </div>
                </div>
                <div className='chatBox'>
                    <div className="chatBoxWrapper">
                        <div className="chatBoxTop">
                            <Message />
                            <Message own={true} />
                            <Message />
                            <Message />
                            <Message />
                            <Message />
                        </div>
                        <div className="chatBoxBottom">
                            <textarea className='chatMessageInput' placeholder='Write message ...'></textarea>
                            <button className='chatSubmitButton'>Send</button>
                        </div>
                    </div></div>
            </div>
        </>
    )
}

export default ChatPage