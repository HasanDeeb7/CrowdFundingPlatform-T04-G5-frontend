import React, { forwardRef, useContext } from "react";
import { useEffect } from "react";
import { Sidenav, Nav } from "rsuite";
import DashboardIcon from "@rsuite/icons/legacy/Dashboard";
import GroupIcon from "@rsuite/icons/legacy/Group";
import ExitIcon from "@rsuite/icons/Exit";
import PublicOpinionIcon from "@rsuite/icons/PublicOpinion";
import UserInfoIcon from "@rsuite/icons/UserInfo";
import PeoplesIcon from "@rsuite/icons/Peoples";
import CheckOutlineIcon from "@rsuite/icons/CheckOutline";
import PeoplesCostomizeIcon from "@rsuite/icons/PeoplesCostomize";
import "./Sidebar.css";
import { Link } from "react-router-dom";
import UserContext from "../../useContext/userContext";
function Sidebar() {
  const [expanded, setExpanded] = React.useState(true);
  const [activeKey, setActiveKey] = React.useState("2");
  const {setUser} = useContext(UserContext)

  const NavLink = forwardRef(({ href, children, ...rest }, ref) => (
    <Link ref={ref} to={href} {...rest}>
      {children}
    </Link>
  ));
  function logOut(){
    setUser(null)
    localStorage.removeItem('userData')
  }

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 767) {
        setExpanded(false);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div>
      <Sidenav appearance="" className="sidebar" expanded={expanded}>
        <Sidenav.Body>
          <Nav activeKey={activeKey} onSelect={setActiveKey}>
            <Nav.Item
              as={NavLink}
              href="/"
              eventKey="1"
              className="item"
              icon={
                <DashboardIcon style={{ fontSize: "25px", height: "25px" }} />
              }
            >
              Dashboard
            </Nav.Item>
            <Nav.Item
              eventKey="2"
              className="item"
              as={NavLink}
              href="/Campaigns"
              icon={
                <PeoplesCostomizeIcon
                  style={{ fontSize: "25px", height: "25px" }}
                />
              }
            >
              Campaign
            </Nav.Item>
            <Nav.Item
              eventKey="3"
              className="item"
              as={NavLink}
              href="/donations"
              icon={
                <PublicOpinionIcon
                  style={{ fontSize: "25px", height: "25px" }}
                />
              }
            >
              Donation
            </Nav.Item>
            {/* {role === "admin" ? ( */}
            <>
              <Nav.Item
                eventKey="4"
                className="item"
                as={NavLink}
                href="/adminrequests"
                icon={
                  <CheckOutlineIcon
                    style={{ fontSize: "25px", height: "25px" }}
                  />
                }
              >
                All Requests
              </Nav.Item>
              <Nav.Item
                eventKey="5"
                className="item"
                as={NavLink}
                href="/adminusers"
                icon={
                  <PeoplesIcon style={{ fontSize: "25px", height: "25px" }} />
                }
              >
                All Users
              </Nav.Item>
            </>
            {/*  ) : null} */}
            <Nav.Item
              as={NavLink}
              href="/profile"
              eventKey="6"
              className="item lastItem"
              icon={
                <UserInfoIcon style={{ fontSize: "25px", height: "25px" }} />
              }
            >
              Profile
            </Nav.Item>
            <Nav.Item
              eventKey="7"
              className="item"
              as={NavLink}
              href="#"
              icon={<ExitIcon style={{ fontSize: "25px", height: "25px" }} />}
              onClick={logOut}
            >
              Log out
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
