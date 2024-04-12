import './App.css';
import React, {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import RoutesList from "./RoutesList";
import NavBar from "./NavBar";
import JoblyApi from "./api";
import HandleContext from "./HandleContext";
import { jwtDecode } from "jwt-decode";
import useLocalStorage from './useLocalStorage';


function App() {

  const [isLoading, setIsLoading] = useState(true);
  const [companies, setCompanies ] = useState([]);
  const [currUser, setCurrUser] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [token, setToken] = useLocalStorage(null)
  const navigate = useNavigate();

  // Fetching data from JoblyApi,
  //**  Updates companies and jobs state
  useEffect(() => {
    async function fetchData() {
      let companies = await JoblyApi.getCompanies();
      setCompanies(companies);
      let jobs = await JoblyApi.getJobs();
      setJobs(jobs);
      setIsLoading(false);
    }
    fetchData();
  }, []);



  useEffect(() => {
    async function getCurrentUser() {
      if(token) {
        try {
          const decodedToken = jwtDecode(token);
          const username = decodedToken.username;
          let currentUser = await JoblyApi.getUser(username);
          setCurrUser(currentUser);
          JoblyApi.token = token;
        } catch(err) {
          console.error(err)
        }
      }
    }
    getCurrentUser();
  },[token])


  const handleLogin = async(formData) => {
    await JoblyApi.login(formData.username, formData.password, {isAuthenticated:true});
    setCurrUser(formData);
    setToken(token);
  };


  const handleSignup = async(formData) => {
    try{ 
      await JoblyApi.signup(
        formData.username,
        formData.password,
        formData.firstName,
        formData.lastName,
        formData.email,
    );
    setCurrUser(formData);
    setToken(token);
    } catch(err) {
      console.error(err)
    }
  };

  const handleEdit = async(formData) => {

    const data = {
      password: formData.password,
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email
    };
    const token = localStorage.getItem('token');
    let username = localStorage.getItem('username');
    await JoblyApi.editProfile(username, data, token);
  };

  const logout = async () => {
    setCurrUser(null);
    localStorage.clear();
    navigate("/", {replace:true})

    if (isLoading) {
      return <p>Loading &hellip;</p>;
    }; 
  };

  return (
    <HandleContext.Provider value={currUser}>
    <div className="App">
    <NavBar logout={logout} currUser={currUser} />
    <RoutesList companies={companies} jobs={jobs} handleLogin={handleLogin} handleSignup={handleSignup} handleEdit={handleEdit} />
    </div>
    </HandleContext.Provider>
  );
}

export default App;
