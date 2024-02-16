
import { useCallback, useEffect, useState } from "react";
import ApiService from "../../services/apiService/ApiService";
import { useNavigate, useParams } from "react-router";
import { BackButton, useHapticFeedback, useShowPopup, useWebApp } from "@vkruglikov/react-telegram-web-app";
import { isIOS, toMessageObj } from "../../tools/utils";
import IphoneKeyboardFix from "../../components/iphoneFixKeyboard/IphoneKeyboardFix";
import Chat from "../../components/chat/Chat";


const {apiPusher, getMessages, sendMessage} = new ApiService();

const SingleChatPage  = () => {
    const {userId, objectId} = useParams();

    const [messages, setMessages] = useState([]);
    const [status, setStatus] = useState('idle');

    const showPopup = useShowPopup();
    const tg = useWebApp();

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
                }).then(() => tg.close());
            });
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        const channel = apiPusher.subscribe(`property-${objectId}`);
        channel.bind('message', socketMessage => {
            if(socketMessage.from_user_id !== +userId){
                const message = toMessageObj(
                    -1,
                    messages.length,
                    objectId, 
                    socketMessage.text, 
                    socketMessage.from_user_id
                );

                setMessages(prevMessages => [...prevMessages, message])
            }
        });

        return () => {
            apiPusher.unsubscribe(`property-${objectId}`);
        };

        // eslint-disable-next-line
    }, [objectId, userId]);

    const onSendMessage = useCallback((messageText) => {
        impactOccurred('light');

        const message = toMessageObj(
            userId,
            messages.length,
            objectId, 
            messageText
        );

        setMessages(prevMessages => [...prevMessages, message])

        const data = {
            "text": messageText,
            "channel": "property-" + objectId,
            "from_user_id": userId,
            "to_user_id": -1
        };

        sendMessage(data);
        // eslint-disable-next-line
    }, []);


    const chatTitle = status === 'loading' ? 'Загрузка...' : 'Чат';

    return (
        <>
            {isIOS() ? <IphoneKeyboardFix chatTitle={chatTitle} messages={messages} onSendMessage={(message) => onSendMessage(message)} /> : <Chat messages={messages} onSendMessage={onSendMessage} chatTitle={chatTitle}/>}

            <BackButton onClick={() => {
                navigate(-1);
            }} />
        </>
    );
};

export default SingleChatPage;