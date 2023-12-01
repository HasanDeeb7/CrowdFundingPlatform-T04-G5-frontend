import React from 'react'
import { Table, Button } from 'rsuite';
import fakeDonations  from '../../FakeData/fakeDonations.js'
import './Content.css'
import '../../App.css'
// import Test from '../../Components/CampaignsTableComponent/CampaignsTableComponent.jsx'

const { Column, HeaderCell, Cell } = Table;
const data = fakeDonations

function Content() {
  
  return (
    <div>
      
      <Table
      className='tableDonations'
      height={400}
      data={data}
      onRowClick={rowData => {
        console.log(rowData);
      }}
    >
      <Column width={80} align="center" fixed>
        <HeaderCell>N.O</HeaderCell>
        <Cell dataKey="id" />
      </Column>

      <Column width={200}>
        <HeaderCell>Donor Name</HeaderCell>
        <Cell dataKey="donorName" />
      </Column>

      <Column width={200}>
        <HeaderCell>Campaign Title</HeaderCell>
        <Cell dataKey="campaignTitle" />
      </Column>

      <Column width={200}>
        <HeaderCell>Transfered amount</HeaderCell>
        <Cell dataKey="transferredAmount" />
      </Column>

      <Column width={170}>
        <HeaderCell>Status</HeaderCell>
        <Cell dataKey="status" />
      </Column>

      <Column width={180}>
        <HeaderCell>Date</HeaderCell>
        <Cell dataKey="date" />
      </Column>

      <Column width={90} fixed="right">
        <HeaderCell>...</HeaderCell>
        <Cell style={{ padding: '6px' }}>
          {rowData => (
            <Button appearance="link" onClick={() => alert(`id:${rowData.id}`)} style={{ color: "var(--primary-gold-clr)" }}>
              Edit
            </Button>
          )}
        </Cell>
      </Column>
    </Table>
    </div>
  )
}

export default Content
