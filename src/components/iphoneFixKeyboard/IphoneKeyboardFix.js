import { Box } from "@mui/material";
import IphoneChat from "../iphoneChat/IphoneChat";
import { useCallback, useEffect, useRef, useState } from "react";
import Header from "../header/Header";
import InputChatIphoneFix from "../inputChatIphoneFix/InputChatIphoneFix";


const IphoneKeyboardFix = ({messages, onSendMessage, chatTitle}) => {

    const [chatBottomValue, setChatBottomValue] = useState('70px');

    const chatBoxRef = useRef(null);
    const virtualScrollRef = useRef(null);

    const onInputFocus = useCallback(() => {
        setChatBottomValue('50px');
        if (virtualScrollRef.current) {
            setTimeout(() => {
                console.log(virtualScrollRef.current);
                console.log(messages.length)
                virtualScrollRef.current.scrollToItem(messages.length);
            }, 400);
        }
    }, [virtualScrollRef.current, messages]);

    const onInputBlur = useCallback(() => {
        setChatBottomValue('70px');
    }, []);

    useEffect(() => {
        console.log(messages.length)
        if (virtualScrollRef.current) {
            setTimeout(() => {
                virtualScrollRef.current.scrollToItem(messages.length);
            }, 10);
        }
    }, [messages.length]);

    return (
        <>
            <Box className='app-container' sx={{
                position: 'absolute',
                top: '0',
                bottom: 'env(safe-area-inset-bottom)',
                left: '0',
                right: '0',
                // overflow: 'hidden',
                zIndex: 1
            }}>
                <Header title={chatTitle} />

                <Box ref={chatBoxRef} sx={{
                    position: 'absolute',
                    left: '0',
                    width: '100%',
                    top: '60px',
                    bottom: chatBottomValue,
                    zIndex: 2
                }}>
                        {messages.length ? <IphoneChat ref={virtualScrollRef} chatBoxRef={chatBoxRef.current} messages={messages}/> : null}
                </Box>

                <InputChatIphoneFix onInputBlur={onInputBlur} onInputFocus={onInputFocus} virtualScrollRef={virtualScrollRef} messages={messages} sendMessage={(message) => onSendMessage(message)} />
            </Box>
        </>
    );
};

export default IphoneKeyboardFix;