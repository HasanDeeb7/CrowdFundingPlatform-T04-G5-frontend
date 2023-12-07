import React, { useState } from "react";
import Stack from "react-bootstrap/Stack";
import { Button, ButtonToolbar } from "rsuite";
import "./Filter.css";
import { flushSync } from 'react-dom';

function Filter() {
  const [activeFilter, setActiveFilter] = useState("All");

  const handleFilterClick = (filter) => {
    flushSync(() => {
      setActiveFilter(filter);
    });
    
    // Add logic to handle the filter click, e.g., fetching data based on the selected filter
  };

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
              activeFilter === "This Week" ? "active" : ""
            }`}
            onClick={() => handleFilterClick("This Week")}
          >
            This Week
          </Button>
          <Button
          key="This Month"
            appearance="default"
            className={`filterButton ${
              activeFilter === "This Month" ? "active" : ""
            }`}
            onClick={() => handleFilterClick("This Month")}
          >
            This Month
          </Button>
        </ButtonToolbar>
      </Stack>
    </div>
  );
}

export default Filter;
