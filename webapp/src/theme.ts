import { createTheme } from '@mui/material/styles';

const globalTheme = createTheme({
    palette: {
        background: {
            default: '#f5eadc',
        },
        primary: {
            main: '#fe8801',
        },
    },

    typography: {
        fontSize: 12,
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