import React from "react";
import "./Search.css";
import Input from "../Components/Input/Input";

function Search({ searchText, setSearchText }) {
  return (
    <div>
      <form>
        <Input
          placeholder="Search..."
          className="custom-input"
          value={searchText}
          setValue={setSearchText}
          label="Search..."
          control="searchText"
        />
      </form>
    </div>
  );
}

export default Search;
