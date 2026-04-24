import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createGlobalStyle } from "styled-components";
import { AuthProvider } from "./contexts/AuthContext";
import App from "./App";

const GlobalReset = createGlobalStyle`
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'DM Sans', sans-serif; -webkit-font-smoothing: antialiased; }
`;

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GlobalReset />
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>
);
