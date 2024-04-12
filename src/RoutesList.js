import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import Company from "./Company";
import CompanyDetail from "./CompanyDetail";
import Job from "./Job";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import ProfileForm from "./ProfileForm";
import "./RoutesList.css"


/* RoutesList component

Passes in companies, jobs as props from App

Storing all of our Routes:



*/


const RoutesList = ({companies, jobs, addUser, handleLogin, handleSignup, handleEdit }) => {

    return (
        <Routes>
        <Route exact path="/" element={<Home />}>
        </Route>
        <Route path="/companies/:handle" element={<CompanyDetail />}>
        </Route>
        <Route exact path="/companies" element={<Company companies={companies}/>}>
        </Route>
        <Route path="/jobs" element={<Job jobs={jobs} />}>
        </Route>
        <Route path="/login" element={<LoginForm handleLogin={handleLogin}/>}>
        </Route>
        <Route path="/signup" element={<SignupForm addUser={addUser} handleSignup={handleSignup} />}>
        </Route>
        <Route path="/profile" element={<ProfileForm handleEdit={handleEdit} />}>
        </Route>
      </Routes>
    )
};

export default RoutesList;