import { BrowserRouter, Navigate, Route, Router, Routes } from "react-router-dom"
import { useContext, useEffect } from "react";

import Login from "./component/userAuth/login";
import Home from "./component/home/home";
import Message from './component/message';
import LazyLoader from './component/lazyLoader';

import userContext from "./component/context/userContext";
import UsePostData from "./customHook/UsePostData";
import UseSetUserDetails from "./customHook/UseSetUserDetails";
import AddTask from "./component/AddTask/AddTask";
import ViewTask from "./component/viewTask/viewTask";
import axios from "axios";
function App() {
  const userData = useContext(userContext)

  useEffect(() => {
    const token = localStorage.getItem("tokecn")
    console.log(token)
    try {
      userData.setLazyLoader(true)
      axios.get(`${process.env.REACT_APP_BACKEND_URL}/auth/auth-me`, { headers: { authorization: localStorage.getItem("token") } })
        .then((data) => {
          console.log(data?.data?.data)
          const { _id, email, userName } = data?.data?.data
          if (_id && email && userName) {
            userData?.setUserDetails({ _id, email, userName })
            userData?.setIsLogIn(true)
          }
          userData.setLazyLoader(false)
        })
        .catch(err => {
          userData.setLazyLoader(false)
          userData.setMessage(
            "error", "LogIn/SignUp first!!!"
          )
          setTimeout(() => {
            userData.setMessage(false)
          }, 5000)
        })
    }
    catch (err) {
      userData.setLazyLoader(false)
      // throw new 
    }
  }, [])
  return (
    <>
      {userData.lazyLoader && <LazyLoader />}
      {userData.message && <Message />}
      <Routes>
        <Route path="/" element={(userData.isLogIn) ? <Home /> : <Navigate to="/login" />}></Route>
        <Route path="/Task/:_id" element={(userData.isLogIn) ? <AddTask /> : <Navigate to="/login" />}></Route>
        <Route path="/viewTask/:_id" element={(userData.isLogIn) ? <ViewTask /> : <Navigate to="/login" />}></Route>
        <Route path="/login" element={(!userData.isLogIn) ? <Login /> : <Navigate to="/" />}></Route>
      </Routes>
    </>
  );
}

export default App;
