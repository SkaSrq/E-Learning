import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import AuthGuard from "./components/AuthGuard";
import Login from "./pages/auth/Login";
import Navbar from "./components/Navbar";
import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { removeUser, saveUser } from "./reduxSlices/user";
import { InfinitySpin } from "react-loader-spinner";
import Course from "./pages/Course";
function App() {
  const username = useSelector((state) => state.user.name);
  const loading = useSelector((state) => state.loading.status);
  const dispatch = useDispatch();
  useEffect(() => {
    const getUser = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/auth/login/success`,
        {
          withCredentials: true,
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": true
          }
        }
      );

      if (response.status !== 200) {
        dispatch(removeUser());
        throw new Error("authentication failed");
      }
      const userObj = {
        id: response.data.user.id,
        name: response.data.user.displayName,
        email: response.data.user.emails[0].value,
        token: undefined,
        profilePicture: response.data.user.photos[0].value
      };
      dispatch(saveUser(userObj));
    };
    getUser();
  }, []);
  return (
    <BrowserRouter>
      <Navbar user={username} />
      {loading ? (
        <>
          <InfinitySpin width="200" color="#4285F4" />
        </>
      ) : (
        <Routes>
          <Route
            path="/"
            element={
              <AuthGuard>
                <Home />
              </AuthGuard>
            }
          />
          <Route
            path="/courses/:courseId"
            element={
              <AuthGuard>
                <Course />
              </AuthGuard>
            }
          />
          <Route
            path="/login"
            element={username ? <Navigate to="/" /> : <Login />}
          />
        </Routes>
      )}
    </BrowserRouter>
  );
}

export default App;
