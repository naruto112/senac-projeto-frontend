import React  from 'react';

import {
    BrowserRouter,
    Routes,
    Route,
  } from "react-router-dom";

import SignIn from "../pages/SignIn";
import Dashboard from '../pages/Dashboard';

const Root: React.FC = () => {

   return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
    </BrowserRouter>
   )
    
}

export default Root;