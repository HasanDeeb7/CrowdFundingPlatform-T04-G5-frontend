import { Pagination, Progress, Table } from "rsuite";
import { useState } from "react";
import fakeCampaigns from "../../FakeData/fakeCampaigns";
import { getPercentage } from "../../utils/getPercentage";
import "./CampaignsTableComponents.css";
import { NavLink } from "react-router-dom";
const { Column, HeaderCell, Cell } = Table;

function ComponentsTableComponent() {
  const [sortColumn, setSortColumn] = useState();
  const [sortType, setSortType] = useState();
  const [loading, setLoading] = useState(false);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);

  const handleChangeLimit = (dataKey) => {
    setPage(1);
    setLimit(dataKey);
  };

  const getData = () => {
    if (sortColumn && sortType) {
      return fakeCampaigns.sort((a, b) => {
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
    return fakeCampaigns;
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
          View More
        </NavLink>
      </Cell>
    );
  };

  return (
    <>
      <Table
        height={420}
        data={data}
        sortColumn={sortColumn}
        sortType={sortType}
        onSortColumn={handleSortColumn}
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

        <Column width={200} fixed sortable>
          <HeaderCell>title</HeaderCell>
          <Cell dataKey="title" />
        </Column>

        <Column width={200} sortable>
          <HeaderCell>target</HeaderCell>
          <Cell dataKey="target" />
        </Column>

        <Column width={300} sortable>
          <HeaderCell>Amount Contributed</HeaderCell>
          <Cell dataKey="amountContributed">
            {(rowData) => {
              const progressData = getPercentage(
                rowData.amountContributed,
                rowData.target
              );
              const status = progressData === 100 ? "success" : "active";
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
          total={fakeCampaigns.length}
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
