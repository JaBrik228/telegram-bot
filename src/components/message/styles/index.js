import { styled } from "@mui/system";

import { colors } from "../../../tools/colors";
import { Typography } from "@mui/material";

const {bgColor, textColor, hintColor} = colors;

export const MessageWrapper = styled("div")({
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    paddingLeft: '12px',
    paddingRight: '12px',
    // marginTop: "40px",
});

export const ChatMessage = styled("div")({
    position: "relative",
    width: '274px',
    padding: '5px 10px 5px 8px',
    background: bgColor
});

export const MessageText = styled(Typography)({
    fontSize: '16px',
    fontWeight: '400',
    color: textColor,
    margin: '0',
    padding: '0'
});

export const MessageTime = styled(Typography)({
    fontSize: '12px',
    fontWeight: '400',
    color: hintColor,
});