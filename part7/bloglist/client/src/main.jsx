import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import { NotificationProvider } from "./contexts/NotificationContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Router>
    <NotificationProvider>
      <App />
    </NotificationProvider>
  </Router>,
);
