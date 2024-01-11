import { Box } from "@mui/material";
import { Button, ChatInput } from "./styles";
import { useState, useRef, useCallback, useEffect } from "react";
import { isIOS } from "../../tools/utils";

const keyboardSize = '270px';

let pendingUpdate = false;


const InputChat = ({sendMessage}) => {
    const [messageText, setMessageText] = useState('');

    const chatRef = useRef(null);
    const inputRef = useRef(null);

    useEffect(() => {
        if (!isIOS()) {
            return;
        }
        function viewportHandler() {
            if (pendingUpdate) return;
            pendingUpdate = true;
            window.requestAnimationFrame(() => {
                pendingUpdate = false;
                
                // Stick to bottom 
                if (window.visualViewport.offsetTop >= 0) {
                    chatRef.current.style.transform = `translateY(-${Math.max(0, window.innerHeight - window.visualViewport.height - window.visualViewport.offsetTop)}px)`;
                } else {
                    chatRef.current.style.transform = '';
                }
            });
        }
        
        window.visualViewport.addEventListener("scroll", viewportHandler);
        window.visualViewport.addEventListener("resize", viewportHandler);

        return () => {
            window.visualViewport.removeEventListener("scroll", viewportHandler);
            window.visualViewport.removeEventListener("resize", viewportHandler);
        }   
    }, []);

    const blurHandler = useCallback(() => {
        if (!isIOS()) {
            return;
        }

        document.body.style.paddingBottom = '0px';
    }, []);

    const onSendMessage = () => {
        if(!messageText.trim()){
            return;
        }
        sendMessage(messageText);
        setMessageText('');
    }

    const iosKeyboardInputFix = useCallback(() => {
        if (!isIOS()) {
            return;
        }
        document.body.style.paddingBottom = keyboardSize;
        window.scrollTo(0, document.body.scrollHeight - 1000);
    }, []);

    return (
        <Box ref={chatRef} sx={{
            position: 'fixed',
            bottom: '0px',
            width: '100%',
            zIndex: '3',
        }}>
            <ChatInput 
                ref={inputRef}
                onBlur={blurHandler} 
                onFocus={iosKeyboardInputFix} 
                value={messageText} 
                onChange={(event) => {
                    setMessageText(event.target.value);
                }} 
                onKeyDown={(e) => {
                    if(e.key === 'Enter'){
                        onSendMessage();
                    }
                }} 
                placeholder="Type your message"/>
            <Button onTouchEnd={(e) => {
                e.preventDefault();
                onSendMessage();
            }} onClick={(e) => {
                e.preventDefault();
                onSendMessage();
            }} />
        </Box>
    );
};

export default InputChat;