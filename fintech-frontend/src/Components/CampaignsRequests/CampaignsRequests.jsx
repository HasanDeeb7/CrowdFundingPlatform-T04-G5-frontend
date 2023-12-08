import { useEffect, useState } from "react";
import Button from "../../Components/Button/Button";
import "./CampaignsRequests.css";
import { Pagination, Table } from "rsuite";
import { NavLink } from "react-router-dom";
import { getCampaigns } from "../../axios/campaings";
import Loading from "../Loading/Loading";

function CampaignsRequests() {
  const { Column, HeaderCell, Cell } = Table;
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [sortColumn, setSortColumn] = useState();
  const [sortType, setSortType] = useState();
  const [loading, setLoading] = useState(true);
  const [campaigns, setCampaigns] = useState();

  let filteredData;
  async function fetchCampaigns() {
    try {
      const response = await getCampaigns();
      if (response) {
        setCampaigns(response.data);
        setLoading(false);
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchCampaigns();
  });

  const handleChangeLimit = (dataKey) => {
    setPage(1);
    setLimit(dataKey);
  };

  const ActionCell = ({ rowData, dataKey, onClick, ...props }) => {
    return (
      <Cell {...props} style={{ padding: "6px" }}>
        <div>
          <Button action="Approve" />
          <Button action="Deny" btnType="secondary" />
        </div>
      </Cell>
    );
  };
  const ViewMoreCell = ({ rowData, dataKey, onClick, ...props }) => {
    return (
      <Cell {...props} style={{ padding: "6px" }}>
        <NavLink
          to={"/singlecampaign"}
          style={{ color: "var(--light-gold-clr" }}
          state={rowData}
          onClick={() => console.log(rowData)}
        >
          View Details
        </NavLink>
      </Cell>
    );
  };

  return (
    <div>
      {!loading ? (
        <>
          <Table
            height={420}
            data={campaigns.filter((item) => item.status === "pending")}
            sortColumn={sortColumn}
            sortType={sortType}
            loading={loading}
            className="campaignsTable"
            rowHeight={() => 60}
          >
            <Column align="center" color="red" fixed sortable>
              <HeaderCell color="red">Id</HeaderCell>
              <Cell
                dataKey="id"
                color="red"
                onClick={(rowData) => console.log(rowData)}
                className="tableCell"
              />
            </Column>

            <Column width={300} fixed sortable>
              <HeaderCell>title</HeaderCell>
              <Cell dataKey="title" />
            </Column>

            <Column width={300} sortable>
              <HeaderCell>target</HeaderCell>
              <Cell dataKey="target" />
            </Column>

            <Column width={300}>
              <HeaderCell>...</HeaderCell>
              <ViewMoreCell dataKey="id" />
            </Column>

            <Column width={800}>
              <HeaderCell>...</HeaderCell>
              <ActionCell dataKey="id" />
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
              layout={["total", "-", "pager", "-", "limit", "|", "skip"]}
              limitOptions={[10, 30, 50]}
              limit={limit}
              activePage={page}
              onChangePage={setPage}
              onChangeLimit={handleChangeLimit}
              className="custom-pagination"
            />
          </div>
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
}

export default CampaignsRequests;
