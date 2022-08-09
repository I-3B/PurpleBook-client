import { useEffect, useRef } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { NotificationContainer } from "react-notifications";
import "react-notifications/lib/notifications.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.scss";
import ConnectPage from "./components/ConnectPage";
import EditPost from "./components/EditPost";
import EditUser from "./components/EditUser";
import Feed from "./components/Feed";
import Header, { HeaderRefI } from "./components/Header";
import Loading from "./components/Loading";
import Login from "./components/Login";
import NewPost from "./components/NewPost";
import NotificationsPage from "./components/NotificationsPage";
import PostPage from "./components/PostPage";
import ProfilePage from "./components/ProfilePage";
import RequireAuth from "./components/RequireAuth";
import Signup from "./components/Signup";
import { AuthProvider } from "./hooks/useAuth";
function App() {
    const HeaderRef = useRef<HeaderRefI>(null);
    useEffect(() => {
        console.log(HeaderRef);
    });
    return (
        <div className="App">
            <Router>
                <ErrorBoundary FallbackComponent={ErrorFallback}>
                    <AuthProvider>
                        <Header ref={HeaderRef} />
                        <Routes>
                            <Route path="/signup" element={<Signup />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/" element={<RequireAuth />}>
                                {/* header links */}
                                <Route path="/" element={<Feed />} />
                                <Route
                                    path="/notifications"
                                    element={<NotificationsPage HeaderRef={HeaderRef} />}
                                />
                                <Route
                                    path="/connect"
                                    element={<ConnectPage HeaderRef={HeaderRef} />}
                                />
                                {/* posts */}
                                <Route path="/new-post" element={<NewPost />} />
                                <Route path="/posts/:postId" element={<PostPage />} />
                                <Route path="/posts/:postId/edit" element={<EditPost />} />
                                <Route path="/posts/:postId/comments" element={<PostPage />} />
                                <Route
                                    path="/posts/:postId/comments/:commentId"
                                    element={<PostPage />}
                                />
                                <Route
                                    path="/posts/:postId/comments/:commentId/edit"
                                    element={<PostPage />}
                                />
                                {/* users */}
                                <Route
                                    path="/users/:userId/"
                                    element={<ProfilePage show="posts" />}
                                />
                                <Route
                                    path="/users/:userId/edit"
                                    element={<EditUser HeaderRef={HeaderRef} />}
                                />
                                <Route
                                    path="/users/:userId/comments"
                                    element={<ProfilePage show="comments" />}
                                />
                                <Route
                                    path="/users/:userId/friends"
                                    element={<ProfilePage show="friends" />}
                                />
                                <Route path="/*" element={<Loading />} />
                            </Route>
                        </Routes>
                        <NotificationContainer />
                    </AuthProvider>
                </ErrorBoundary>
            </Router>
        </div>
    );
}
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
export default App;
