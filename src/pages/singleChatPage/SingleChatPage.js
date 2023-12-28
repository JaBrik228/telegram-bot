import { Box } from "@mui/material";
import Message from "../../components/message/Message";
import { useCallback, useEffect, useRef, useState } from "react";
import ApiService from "../../services/apiService/ApiService";
import { useParams } from "react-router";
import moment from 'moment';
import { Button, ChatInput } from "./styles";


const SingleChatPage  = () => {
    const {userId, objectId} = useParams();

    const [messages, setMessages] = useState([]);
    const [messageText, setMessageText] = useState('');

    const {pusher, getMessages, sendMessage} = new ApiService();

    const chatRef = useRef(null);

    useEffect(() => {
        console.log('kk')
        getMessages(userId, objectId)
            .then(data => {
                setMessages((prevMessages) => [...prevMessages, ...data]);
            })
            .catch(() => {
                console.log('error');
            });
    }, []);

    useEffect(() => {
        const channel = pusher.subscribe(`property-${objectId}`);
        channel.bind('message', socketMessage => {
            if(socketMessage.from_user_id !== +userId){
                const currentDate = new Date().toISOString();

                setMessages(prevMessages => [...prevMessages, {
                    "created_at":currentDate,
                    "from_user_id": -1,
                    "id":0,
                    "is_read":true,
                    "property_id":objectId,
                    "text":socketMessage.text,
                    "to_user_id":socketMessage.from_user_id
                }])
            }
        });

        return () => {
            pusher.unsubscribe(`property-${objectId}`);
        };
    }, [objectId, userId]);

    const onSendMessage = useCallback(() => {
        if(!messageText){
            return;
        }
        const currentDate = new Date().toISOString();

        setMessages(prevMessages => [...prevMessages, {
            "created_at":currentDate,
            "from_user_id": +userId,
            "id":messages.length + 1,
            "is_read":true,
            "property_id":objectId,
            "text":messageText,
            "to_user_id":+userId
        }])

        const data = {
            "text": messageText,
            "channel": "property-" + objectId,
            "from_user_id": userId,
            "to_user_id": -1
        };

        setMessageText('');

        sendMessage(data);
    }, [messageText]);

    useEffect(() => {
        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: "smooth"
        });
    }, [messages]);

    const items = messages.map(message => {
        return (
            <Message key={message.id} isRightPos={message.from_user_id !== -1} text={message.text} time={moment(message.created_at).format("MMMM d, HH:mm")} />
        )
    });

    return (
        <Box ref={chatRef} sx={{
            paddingBottom: '10vh',
        }}>
            {items}
            <Box sx={{
                position: 'fixed',
                bottom: '0',
                width: '100%',
            }}>
                <ChatInput value={messageText} onChange={(event) => {
                    setMessageText(event.target.value);
                }} onKeyDown={(e) => {
                    if(e.key === 'Enter'){
                        onSendMessage();
                    }
                }} placeholder="Type your message"></ChatInput>
                <Button onClick={onSendMessage} />
            </Box>
        </Box>
    );
};

export default SingleChatPage;