import React from "react";
import Paginations from "../../DonationsComponent/Paginations";
import Views from "../../DonationsComponent/Views";
import Stack from "react-bootstrap/esm/Stack";
import './Footer.css'

function Footer() {
  return (
    <div>
      <Stack direction="horizontal" gap={2} className="footer">
        <Paginations />
        <Views />
      </Stack>
    </div>
  );
}

export default Footer;
