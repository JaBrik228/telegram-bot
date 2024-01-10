import { Box, Container } from "@mui/material";
import Message from "../../components/message/Message";
import { useCallback, useEffect, useState } from "react";
import ApiService from "../../services/apiService/ApiService";
import { useNavigate, useParams } from "react-router";
import moment from 'moment';
import { BackButton, useHapticFeedback, useShowPopup } from "@vkruglikov/react-telegram-web-app";
import Header from "../../components/header/Header";
import InputChat from "../../components/inputChat/InputChat";

const {apiPusher, getMessages, sendMessage} = new ApiService();

const SingleChatPage  = () => {
    const {userId, objectId} = useParams();

    const [messages, setMessages] = useState([]);
    const [status, setStatus] = useState('idle');

    const showPopup = useShowPopup();

    const navigate = useNavigate();

    const [impactOccurred] = useHapticFeedback();

    useEffect(() => {
        setStatus('loading');

        getMessages(userId, objectId)
            .then(data => {
                setMessages((prevMessages) => [...prevMessages, ...data]);
                setStatus('idle');
            })
            .catch(() => {
                setStatus('error');
                showPopup({
                    message: 'Что-то пошло не так, попробуйте перезапустить приложение'
                });
            });
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        const channel = apiPusher.subscribe(`property-${objectId}`);
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
            apiPusher.unsubscribe(`property-${objectId}`);
        };
    }, [objectId, userId]);

    const onSendMessage = useCallback((messageText) => {
        impactOccurred('light');

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

        sendMessage(data);
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: "smooth"
        });
    }, [messages]);

    const items = status === 'idle' && messages.map(message => {
        return (
            <Message key={message.id} isRightPos={message.from_user_id !== -1} text={message.text} time={moment(message.created_at).format("MMMM d, HH:mm")} />
        )
    });

    const chatTitle = status === 'loading' ? 'Загрузка...' : 'Чат';

    return (
        <>
            <Header title={chatTitle} />

            <Box sx={{
                padding: '60px 0 70px 0',
            }}>
                <Container maxWidth>
                    {items}
                </Container>
                <InputChat sendMessage={(message) => onSendMessage(message)} />
            </Box>

            <BackButton onClick={() => {
                navigate(-1);
            }} />
        </>
    );
};

export default SingleChatPage;