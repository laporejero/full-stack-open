import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import { NotificationProvider } from "./contexts/NotificationContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query" 
import { UserProvider } from "./contexts/UserContext";

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <Router>
      <NotificationProvider>
        <UserProvider>
          <App />
        </UserProvider>
      </NotificationProvider>
    </Router>
  </QueryClientProvider>,
);
