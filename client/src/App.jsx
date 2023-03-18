import "./App.css";
import { Routes, Route } from "react-router-dom";
import Auth from "./pages/Auth/Auth";
import Password from "./components/Password/Password";
import Admin from "./pages/Admin/Admin";
import Home from "./pages/Home/Home";
import RegistrationList from "./components/RegistrationList/RegistrationList";
import MapClient from "./components/MapClient/MapClient";
import NoAuthorization from "./pages/NoAuthorization/NoAuthorization";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";
import Redirect from "./components/Redirect/Redirect";
import Error404 from "./components/404/Error404";

function App() {
  return (
    <ErrorBoundary fallback="Error">
        <Redirect>
          <div className="App">
            <Routes>
              <Route path="/" element={<Auth />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/home">
                <Route path="/home" element={<Home />} />
                <Route
                  path="/home/no-authorization"
                  element={<NoAuthorization />}
                />
              </Route>
              <Route path="/register/:userId" element={<Password />} />
              <Route path="/admin">
                <Route path="/admin" element={<Admin />} />
                <Route
                  path="/admin/registration-list"
                  element={<RegistrationList />}
                />
                <Route path="/admin/map/:id" element={<MapClient />} />
              </Route>
              <Route path="/404" element={<Error404 />}/>
            </Routes>
          </div>
        </Redirect>
    </ErrorBoundary>
  );
}

export default App;
