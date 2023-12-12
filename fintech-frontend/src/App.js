import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import Profile from "./Pages/ProfilesPage/Profile.jsx";
import Dashboard from "./Pages/Dashboard/Dashboard.jsx";
import Campaigns from "./Pages/Campaigns/Campaigns.jsx";
import Login from "./Pages/LoginPage/Login.jsx";
import Donations from "./Pages/DonationsPage/Donations.jsx";
import Sidebar from "./Layouts/Sidebar/Sidebar.jsx";
import "rsuite/dist/rsuite.min.css";
import { CustomProvider } from "rsuite";
import { Hearts } from "react-loader-spinner";
import SingleCampaign from "./Pages/SingleCampaign/SingleCampaign.jsx";
import ProtectedRoute from "./Components/Routes/ProtectedRoute.jsx";
import CampaignsRequests from "./Pages/CampaignsRequests/CampaignsRequestsPage.jsx";
import axios from "axios";
import AllUsersPage from "./Pages/AllUsers/AllUsersPage.jsx";
import UserContext from "./useContext/userContext.js";
import { useEffect, useState } from "react";
import Loading from "./Components/Loading/Loading.jsx";
import NotFound from "./Pages/404/NotFound.jsx";
import Forbidden from "./Pages/403/Forbidden.jsx";
import NetworkError from "./Pages/NetworkError/NetworkError.jsx";
import { io } from "socket.io-client";
import { toast } from "react-toastify";
const socket = io.connect("http://localhost:3001");

function App() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  async function getUserData() {
    try {
      const data = await axios.get(
        `${process.env.REACT_APP_BACKEND_ENDPOINT}users/readOne`
      );
      if (data) {
        console.log(data.data);
        setUser(data.data.user);
        setIsLoading(false);
      }
    } catch (error) {
      if (error.message === "Network Error") {
        console.log("network error");
        setError(true);
        setIsLoading(false);
        return navigate("/network_error", { replace: true });
      }
      // console.log(error);
      setIsLoading(false);
    }
  }
  useEffect(() => {
    console.log("App Effect");
    getUserData();
    socket.on("notify", (data) => {
      if (data.recipientId === user.id) {
        console.log(data)
        toast.info(data.message, { autoClose: 3000 });
      }
    });
    return () => {
      socket.off("notify");
    };
  }, [socket]);

  return (
    <CustomProvider theme="dark">
      <UserContext.Provider value={{ user, setUser, socket }}>
        {!isLoading ? (
          <div className="App">
            <main className="mainContent">
              <section className="sideNavContainer">
                <ProtectedRoute isError={error} isAllowed={user}>
                  <Sidebar />
                </ProtectedRoute>
              </section>
              <div className="containerRoutes">
                <span className="balanceWrapper">
                  {user?.role === "donor" ? (
                    <div>
                      Balance: <span> {user.Donor.balance}$ </span>
                    </div>
                  ) : (
                    ""
                  )}
                </span>
                <Routes>
                  <Route path="/network_error" element={<NetworkError />} />
                  <Route path="/login" element={<Login />} />
                  <Route element={<ProtectedRoute isAllowed={user} />}>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/campaigns" element={<Campaigns />} />
                    <Route path="/donations" element={<Donations />} />
                    <Route
                      path="/singlecampaign"
                      element={<SingleCampaign />}
                    />
                  </Route>
                  <Route
                    element={
                      <ProtectedRoute
                        isAllowed={user && user.role === "admin"}
                        redirectPath="/403"
                      />
                    }
                  >
                    <Route
                      path="/adminrequests"
                      element={<CampaignsRequests />}
                    />

                    <Route path="/adminusers" element={<AllUsersPage />} />
                  </Route>
                  <Route path="/*" element={<NotFound />} />
                  <Route path="/403" element={<Forbidden />} />
                </Routes>
              </div>
            </main>
          </div>
        ) : (
          <Loading />
        )}
      </UserContext.Provider>
    </CustomProvider>
  );
}

export default App;
