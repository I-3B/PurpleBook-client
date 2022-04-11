import React from "react";
import ReactDOM from "react-dom";
import { ErrorBoundary } from "react-error-boundary";
import { NotificationContainer } from "react-notifications";
import "react-notifications/lib/notifications.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Feed from "./components/Feed";
import Header from "./components/Header";
import Loading from "./components/Loading";
import Login from "./components/Login";
import Logout from "./components/Logout";
import Post from "./components/Post";
import RequireAuth from "./components/RequireAuth";
import Signup from "./components/Signup";
import { AuthProvider } from "./hooks/useAuth";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
export const BASE_URL = "http://localhost:8080/api";
ReactDOM.render(
    <Router>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
            <AuthProvider>
                <Header />
                <Routes>
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/" element={<RequireAuth />}>
                        <Route path="/" element={<Feed />}></Route>
                        <Route path="/posts/:postId" element={<Post />}></Route>
                        <Route path="/logout" element={<Logout />}></Route>
                        <Route path="/*" element={<Loading />} />
                    </Route>
                </Routes>
                <NotificationContainer />
            </AuthProvider>
        </ErrorBoundary>
    </Router>,
    document.getElementById("root")
);
function ErrorFallback(props: { error: Error }) {
    return (
        <div>
            <p>{props.error.message}</p>
            <button
                onClick={() => {
                    window.location.reload();
                }}
                style={{ color: "black" }}
            >
                Reload page
            </button>
        </div>
    );
}
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
