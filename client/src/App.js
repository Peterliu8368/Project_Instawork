import logo from './logo.svg';
import './App.css';
import LoginReg from './views/LoginReg';
import Navbar from './components/Navbar';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Switch, Route, useHistory, Redirect } from "react-router-dom";
import { CssBaseline } from '@mui/material';
import Supervisor from "./views/Supervisor"

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
      <Switch>
        {/* default route */}
        <Route exact path='/'>
          {/* do a conditional rendering here, if loggedin, redirect to dashboard, otherwise to login page */}
          <Redirect to="/logReg" />
        </Route>

        {/* login route */}
        <Route exact path='/logReg'>
          <div className="App">
            <Navbar />
            <LoginReg />
          </div>
        </Route>

        {/* member dashboard */}
        <Route exact path='/dashboard/member'>
          
        </Route>

        {/* supervisor dashboard */}
        <Route exact path='/dashboard/supervisor'>
          <Supervisor></Supervisor>
        </Route>

        {/* admin dashboard */}
        <Route exact path='/dashboard/admin'>
          
        </Route>

        {/* create org */}
        <Route exact path='/organization/create'>
          
        </Route>

        {/* apply org */}
        <Route exact path='/organization/apply'>
          
        </Route>


      </Switch>


      
    </ThemeProvider>

  );
}

export default App;