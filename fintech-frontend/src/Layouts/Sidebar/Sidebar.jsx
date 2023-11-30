import React from "react";
import { Sidenav, Nav } from "rsuite";
import DashboardIcon from "@rsuite/icons/legacy/Dashboard";
import GroupIcon from "@rsuite/icons/legacy/Group";
import "./Sidebar.css";
function Sidebar() {
  return (
    <div className="sidebar">
      <Sidenav appearance="">
        <Sidenav.Body>
          <Nav activeKey="1">
            <Nav.Item eventKey="1" className="item" icon={<DashboardIcon />}>
              Profile
            </Nav.Item>
            <Nav.Item eventKey="2" className="item" icon={<DashboardIcon />}>
              Dashboard
            </Nav.Item>
            <Nav.Item eventKey="3" className="item" icon={<GroupIcon />}>
              Campaign
            </Nav.Item>
            <Nav.Item eventKey="4" className="item" icon={<GroupIcon />}>
              Donation
            </Nav.Item>
          </Nav>
        </Sidenav.Body>
      </Sidenav>
    </div>
  );
}

export default Sidebar;
