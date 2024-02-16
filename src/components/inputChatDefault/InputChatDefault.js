import { Box } from "@mui/material";
import { useState } from "react";
import ChatInputBase from "../chatInputBase/ChatInputBase";

const InputChat = ({sendMessage}) => {
    const [messageText, setMessageText] = useState('');

    const onSendMessage = () => {
        if(!messageText.trim()){
            return;
        }
        sendMessage(messageText);
        setMessageText('');
    }

    return (
        <>
            <Box sx={{
                position: 'fixed',
                bottom: '0',
                left: '0px',
                width: '100%',
                zIndex: '5',
            }}>
                <ChatInputBase onFocus={() => {
                    setTimeout(() => {
                        window.scrollTo({
                            top: document.body.scrollHeight,
                            behavior: 'smooth'
                        })
                    }, 100);
                }} component={'input'} value={messageText} setValue={setMessageText} onSendMessage={onSendMessage} />
            </Box>
        </>
        
    );
};

export default InputChat;