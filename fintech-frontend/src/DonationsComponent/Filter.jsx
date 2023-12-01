import React from 'react'
import Stack from "react-bootstrap/Stack";
import { Button, ButtonToolbar } from "rsuite";
import "./Filter.css";

function Filter() {
  return (
    <div>
      <Stack direction="horizontal" gap={5} className="stackContainer">
        <ButtonToolbar className='buttonContainer'>
          <Button appearance="default" className="filterButton">
            All
          </Button>
          <Button appearance="default" className="filterButton">Today</Button>
          <Button appearance="default" className="filterButton">This Week</Button>
          <Button appearance="default" className="filterButton">This Month</Button>
        </ButtonToolbar>
      </Stack>
    </div>
  )
}

export default Filter
