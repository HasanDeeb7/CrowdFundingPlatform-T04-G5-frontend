import "./App.css";
import { Routes, Route } from "react-router-dom";
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

function App() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  axios.defaults.withCredentials = true;
  async function fetchUser() {
    try {
      if (!user) {
        const userData = await axios.get(
          `${process.env.REACT_APP_BACKEND_ENDPOINT}auth`
        );
        if (userData) {
          // console.log(userData.data);
        } else {
          console.log("no data");
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
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
      console.log(error);
      setIsLoading(false);
    }
  }
  useEffect(() => {
    // fetchUser();
    getUserData();
  }, []);

  return (
    <CustomProvider theme="dark">
      <UserContext.Provider value={{ user, setUser }}>
        {!isLoading ? (
          <div className="App">
            <main className="mainContent">
              <section className="sideNavContainer">
                <ProtectedRoute isAllowed={user}>
                  <Sidebar />
                </ProtectedRoute>
              </section>
              <div className="containerRoutes">
                <Routes>
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
                        redirectPath="/"
                      />
                    }
                  >
                    <Route
                      path="/adminrequests"
                      element={<CampaignsRequests />}
                    />

                    <Route path="/adminusers" element={<AllUsersPage />} />
                  </Route>
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
