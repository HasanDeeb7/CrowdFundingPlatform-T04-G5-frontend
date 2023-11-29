import React from "react";
import Search from "../../Components/SearchComponent/Search.js";
import FilterOptions from "../../Components/FilterComponent/FilterOptions.jsx";
import './SearchFilter.css'
function SearchFilter() {
  return (
    <div className="searchFilterWrapper">
      <FilterOptions />
      <Search />
    </div>
  );
}

export default SearchFilter;
