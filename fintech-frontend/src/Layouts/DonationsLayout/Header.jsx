import React from "react";
import Search from "../../DonationsComponent/Search";
import Filter from "../../DonationsComponent/Filter";
import Stack from "react-bootstrap/esm/Stack";
import "./Header.css";

function Header({activeFilter , setActiveFilter , searchText , setSearchText}) {
  return (
    <div>
      <Stack direction="horizontal" gap={2} className="filterSearch">
        <Filter activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
        <Search searchText={searchText} setSearchText={setSearchText}/>
      </Stack>
    </div>
  );
}

export default Header;
