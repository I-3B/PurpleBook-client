import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/authentication/Login";
import Logout from "./components/authentication/Logout";
import Signup from "./components/authentication/Signup";
import Header from "./components/Header";
import Loading from "./components/utils/Loading";
import RequireAuth from "./components/utils/RequireAuth";
import { AuthProvider } from "./hooks/useAuth";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
export const BASE_URL = "http://localhost:8080/api";
ReactDOM.render(
    <Router>
        <AuthProvider>
            <Header />
            <Routes>
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<RequireAuth />}>
                    <Route path="/*" element={<Loading />} />
                    <Route path="/logout" element={<Logout />}></Route>

                    {/* <Route path="/*" element={<ErrorMessage message="404 Page not found" />}></Route> */}
                </Route>
            </Routes>
        </AuthProvider>
    </Router>,
    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
