import React, { useState } from "react";
import Stack from "react-bootstrap/Stack";
import { Button, ButtonToolbar } from "rsuite";
import "./Filter.css";
import { flushSync } from 'react-dom';
import { useFilterContext } from "../useContext/filterContext";

function Filter({activeFilter,setActiveFilter}) {
  // const [activeFilter, setActiveFilter] = useState("All");
  // const {handleFilterClick} = useFilterContext()

  const handleFilterClick = (filter) => {
    flushSync(() => {
      setActiveFilter(filter);
    })};
  

  return (
    <div>

      <Stack direction="horizontal" gap={5} className="stackContainer">
        <ButtonToolbar className="buttonContainer">
          <Button
          key="All"
            appearance="default"
            className={`filterButton ${activeFilter === "All" ? "active" : ""}`}
            onClick={() => handleFilterClick("All")}
          >
            All
          </Button>
          <Button
          key="Today"
            appearance="default"
            className={`filterButton ${
              activeFilter === "Today" ? "active" : ""
            }`}
            onClick={() => handleFilterClick("Today")}
          >
            Today
          </Button>
          <Button
          key="This Week"
            appearance="default"
            className={`filterButton ${
              activeFilter === "Week" ? "active" : ""
            }`}
            onClick={() => handleFilterClick("Week")}
          >
            Week
          </Button>
          <Button
          key="This Month"
            appearance="default"
            className={`filterButton ${
              activeFilter === "Month" ? "active" : ""
            }`}
            onClick={() => handleFilterClick("Month")}
          >
            Month
          </Button>
        </ButtonToolbar>
      </Stack>
    </div>
  );
}

export default Filter;
