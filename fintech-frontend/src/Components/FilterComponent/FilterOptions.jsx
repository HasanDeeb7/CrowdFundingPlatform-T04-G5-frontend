import Stack from "react-bootstrap/Stack";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, ButtonToolbar } from "rsuite";
// import "rsuite/dist/rsuite.css";

import "./FilterOptions.css";
function FilterOptions() {
  return (
    <div>
      <Stack direction="horizontal" gap={5} className="stackContainer">
        <ButtonToolbar>
          <Button appearance="default" className="filterButton">
            All
          </Button>
          <Button appearance="default" className="filterButton">
            Active
          </Button>
          <Button appearance="default" className="filterButton">
            Completed
          </Button>
          <Button appearance="default" className="filterButton">
            Expired
          </Button>
        </ButtonToolbar>
      </Stack>
    </div>
  );
}

export default FilterOptions;
