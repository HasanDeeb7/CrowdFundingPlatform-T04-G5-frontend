import logo from "./logo.svg";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Profile from "./Pages/Profile";
import Dashboard from "./Pages/Dashboard";
import Campaigns from "./Pages/Campaigns";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import Donations from "./Pages/Donations";
import SingleCampaign from "./Pages/SingleCampaign";
import AdminCampaignRequests from "./Pages/AdminCampaignRequests";

function App() {
  return (
    <div className="App">
      <SideBar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/campaigns" element={<Campaigns />} />
        <Route path="/donations" element={<Donations />} />
        <Route path="/singlecampaign" element={<SingleCampaign />} />
        <Route path="/adminrequests" element={<AdminCampaignRequests />} />
        <Route path="/adminusers" element={<AdminUsers />} />
        {/* <Route path="/profile" element={<Admin />} />
        <Route path="/profile" element={<Profile />} /> */}
      </Routes>
    </div>
  );
}

export default App;
