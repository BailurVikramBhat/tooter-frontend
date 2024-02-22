import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Register from "./components/Register";
import { LoginProvider } from "./context/LoginContext";

const App = () => {
  return (
    <LoginProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<Register />}
          />
          <Route
            path="/home"
            element={<Home />}
          />
          <Route
            path="/register"
            element={<Register />}
          />
        </Routes>
      </BrowserRouter>
    </LoginProvider>
  );
};

export default App;
