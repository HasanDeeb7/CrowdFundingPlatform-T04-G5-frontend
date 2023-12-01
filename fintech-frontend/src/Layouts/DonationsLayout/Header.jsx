import React from "react";
import Search from "../../DonationsComponent/Search";
import Filter from "../../DonationsComponent/Filter";
import Stack from "react-bootstrap/esm/Stack";
import "./Header.css";

function Header() {
  return (
    <div>
      <Stack direction="horizontal" gap={2} className="filterSearch">
        <Filter />
        <Search />
      </Stack>
    </div>
  );
}

export default Header;
