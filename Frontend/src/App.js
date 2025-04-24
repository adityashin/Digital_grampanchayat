import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import axios from "axios";
import Home from "./Components/Home";
import Login from "./Components/Login";
import Register from "./Components/Register";


import Admin from "./Admin/Admin";
import AddMember from "./Admin/AddMember";
import ViewMembers from "./Admin/ViewMembers";
import ViewPayments from "./Admin/ViewApplications";
import AddScheme from "./Admin/AddScheme";

import YourSchemes from "./Customer/YourSchemes";
import EditProfile from "./Customer/EditProfile";
import ViewSchemes from "./Admin/ViewSchemes";
import ViewApplications from "./Admin/ViewApplications";




function App() {
  return (
    <div className="App">
      <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />


            <Route path="/admin" element={<Admin />} />
            <Route path="/admin/addmember" element={<AddMember />} />
            <Route path="/admin/viewallmembers" element={<ViewMembers />} />
            <Route path="/admin/createscheme" element={<AddScheme/>}/>
            <Route path="/admin/viewallpayments" element={<ViewPayments />} />
            <Route path="/admin/viewallschemes" element={<ViewSchemes/>}/>
            <Route path="/admin/viewapplications" element={<ViewApplications/>}/>

            <Route path="/editprofile/:userId" element={<EditProfile/>}/>
            <Route path="/yourschemes" element={<YourSchemes/>}/>


            </Routes>
      </Router>
    </div>
  );
 }


export default App;
