import { Button, ChatInput } from "./styles";
import { forwardRef } from "react";


const ChatInputBase = forwardRef(({component, children, value, onFocus, onSendMessage, onBlur, onClick, setValue, sx, buttonSx}, ref) => {
    return (
        <>
            <ChatInput 
                ref={ref}
                onClick={onClick} 
                onChange={(e) => setValue(e.target.value)}
                onFocus={onFocus}
                component={component}
                onBlur={onBlur}
                value={value}
                placeholder={'Type your message'}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        e.preventDefault();
                        onSendMessage();
                    }
                }}
                sx={{
                    ...sx
                }}
            >
                {children}
            </ChatInput>
            <Button sx={{
                zIndex: '4',
                ...buttonSx
            }} onTouchEnd={(e) => {
                e.preventDefault();
                onSendMessage();
            }} onClick={(e) => {
                e.preventDefault();
                onSendMessage();
            }}/>
        </>
    );
});

export default ChatInputBase;