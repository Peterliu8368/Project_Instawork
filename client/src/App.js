import logo from './logo.svg';
import './App.css';
import LoginReg from './views/LoginReg';
import Navbar from './components/Navbar';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { CssBaseline } from '@mui/material';

function App() {

  const themeOptions = createTheme({
    palette: {
      type: 'light',
      primary: {
        main: '#303030',
      },
      secondary: {
        main: '#607d8b',
      },
      background: {
        default: '#b0bec5',
        paper: '#e0e0e0',
      },
      error: {
        main: '#b71c1c',
      },
      warning: {
        main: '#e65100',
      },
      info: {
        main: '#1976d2',
      },
      success: {
        main: '#2e7d32',
      },
    },
    typography: {
      h6: {
        fontFamily: 'Oswald',
      },
      fontFamily: 'Roboto',
      h1: {
        fontFamily: 'Oswald',
      },
      button: {
        fontFamily: 'Open Sans',
      },
      fontSize: 16,
    },
  });

  return (
    <ThemeProvider theme={themeOptions}>
      <div className="App">
        <Navbar />
        <LoginReg />
      </div>
    </ThemeProvider>

  );
}

export default App;
