import React from "react";
import { Sidenav, Nav } from "rsuite";
import DashboardIcon from "@rsuite/icons/legacy/Dashboard";
import GroupIcon from "@rsuite/icons/legacy/Group";
import "./Sidebar.css";
function Sidebar() {
  const [expanded, setExpanded] = React.useState(true);
  const [activeKey, setActiveKey] = React.useState("1");
  return (
    <div>
      <Sidenav appearance="" className="sidebar" expanded={expanded}>
        <Sidenav.Body>
          <Nav activeKey={activeKey} onSelect={setActiveKey}>
            <Nav.Item
              eventKey="1"
              className="item"
              icon={
                <DashboardIcon style={{ fontSize: "25px", height: "25px" }} />
              }
            >
              Profile
            </Nav.Item>
            <Nav.Item
              eventKey="2"
              className="item"
              icon={
                <DashboardIcon style={{ fontSize: "25px", height: "25px" }} />
              }
            >
              Dashboard
            </Nav.Item>
            <Nav.Item
              eventKey="3"
              className="item"
              icon={<GroupIcon style={{ fontSize: "25px", height: "25px" }} />}
            >
              Campaign
            </Nav.Item>
            <Nav.Item
              eventKey="4"
              className="item"
              icon={<GroupIcon style={{ fontSize: "25px", height: "25px" }} />}
            >
              Donation
            </Nav.Item>
          </Nav>
        </Sidenav.Body>
        <Sidenav.Toggle
          expanded={expanded}
          onToggle={(expanded) => setExpanded(expanded)}
        />
      </Sidenav>
    </div>
  );
}

export default Sidebar;
