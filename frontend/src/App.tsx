import { useEffect, useState } from "react";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Loading from "./pages/Loading";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Main from "./pages/Main";
import Signin from "./pages/Signin";
import AdminSignin from "./pages/AdminSignin";
import Signup from "./pages/Signup";
import Error from "./pages/Error";
import Landing from "./main/Landing";
import User from "./main/User";
import axios from "axios";


function App() {
  const [authStatus, setAuthStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const AuthStatus = async () => {
      const token=localStorage.getItem("Authorization")
      if(!token){
        setAuthStatus(null)
        setLoading(false)
        return
      }
      try {
        const response = await axios.get("http://localhost:4000/islogIn", {
          headers: {
            Authorization: token,
          },
        });
        setAuthStatus(response.data.auth);
        setLoading(false)
      } catch (error) {
        console.error("Error fetching authentication status:", error);
        setAuthStatus(null);
        setLoading(false)
      }
    };
    AuthStatus();
  }, []);

  console.log(authStatus)
  
  if (loading) {
    return <Loading/>
  }

  const router = createBrowserRouter(
    createRoutesFromElements(
      !authStatus ? (
        <Route path="/" element={<Landing />}>
          <Route path="" element={<Main />} />
          <Route path="login" element={<Signin />} />
          <Route path="admin-signin" element={<AdminSignin />} />
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
    <Toaster position="top-center" reverseOrder={false} />
    <RouterProvider router={router} />
    </>
  )
}

export default App
