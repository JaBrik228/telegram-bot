import { Box } from "@mui/material";
import { Button, ChatInput } from "./styles";
import { useState, useRef, useCallback, useEffect } from "react";
import { isIOS } from "../../tools/utils";

import { enableBodyScroll, disableBodyScroll } from "body-scroll-lock";

const viewport = window.visualViewport;

const MAX_KEYBOARD_PROPORTION = .52;

const InputChat = ({sendMessage}) => {
    const [messageText, setMessageText] = useState('');

    const chatRef = useRef(null);
    const inputRef = useRef(null);

    useEffect(() => {
        // if (!isIOS()) {
        //     return;
        // }

        // const closeInput = (e) => {
        //     if (chatRef.current.contains(e.target)) {
        //         console.log('clicked outside');
        //         inputRef.current.focus();
        //     }
        // }

        // window.addEventListener("touchstart", closeInput);

        // const height = window.visualViewport.height;

        // function resizeHandler() {
        //     chatRef.current.style.bottom = `${height - viewport.height}px`;
        // }


        // viewport.addEventListener("resize", resizeHandler);
        // return () => {
        //     // viewport.removeEventListener("resize", resizeHandler);
        //     // window.removeEventListener("touchstart", closeInput);
        // }
    }, []);

    const blurHandler = useCallback(() => {
        if (!isIOS()) {
            return;
        }

        // document.body.style.paddingBottom = '0px';
        // chatRef.current.style.position = 'fixed';
        // chatRef.current.style.marginBottom = '0px';
        // chatRef.current.classList.remove('input--focused');
        window.scrollTo(0, document.body.scrollHeight);
    }, []);

    const onSendMessage = () => {
        if(!messageText.trim()){
            return;
        }
        sendMessage(messageText);
        setMessageText('');
    }

    const iosKeyboardInputFix = useCallback(() => {
        // if (!isIOS()) {
        //     return;
        // }
        // document.body.style.paddingBottom = '270px';
        chatRef.current.style.bottom = 'env(keyboard-inset-bottom, 30px)';
        setTimeout(() => {
            chatRef.current.style.bottom = '0px';
        }, 500);

        // chatRef.current.style.position = 'absolute';
        // chatRef.current.style.marginBottom = '270px';
    }, []);

    return (
        <Box ref={chatRef} sx={{
            position: 'absolute',
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