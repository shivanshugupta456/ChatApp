import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import axios from "axios";
import { AuthProvider } from "./context/AuthProvider.jsx";
import { BrowserRouter } from "react-router-dom";
import { SocketProvider } from "./context/SocketContext.jsx";

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL || "";
axios.defaults.withCredentials = true;

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <SocketProvider>
        <App />
      </SocketProvider>
    </AuthProvider>
  </BrowserRouter>
);
