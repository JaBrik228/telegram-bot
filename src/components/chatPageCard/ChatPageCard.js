import { useHapticFeedback } from '@vkruglikov/react-telegram-web-app';
import homeIcon from '../../assets/icons/home-icon.png';

import { Chat, ChatTitle } from "./styles/styles";
import {Avatar, Box} from '@mui/material';



const ChatPageCard = ({chat, userId}) => {
    const {id, address} = chat;

    const [impactOccurred] = useHapticFeedback();

    return (
        <Chat onClick={() => {
            impactOccurred('light');
        }} to={`/chat/${userId}/${id}`}>
            <Box sx={{display: 'flex', justifyContent: 'flex-start', alignItems: 'center'}}>
                <Avatar alt='home' src={homeIcon} sx={{
                    height: '57px', 
                    width: '57px', 
                    mr: '12px',
                    '& .MuiAvatar-img': {
                        objectFit: 'contain',
                        width: '80%',
                        height: '80%'
                    }
                }}/>
                <ChatTitle component={'div'}>{`${id}) ${address}`}</ChatTitle>
            </Box>
        </Chat>
    );
};

export default ChatPageCard;