import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage/main";
import RegisterPage from "./pages/RegisterPage/main";
import FeedPage from "./pages/FeedPage/main";
import ProfilePage from "./pages/ProfilePage/main";
import SearchPage from "./pages/SearchPage/main";
import UserProfilePage from "./pages/UserProfilePage/main";
import CreatePostPage from "./pages/CreatePostPage/main";
import PostPage from "./pages/PostPage/main";
import PrivateRoute from "./components/PrivateRoute";
import Layout from "./components/Layout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/feed" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/feed"
          element={
            <PrivateRoute>
              <Layout><FeedPage /></Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Layout><ProfilePage /></Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/search"
          element={
            <PrivateRoute>
              <Layout><SearchPage /></Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/users/:id"
          element={
            <PrivateRoute>
              <Layout><UserProfilePage /></Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/posts/create"
          element={
            <PrivateRoute>
              <Layout><CreatePostPage /></Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/posts/:id"
          element={
            <PrivateRoute>
              <Layout><PostPage /></Layout>
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
