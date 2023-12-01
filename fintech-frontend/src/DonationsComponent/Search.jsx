import React from 'react'
import './Search.css'
// import SearchIcon from '@rsuite/icons/legacy/Search'
import { Input } from 'rsuite';

function Search() {
  return (
    <div>
      <form>
        <Input
        placeholder="Search..." className="custom-input"
        // value={searchText}
        // onChange={(value) => setSearchText(value)}
        // onPressEnter={() => handleSearch(searchText)}
      />

      {/* <button onClick={() => handleSearch(searchText)}>Search</button> */}
      </form>
    </div>
  )
}

export default Search
