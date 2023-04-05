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
import Loader from "./components/Loader/Loader";
import { Suspense, useEffect, useState } from "react";
import Toast from "./components/Toast/Toast";
import { API } from "./api/AxiosInstance";

function App() {
  const [checkConnection, setCheckConnection] = useState(false)
  useEffect(() => {
    const controller = new AbortController()
    const signal = {signal: controller.signal}
    setInterval(async () => {
      try {
         const res = await API.post("/", signal)
          setCheckConnection(res.data.status === "success")
      } catch (err) {
          setCheckConnection(false)
      }
    }, [5000])
  },[]);

  useEffect(() => {
    if (!checkConnection) {
      alert("Connection lost")
    }
  }, [checkConnection])
  return (
    <ErrorBoundary fallback="Error">
      <Redirect>
        <Loader>
          <Suspense fallback={"Loading....."}>
            <Toast>
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
                  <Route path="/404" element={<Error404 />} />
                </Routes>
              </div>
            </Toast>
          </Suspense>
        </Loader>
      </Redirect>
    </ErrorBoundary>
  );
}

export default App;
