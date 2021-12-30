import React from 'react';
import { LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import ptLocale from 'date-fns/locale/pt-BR';
import { ThemeProvider } from '@mui/material';
import ReactDOM from 'react-dom';
import Home from './pages/Home';
import reportWebVitals from './reportWebVitals';
import { GlobalStyle } from './styles/global';
import theme from './theme/theme';

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDateFns} locale={ptLocale}>
        <GlobalStyle />
        <Home />
      </LocalizationProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
