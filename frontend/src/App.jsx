import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "./pages/Login";
import BulkMailer from "./pages/BulkMailer";
import History from "./pages/History";

function App() {
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/"
          element={
            isLoggedIn ? (
              <BulkMailer />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/history"
          element={
            isLoggedIn ? (
              <History />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;