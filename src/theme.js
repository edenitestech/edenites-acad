import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
  fonts: {
    heading: 'Poppins, sans-serif',
    body: 'Poppins, sans-serif',
  },
  colors: { // Add this colors section
    primary: '#2b5876',
    secondary: '#4e4376',
    white: '#ffffff',
  },
  fontWeights: { // Add font weights
    normal: 400,
    medium: 500,
    bold: 700,
    semiBold: 600
  }
});

export default theme;


