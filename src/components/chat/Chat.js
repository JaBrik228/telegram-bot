import 'moment/locale/ru';

import moment from "moment"
import Header from "../header/Header"
import Message from "../message/Message"
import InputChatDefault from "../inputChatDefault/InputChatDefault"
import { useEffect } from "react"
import { Box } from "@mui/material"


const Chat = ({chatTitle, onSendMessage, messages}) => {

    useEffect(() => {
        
        setTimeout(() => {
            window.scrollTo({
                top: document.body.scrollHeight,
                behavior: 'smooth',
                left: 0
            });
        }, 10);
        
    }, [messages.length]);

    const items = messages.map((message) => {
        return (
            <Message 
                style={{
                    marginTop: '10px'
                }}
                key={message.id} 
                isRightPos={message.from_user_id !== -1} 
                text={message.text} 
                time={moment(message.created_at).locale('ru').format("MMMM Do, HH:mm")} 
            />
        )
    })

    return (
        <>
            <Header isFixed title={chatTitle} />    
            <Box sx={{
                padding: '60px 0'
            }}>
                {items}
            </Box>
            

            <InputChatDefault sendMessage={(message) => onSendMessage(message)} />    
        </>
    )
}

export default Chat;