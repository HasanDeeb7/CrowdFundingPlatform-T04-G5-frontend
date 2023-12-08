import { useEffect, useState } from "react";
import Button from "../../Components/Button/Button";
import "./CampaignsRequests.css";
import { Pagination, Table } from "rsuite";
import { NavLink } from "react-router-dom";
import {
  approveCampaign,
  deleteCampaign,
  getCampaigns,
} from "../../axios/campaings";
import Loading from "../Loading/Loading";
import { toast } from "react-toastify";

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
  async function handleDelete(data) {
    try {
      const response = await deleteCampaign(data.id);
      if (response) {
        toast.success("Campaign Deleted");
      }
    } catch (error) {
      console.log(error);
    }
  }
  async function handleApprove(campaignId) {
    try {
      const response = await approveCampaign(campaignId);
      if (response) {
        console.log(response);
        return toast.success("Campaign is now active");
      }
    } catch (error) {
      toast.error("Error Approving campaign");
      console.log(error);
    }
  }

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const handleChangeLimit = (dataKey) => {
    setPage(1);
    setLimit(dataKey);
  };

  const ActionCell = ({ rowData, dataKey, onClick, ...props }) => {
    return (
      <Cell {...props} style={{ padding: "6px" }}>
        <div style={{ display: "flex", gap: " 10px" }}>
          <Button action="Approve" onClick={() => handleApprove(rowData.id)} />
          <Button
            action="Deny"
            btnType="danger"
            onClick={() => handleDelete(rowData)}
          />
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
    <div className="requestsContainer">
      {!loading ? (
        <>
        <h1 style={{ marginBottom: 10 }}>All Requests</h1>
          <Table
            height={420}
            data={campaigns.filter((item) => item.status === "pending")}
            sortColumn={sortColumn}
            sortType={sortType}
            loading={loading}
            className="campaignsTable"
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

            <Column width={400}>
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
