import { Pagination, Progress, Table } from "rsuite";
import { useEffect, useState } from "react";
import { getPercentage } from "../../utils/getPercentage";
import "./CampaignsTableComponents.css";
import { NavLink } from "react-router-dom";
import { getCampaigns } from "../../axios/campaings";
import Loading from "../Loading/Loading";
const { Column, HeaderCell, Cell } = Table;

function ComponentsTableComponent() {
  const [sortColumn, setSortColumn] = useState();
  const [sortType, setSortType] = useState();
  const [loading, setLoading] = useState(true);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [campaigns, setCampaigns] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const handleChangeLimit = (dataKey) => {
    setPage(1);
    setLimit(dataKey);
  };
  async function fetchCampaigns() {
    const data = await getCampaigns();
    if (data) {
      setCampaigns(data.data.filter((item) => item.status === "active"));
      setIsLoading(false);
      setLoading(false);
      console.log(data);
      return;
    }
  }
  useEffect(() => {
    fetchCampaigns();
  }, []);
  const getData = () => {
    if (sortColumn && sortType) {
      return campaigns.sort((a, b) => {
        let x = a[sortColumn];
        let y = b[sortColumn];
        if (typeof x === "string") {
          x = x.charCodeAt();
        }
        if (typeof y === "string") {
          y = y.charCodeAt();
        }
        if (sortType === "asc") {
          return x - y;
        } else {
          return y - x;
        }
      });
    }
    return campaigns;
  };
  const data = getData().filter((v, i) => {
    const start = limit * (page - 1);
    const end = start + limit;
    return i >= start && i < end;
  });

  const handleSortColumn = (sortColumn, sortType) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSortColumn(sortColumn);
      setSortType(sortType);
    }, 500);
  };

  const ActionCell = ({ rowData, dataKey, onClick, ...props }) => {
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
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>

        <h1>Campaigns</h1>
        <Table
          height={420}
          data={data}
          sortColumn={sortColumn}
          sortType={sortType}
          onSortColumn={handleSortColumn}
          loading={loading}
          className="campaignsTable"
        >
          <Column width={250} align="left" color="red" fixed sortable>
            <HeaderCell color="red">Title</HeaderCell>
            <Cell dataKey="title" className="tableCell" />
          </Column>

          <Column width={200} sortable>
            <HeaderCell>Category</HeaderCell>
            <Cell dataKey="category">
              {(rowData) => {
                return rowData.Category?.name;
              }}
            </Cell>
          </Column>

          <Column width={200} sortable>
            <HeaderCell>target</HeaderCell>
            <Cell dataKey="target" />
          </Column>

          <Column width={300} sortable>
            <HeaderCell>Progress</HeaderCell>
            <Cell dataKey="amountContributed">
              {(rowData) => {
                const progressData = getPercentage(
                  rowData.amountContributed,
                  rowData.target
                );
                const status = progressData >= 100 ? "success" : "active";
                return (
                  <div>
                    <Progress
                      percent={progressData}
                      showInfo={true}
                      strokeColor="var(--light-gold-clr)"
                      status={status}
                    />
                  </div>
                );
              }}
            </Cell>
          </Column>

          <Column width={400} style={{ marginLeft: "100px" }} sortable>
            <HeaderCell>status</HeaderCell>
            <Cell dataKey="status" />
          </Column>

          <Column flexGrow={1}>
            <HeaderCell>...</HeaderCell>
            <ActionCell dataKey="id" />
          </Column>
        </Table>
        </>
      )}

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
          total={campaigns.length}
          limitOptions={[10, 30, 50]}
          limit={limit}
          activePage={page}
          onChangePage={setPage}
          onChangeLimit={handleChangeLimit}
          className="custom-pagination"
          // style={}
        />
      </div>
    </>
  );
}
export default ComponentsTableComponent;
