import { createTheme } from '@mui/material/styles';

const globalTheme = createTheme({
    palette: {
        background: {
            default: '#f5eadc',
        },
        primary: {
            main: '#fe6601',
        },
    },

    typography: {
        fontSize: 13,
        fontFamily: [
            'Barlow',
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(",")
    }
});

export default globalTheme;