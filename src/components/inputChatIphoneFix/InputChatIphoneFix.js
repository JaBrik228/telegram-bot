import { Box } from "@mui/material";
import { useState, useRef, useEffect } from "react";
import ChatInputBase from "../chatInputBase/ChatInputBase";
import { colors } from "../../tools/colors";


const inputPadding = 20;

const buttonSx = {
    height: '35px',
    width: '35px'
}

const InputChatIphoneFix = ({sendMessage, onInputBlur, onInputFocus}) => {
    const [messageText, setMessageText] = useState('');

    const realInputRef = useRef(null);
    const realInputBoxRef = useRef(null);

    const fakeInputRef = useRef(null);

    const blurHandler = (e) => {
        onInputBlur();
        fakeInputRef.current.style.display = 'block';
        realInputBoxRef.current.style.bottom = '99999999px';
    };

    const onSendMessage = () => {
        if(!messageText.trim()){
            return;
        }
        sendMessage(messageText);
        setMessageText('');
    }

    useEffect(() => {
        const keyBoardFix = () => {
            const viewportHeight = window.visualViewport.height;
            const innerHeight = window.innerHeight;

            document.querySelector('.app-container').style.bottom = `${innerHeight - viewportHeight}px`;
            
            window.scroll(0, 0);
        }

        window.visualViewport.addEventListener('resize', keyBoardFix);

        return () => {
            window.visualViewport.removeEventListener('resize', keyBoardFix);
        }

    }, []);

    const iosKeyboardInputFix = (e) => {
        e.preventDefault();

        
        realInputRef.current.focus();
        
        
        setTimeout(() => {
            realInputBoxRef.current.style.bottom = '0px';
            fakeInputRef.current.style.display = 'none';
            onInputFocus();
        }, 400);
    };

    return (
        <>
            <Box ref={realInputBoxRef} sx={{
                position: 'absolute',
                bottom: '999999999999px',
                left: '0px',
                width: '100%',
                zIndex: '5',
            }}>
                <ChatInputBase buttonSx={buttonSx} ref={realInputRef} onBlur={blurHandler} onSendMessage={onSendMessage} setValue={setMessageText} value={messageText} component={'input'} />
            </Box>

            <Box ref={fakeInputRef} sx={{
                position: 'fixed',
                bottom: '0px',
                background: colors.bgColor,
                left: '0px',
                width: '100%',
                zIndex: '3',
                paddingBottom: `${inputPadding}px`,
            }}>
                <ChatInputBase buttonSx={{
                    marginBottom: `${inputPadding / 2}px`,
                    ...buttonSx
                }} sx={{
                    position: 'relative'
                }} onClick={iosKeyboardInputFix} onSendMessage={onSendMessage} component={'div'}>
                    <span 
                        style={{
                            position: 'absolute',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            opacity: messageText.length ? '1' : '0.5'
                        }}>
                        {messageText.length ? messageText : 'Type your message'}
                    </span>
                </ChatInputBase>
            </Box>
        </>        
    );
};

export default InputChatIphoneFix;