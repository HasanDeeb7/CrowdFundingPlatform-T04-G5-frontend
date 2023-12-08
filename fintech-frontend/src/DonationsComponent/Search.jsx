import React,{useState} from 'react'
import './Search.css'
import Input from '../Components/Input/Input'
// import SearchIcon from '@rsuite/icons/legacy/Search'

function Search({searchText , setSearchText}) {

  // const [searchText,setSearchText]=useState({searchText:''})

  // const handleSearch=(e)=>{
  //   e.preventDefault()
  //   console.log(searchText)
  // }

  return (
    <div>
      <form>
        <Input
        placeholder="Search..." className="custom-input"
        value={searchText}
        setValue={setSearchText}
        label='Search...'
        control='searchText'
      />

      {/* <button onClick={handleSearch}>Search</button> */}
      </form>
    </div>
  )
}

export default Search
