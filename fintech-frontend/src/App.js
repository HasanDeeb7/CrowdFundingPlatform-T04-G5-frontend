import "./App.css";
import { Routes, Route } from "react-router-dom";
import Profile from "./Pages/ProfilesPage/Profile.jsx";
import Dashboard from "./Pages/Dashboard/Dashboard.jsx";
import Campaigns from "./Pages/Campaigns/Campaigns.jsx";
import Login from "./Pages/LoginPage/Login.jsx";
import SignUp from "./Pages/SignUp.jsx";
import Donations from "./Pages/DonationsPage/Donations.jsx";
import Sidebar from "./Layouts/Sidebar/Sidebar.jsx";
import AdminUsers from "./Pages/AdminUsers.jsx";
import "rsuite/dist/rsuite.min.css";
import { CustomProvider } from "rsuite";
import SingleCampaign from "./Pages/SingleCampaign/SingleCampaign.jsx";
import ProtectedRoute from "./Components/Routes/ProtectedRoute.jsx";
import CampaignsRequests from "./Pages/CampaignsRequests/CampaignsRequestsPage.jsx";
import axios from "axios";
import UserContext from "./useContext/userContext.js";
import { useEffect, useState } from "react";

function App() {
  const [user, setUser] = useState(null);
  axios.defaults.withCredentials = true;
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (userData) {
      setUser(userData);
    }
    console.log(user)
  }, []);
  return (
    <CustomProvider theme="dark">
      <UserContext.Provider value={{ user, setUser }}>
        <div className="App">
          <main className="mainContent">
            <section className="sideNavContainer">
              <Sidebar />
            </section>
            <div className="containerRoutes">
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route element={<ProtectedRoute isAllowed={user} />}>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/campaigns" element={<Campaigns />} />
                  <Route path="/donations" element={<Donations />} />
                  <Route path="/singlecampaign" element={<SingleCampaign />} />
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
                  <Route path="/adminusers" element={<AdminUsers />} />
                </Route>
              </Routes>
            </div>
          </main>
        </div>
      </UserContext.Provider>
    </CustomProvider>
  );
}

export default App;
