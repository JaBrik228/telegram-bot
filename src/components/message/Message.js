import { ChatMessage, MessageText, MessageTime, MessageWrapper } from "./styles";

import shapeRight from '../../assets/icons/shape-right.svg';
import shapeLeft from '../../assets/icons/shape-left.svg';

import { colors } from "../../tools/colors";



const Message = ({ isRightPos, text, time, style }) => {
    return (
        <MessageWrapper sx={{
            justifyContent: isRightPos ? 'flex-end' : 'flex-start',
            ...style
        }}>
            <ChatMessage sx={{
                borderRadius: isRightPos ? '8px 8px 0px 8px' : '8px 8px 8px 0px',
                filter: isRightPos ? 'invert(0.08)' : null,
                '&:after': {
                    content: `''`,
                    mask: `url(${isRightPos ? shapeRight : shapeLeft}) no-repeat 50% 50%`,
                    position: 'absolute',
                    bottom: '0',
                    right: isRightPos ? '-5px' : '274px',
                    width: '6px',
                    height: '10px',
                    backgroundColor: colors.bgColor,
                    maskSize: 'contain',
                }
            }}>
                <MessageText component={'p'}>{text}</MessageText>
                <MessageTime sx={{
                    textAlign: 'right',
                }} component={'p'}>{time}</MessageTime>
            </ChatMessage>
        </MessageWrapper>
    );
};

export default Message;