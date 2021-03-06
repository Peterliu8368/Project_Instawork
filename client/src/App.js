import logo from './logo.svg';
import './App.css';
import LoginReg from './views/LoginReg';
import Navbar from './components/Navbar';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Switch, Route, useHistory, Redirect } from "react-router-dom";
import { CssBaseline } from '@mui/material';
import React from 'react';
import Supervisor from "./views/Supervisor"
import Welcome from "./views/Welcome"
import CreateOrg from "./views/CreateOrg";
import ApplyOrg from "./views/ApplyOrg";
import {useEffect, createContext, useReducer, useContext} from 'react';
import {reducer, initialState} from './views/Reducers/UserReducer'
import Admin from './views/Admin';
import {ReactSession} from 'react-client-session';

export const UserContext = createContext();

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
  ReactSession.setStoreType("sessionStorage");
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <UserContext.Provider value={{state,dispatch}}>
    <ThemeProvider theme={themeOptions}>
      <Switch>
        {/* default route */}
        <Route exact path='/'>
          {/* add a conditional rendering here, if logged in, redirect to dashboard, otherwise to login page */}
          <Redirect to="/logReg" />
        </Route>

        {/* login route */}
        <Route exact path='/logReg'>
          <div className="App">
            <Navbar />
            <LoginReg />
          </div>
        </Route>
        {/* login route */}
        <Route exact path='/welcome'>
            <Welcome />
        </Route>

        <Route exact path='/organization/create'>
            <CreateOrg />
        </Route>

        <Route exact path='/organization/apply'>
            <ApplyOrg />
        </Route>



        {/* admin dashboard */}
        <Route exact path='/dashboard/admin/:orgId'>
          <Admin />
        </Route>

        {/* create org */}
        <Route exact path='/organization/create'>
          
        </Route>

        {/* apply org */}
        <Route exact path='/organization/apply'>
          
        </Route>

        {/* dashboard */}
        <Route exact path='/dashboard/:orgId'>
          <Supervisor />
        </Route>

        {/* dashboard with dept Id*/}
        <Route exact path='/dashboard/:orgId/:deptId'>
          <Supervisor />
        </Route>

      </Switch>


      
    </ThemeProvider>
    </UserContext.Provider>
  );
}

export default App;