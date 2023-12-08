import React, { useContext, useState, useEffect } from "react";
import { Table, Pagination, Button } from "rsuite";
import UserContext from "../../useContext/userContext";
import "./Content.css";
import "../../App.css";
import fetchDonations from "../../utils/donations";
// import Test from '../../Components/CampaignsTableComponent/CampaignsTableComponent.jsx'

const { Column, HeaderCell, Cell } = Table;

function Content() {
  const { user, setUser } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);

  const [donations, setDonations] = useState([]);

  async function fetchDashboard() {
    setIsLoading(true);

    try {
      let fetchedDonations = await fetchDonations();
      setDonations(fetchedDonations.data);
      // console.log(user)
      // console.log(user.user.role);
    } catch (error) {
      // Handle errors if necessary
      console.error("Error fetching donations:", error);
    } finally {
      setIsLoading(false);
    } 
  }
  useEffect(() => {
    fetchDashboard();
  }, []);

  useEffect(() => {
  console.log(donations)
  }, [donations]);

  const [limit, setLimit] = React.useState(5);
  const [page, setPage] = React.useState(1);

  const handleChangeLimit = (dataKey) => {
    setPage(1);
    setLimit(dataKey);
  };

  const start = limit * (page - 1);
  const end = start + limit;

  const data = donations.slice(start, end);

  return (
    <div>
      <Table height={420} className="tableContainer" data={data}>
        <Column width={134} align="center" fixed>
          <HeaderCell>Id</HeaderCell>
          <Cell dataKey="id" />
        </Column>

        <Column width={220}>
          <HeaderCell>Donor Name</HeaderCell>
          <Cell />
          {/* <Cell>
            {(rowData) =>
              `${rowData.Donor.User.firstName} ${rowData.Donor.User.lastName}`
            }
          </Cell> */}
        </Column>

        <Column width={220}>
          <HeaderCell>Campaign Title</HeaderCell>
          <Cell dataKey="Campaign.title" />
        </Column>

        <Column width={220}>
          <HeaderCell>Creator Name</HeaderCell>
          <Cell dataKey="Campaign.Creator.User?" />
        </Column>

        <Column width={200}>
          <HeaderCell>Transferred Amount</HeaderCell>
          <Cell dataKey="transferredAmount" />
        </Column>

        <Column width={200}>
          <HeaderCell>Date</HeaderCell>
          <Cell>
            {(rowData) =>
              new Date(rowData.createdAt).toLocaleDateString("en-US")
            }
          </Cell>
        </Column>

        <Column width={"100%"} fixed="right">
          <HeaderCell>...</HeaderCell>
          <Cell style={{ padding: "6px" }}>
            {(rowData) => (
              <Button
                appearance="link"
                onClick={() => alert(`id:${rowData.id}`)}
                style={{ color: "var(--primary-gold-clr)" }}
              >
                Edit
              </Button>
            )}
          </Cell>
        </Column>
      </Table>
      <div style={{ padding: 20 }}>
        <Pagination
          prev
          next
          first
          last
          ellipsis
          boundaryLinks
          maxButtons={5}
          size="xs"
          layout={["total", "-", "limit", "|", "pager", "skip"]}
          total={data.length}
          limitOptions={[10, 20, 30]}
          limit={limit}
          activePage={page}
          onChangePage={setPage}
          onChangeLimit={handleChangeLimit}
        />
      </div>
    </div>
  );
}

export default Content;
