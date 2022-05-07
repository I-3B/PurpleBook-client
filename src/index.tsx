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
import NewPost from "./components/NewPost";
import PostPage from "./components/PostPage";
import Profile from "./components/Profile";
import RequireAuth from "./components/RequireAuth";
import Signup from "./components/Signup";
import { AuthProvider } from "./hooks/useAuth";
import "./index.scss";
import reportWebVitals from "./reportWebVitals";
export const API_BASE_URL = "http://localhost:8080/api";
export const HOST = "http://localhost:3000";

ReactDOM.render(
    <Router>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
            <AuthProvider>
                <Header />
                <Routes>
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/" element={<RequireAuth />}>
                        <Route path="/" element={<Feed />} />
                        <Route path="/new-post" element={<NewPost />} />
                        <Route path="/posts/:postId" element={<PostPage />} />
                        <Route
                            path="/posts/:postId/comments"
                            element={<PostPage goToComment={true} />}
                        />
                        <Route
                            path="/posts/:postId/comments/:commentId"
                            element={<PostPage goToComment={true} />}
                        />
                        <Route path="/users/:userId" element={<Profile />} />
                        <Route path="/logout" element={<Logout />} />
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
