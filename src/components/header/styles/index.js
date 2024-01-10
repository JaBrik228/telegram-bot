import { styled } from '@mui/system';

import { colors } from '../../../tools/colors';

export const StyledHeader = styled('div')({
    position: 'fixed',
    top: '0',
    width: '100%',
    height: '57px',
    background: colors.buttonColor,
    padding: '14px 0',
    zIndex: '99999'
});