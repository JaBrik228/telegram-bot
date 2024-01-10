import { Box } from "@mui/material";
import ChatPageCard from "../../components/chatPageCard/ChatPageCard";
import {useParams} from "react-router-dom";
import { useShowPopup } from '@vkruglikov/react-telegram-web-app';

import ApiService from "../../services/apiService/ApiService";
import { useEffect, useState } from "react";
import Header from "../../components/header/Header";

const {getObjects} = new ApiService();

const ChatsPage = () => {
    const {userId} = useParams();

    const [status, setStatus] = useState('idle');
    const [objects, setObjects] = useState([]);

    const showPopUp = useShowPopup();

    useEffect(() => {
        setStatus('loading');

        getObjects(userId)
            .then(data => {
                setObjects(data);
                setStatus('idle');
            })
            .catch((e) => {
                setStatus('error');
                showPopUp({
                    message: e,
                })
            });
        
        // eslint-disable-next-line
    }, [userId]);

    const chats = status === 'idle' && <Chats chats={objects} />;
    const headerTitle = status === 'loading' ? 'Загрузка...' : 'Чаты';

    return (
        <>
            <Header title={headerTitle} />
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