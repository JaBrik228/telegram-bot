import { VariableSizeList as List } from 'react-window';
import Message from '../message/Message';
import moment from 'moment';
import { forwardRef, useEffect, useRef, useState } from 'react';
import {usePreventScroll} from 'react-aria';
import 'moment/locale/ru';

const IphoneChat = forwardRef(({messages, chatBoxRef}, ref) => { 
    // const listRef = useRef(null);

    const [chatBoxHeight, setChatBoxHeight] = useState(chatBoxRef.offsetHeight);

    usePreventScroll({
        isDisabled: false
    });

    useEffect(() => {
        const getContainerHeight = () => {
            setChatBoxHeight(chatBoxRef.offsetHeight);
        }

        window.visualViewport.addEventListener('resize', getContainerHeight);
        return () => {
            window.visualViewport.removeEventListener('resize', getContainerHeight);
        }
    }, []);

    const getItemSize = (index) => {
        const message = messages[index];

        const messageDiv = document.createElement('div');
        const paragraphs = [];

        for (let i = 0; i <= 1; i++) {
            const paragraph = document.createElement('p');
            paragraph.style.cssText = `
                line-height: 1.5;
                letter-spacing: 0.00938em;
                font-family: Roboto;
                font-weight: 400;
                margin: 0;
                padding: 0;
            `;

            if (i === 1) {
                paragraph.style.fontSize = '12px';
                paragraph.textContent = '11.01.2021'
            } else {
                paragraph.style.fontSize = '16px';
                paragraph.textContent = message.text;
            }

            paragraphs.push(paragraph);
        }

        messageDiv.style.cssText = `
            visibility: hidden;
            position: relative;
            width: 274px;
            padding: 5px 10px 5px 8px;
        `;

        paragraphs.forEach(paragraph => {
            messageDiv.appendChild(paragraph);
        });

        document.body.appendChild(messageDiv);

        const height = messageDiv.offsetHeight;
        document.body.removeChild(messageDiv);
        return height + 10;
    };

    const Row = ({ index, style }) => {
        const message = messages[index];

        return (
            <Message style={{
                ...style
            }} key={message.id} isRightPos={message.from_user_id !== -1} text={message.text} time={moment(message.created_at).locale('ru').format("MMMM Do, HH:mm")} />
        )
    }

    return (
        <List
            height={chatBoxHeight}
            itemCount={messages.length}
            itemSize={getItemSize}
            width='100%'
            ref={ref}
            style={{
                height: '100%',
                zIndex: 5
            }}
        >
            {Row}
        </List>
    );
});

export default IphoneChat;

