import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider, createGlobalStyle } from "styled-components";
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
import { PostProvider } from "./contexts/PostContext";
import { ThemeContextProvider, useThemeToggle } from "./contexts/ThemeContext";
import { darkTheme, lightTheme } from "./styles/theme";

const GlobalStyle = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.bg};
    color: ${({ theme }) => theme.text};
    transition: background 0.2s, color 0.2s;
  }
`;

const ThemedApp = () => {
  const { isDark } = useThemeToggle();
  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/feed" />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/feed" element={<PrivateRoute><Layout><FeedPage /></Layout></PrivateRoute>} />
          <Route path="/profile" element={<PrivateRoute><Layout><ProfilePage /></Layout></PrivateRoute>} />
          <Route path="/search" element={<PrivateRoute><Layout><SearchPage /></Layout></PrivateRoute>} />
          <Route path="/users/:id" element={<PrivateRoute><Layout><UserProfilePage /></Layout></PrivateRoute>} />
          <Route path="/posts/create" element={<PrivateRoute><Layout><CreatePostPage /></Layout></PrivateRoute>} />
          <Route path="/posts/:id" element={<PrivateRoute><Layout><PostPage /></Layout></PrivateRoute>} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

function App() {
  return (
    <PostProvider>
      <ThemeContextProvider>
        <ThemedApp />
      </ThemeContextProvider>
    </PostProvider>
  );
}

export default App;
