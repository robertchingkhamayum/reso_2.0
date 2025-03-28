import React, { useEffect, useState } from "react";
import "./index.css";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Landing from "./main/Landing.jsx";
import Signup from "./pages/Signup.jsx";
import Login from "./pages/Login.jsx";
import Error from "./pages/Error.jsx";
import Profile from "./pages/Profile.jsx";
import Main from "./pages/Main.jsx";
import Register from "./pages/Register.jsx";
import { auth } from "./backend/config/firebase.jsx";
import User from "./main/User.jsx";
import { Toaster } from 'react-hot-toast';
import Loading from "./pages/Loading.jsx";

const App = () => {
  const [authStatus, setAuthStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setAuthStatus(currentUser);
      console.log(currentUser)
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);
  if (loading) {
    return <Loading/>
  }

  const router = createBrowserRouter(
    createRoutesFromElements(
      !authStatus ? (

        <Route path="/" element={<Landing />}>
          <Route path="" element={<Main />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="*" element={<Error />} />
        </Route>
      ) : (
        <>
          <Route path="/" element={<User />}>
            <Route path="" element={<Main />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<Error />} />
          </Route>
        </>
      )
    )
  );

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} /> {/* Toast notifications */}
      <RouterProvider router={router} />
    </>
  )
};

export default App;
