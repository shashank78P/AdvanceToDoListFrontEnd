import React, { useContext } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import UserContextProvider from './component/context/userContextProvider';
import "./App.css"
import globalStyle from "./style/global.module.css"
import userContext from './component/context/userContext';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter >
    <UserContextProvider>
      <div className={globalStyle.root}>
        <App />
      </div>
    </UserContextProvider>
  </BrowserRouter >

);

reportWebVitals();
