import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Log from './Log';
import Details from './Details';
import CallDetails from './CallDetails';
import "./css/app.css"
import "./css/body.css"
import "./css/header.css"

import { BrowserRouter, Route, Routes, Outlet } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} >
          <Route index path="" element={<Log />} />
          <Route path="details" element={<Details />} >
            <Route path=":callID" element={<CallDetails />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

