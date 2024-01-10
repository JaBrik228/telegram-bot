import { styled } from '@mui/system';

import { colors } from '../../../tools/colors';

import sendIcon from '../../../assets/icons/send-icon.svg';
// import { TextField } from '@mui/material';

export const ChatInput = styled('input')({
    // display: 'block',
    width: '100%',
    height: '50px',
    padding: '10px 13px',
    border: 'none',
    backgroundColor: colors.bgColor,
    color: colors.textColor,
    fontSize: '16px !important',
    fontWeight: '400',
    outline: 'none',
    zIndex: '4',
    // marginBottom: '0px !important',
    // '-webkit-appearance': 'none'
});

export const Button = styled('button')({
    position: 'absolute',
    bottom: '50%',
    transform: 'translateY(50%)',
    right: '13px',
    width: '27px',
    height: '27px',
    border: 'none',
    mask: `url(${sendIcon}) no-repeat center`,
    maskSize: 'contain',
    outline: 'none',
    backgroundColor: colors.buttonColor,
    zIndex: '5'
});