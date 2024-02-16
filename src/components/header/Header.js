import { Typography } from "@mui/material";
import { StyledHeader } from "./styles";

import { colors } from "../../tools/colors";

const Header = ({title, isFixed}) => {
    return (
        <StyledHeader sx={{
            position: isFixed ? 'fixed' : 'absolute'
        }}>
            <Typography component={'h1'} sx={{
                textAlign: 'center',
                fontSize: '20px',
                fontWeight: '500',
                color: colors.buttonTextColor,
            }}>{title}</Typography>
        </StyledHeader>
    );
};

export default Header;