import { styled } from "@mui/system";

import { colors } from "../../../tools/colors";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

const {bgColor, textColor} = colors;

export const Chat = styled(Link)({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "9px 13px 10px 10px",
    height: "80px",
    borderBottom: "1px solid #D9D9D9",
    background: bgColor,
    cursor: "pointer",
    transition: "all 0.3s ease",
    textDecoration: "none",
    "&:hover": {
        opacity: "0.7",
    },
});

export const ChatTitle = styled(Typography)({
    fontSize: "16px",
    fontWeight: "500",
    color: textColor,
});
