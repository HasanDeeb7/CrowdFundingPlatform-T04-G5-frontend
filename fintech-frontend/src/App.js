import "./App.css";
import { Routes, Route } from "react-router-dom";
import Profile from "./Pages/ProfilesPage/Profile.jsx";
import Dashboard from "./Pages/Dashboard/Dashboard.jsx";
import Campaigns from "./Pages/Campaigns/Campaigns.jsx";
import Login from "./Pages/Login.jsx";
import SignUp from "./Pages/SignUp.jsx";
import Donations from "./Pages/DonationsPage/Donations.jsx";
import AdminCampaignRequests from "./Pages/AdminCampaignRequests.jsx";
import Sidebar from "./Layouts/Sidebar/Sidebar.jsx";
import AdminUsers from "./Pages/AdminUsers.jsx";
import "rsuite/dist/rsuite.min.css";
import { CustomProvider } from "rsuite";
import SingleCampaign from "./Pages/SingleCampaign/SingleCampaign.jsx";

function App() {
  return (
    <CustomProvider theme="dark">
      <div className="App">
        {/* <section className="sideNavContainer">
          <Sidebar />
        </section> */}
        <main className="mainContent">
          <section className="sideNavContainer">
            <Sidebar />
          </section>
          <div className="containerRoutes">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/" element={<Dashboard />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/campaigns" element={<Campaigns />} />
              <Route path="/donations" element={<Donations />} />
              <Route path="/singlecampaign" element={<SingleCampaign />} />
              <Route
                path="/adminrequests"
                element={<AdminCampaignRequests />}
              />
              <Route path="/adminusers" element={<AdminUsers />} />
              {/* <Route path="/profile" element={<Admin />} />
        <Route path="/profile" element={<Profile />} /> */}
            </Routes>
          </div>
        </main>
      </div>
    </CustomProvider>
  );
}

export default App;
