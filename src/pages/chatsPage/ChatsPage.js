import { Typography, Box } from "@mui/material";
import ChatPageCard from "../../components/chatPageCard/ChatPageCard";
import { Header } from "./styles";
import {useParams} from "react-router-dom";
import { useShowPopup } from '@vkruglikov/react-telegram-web-app';

import { tg } from "../../tools/tg";
import ApiService from "../../services/apiService/ApiService";
import { useEffect, useState } from "react";

const ChatsPage = () => {
    const {userId} = useParams();

    const [status, setStatus] = useState('idle');
    const [objects, setObjects] = useState([]);

    const showPopUp = useShowPopup();

    const {getObjects} = new ApiService();

    useEffect(() => {
        setStatus('loading');

        getObjects(userId)
            .then(data => {
                setObjects(data);
                setStatus('idle');
            })
            .catch(() => {
                setStatus('error');
                showPopUp({
                    message: 'Что-то пошло не так, попробуйте перезапустить приложение',
                })
            });
    }, [userId]);

    const chats = status === 'idle' && <Chats chats={objects} />;
    const headerTitle = status === 'idle' ? 'Chats' : 'Loading...';

    return (
        <>
            <Header>
                <Typography component={'h1'} sx={{
                    textAlign: 'center',
                    fontSize: '20px',
                    fontWeight: '500',
                    color: tg?.button_text_color ? tg.button_text_color : '#fff'
                }}>{headerTitle}</Typography>
            </Header>
            {chats}
        </>
    )
};


const Chats = ({chats}) => {
    const {userId} = useParams();

    const items = chats.map(chat => {
        return (
            <ChatPageCard key={chat.id} chat={chat} userId={userId} />
        )
    });

    return (
        <Box sx={{paddingTop: '57px'}}>
            {items}
        </Box>
    )
}

export default ChatsPage;