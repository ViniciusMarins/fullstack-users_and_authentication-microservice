import { useContext } from "react";
import Provider from "./context/Provider";
import Login from "./pages/Login/Login";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Register from "./pages/Register/Register";
import Home from "./pages/Home/Home";
import Profile from "./pages/Profile/Profile";
import Application from "./components/Application/Application";
import { ToastContainer } from "react-toastify";
import AppContext from "./context/AppContext";
import Management from "./pages/Management/Management";

function App() {
  const { isUserLogged } = useContext(AppContext);

  return (
    <Provider>
      <Router>
        <ToastContainer />
        <Routes>
          <Route
            path="/"
            element={<Navigate to={isUserLogged ? "/home" : "/login"} />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Application children={<Home />} />} />
          <Route
            path="/management"
            element={<Application children={<Management />} />}
          />
          <Route
            path="/profile"
            element={<Application children={<Profile />} />}
          />
          <Route path="*" element={<h1>404 Page not Found</h1>} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
