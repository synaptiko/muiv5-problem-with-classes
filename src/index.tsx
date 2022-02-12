import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from '@mui/material';

export const muiCache = createCache({
    "key": "mui",
    "prepend": true
});

export const theme = createTheme({});

ReactDOM.render(
  <React.StrictMode>
    <CacheProvider value={muiCache}>
        <ThemeProvider theme={theme}>
					<CssBaseline />
					<App />
        </ThemeProvider>
    </CacheProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
