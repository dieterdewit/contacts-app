// Create and Configure general Material-UI Theme (Mui Theme)

import { createMuiTheme } from '@material-ui/core/styles';
import Lato from '../fonts/lato-v16-latin-regular.woff';

// Use Google Open-font Lato for elegant UI
const latoregular = {
    fontFamily: 'Lato',
    src: `
    local('Lato Regular'), local('Lato-Regular'),
    url(${Lato}) format('woff')
  `,
};

const theme = createMuiTheme({
    typography: {
        fontFamily: [
            'Lato'
        ],
    },
    overrides: {
        MuiCssBaseline: {
            '@global': {
                '@font-face': [latoregular],
            },
        },
    },
    // Set the Global Color Palette
    palette: {
        primary: {
            main: '#019dd6',
        },
        secondary: {
            main: '#e9057b',
        },
        text: {
            main: '#585857'
        },
        error: {
            main: '#8B0000',
        },
        background: {
            default: '#F5F5F5',
        },
    },
});

export default theme;
