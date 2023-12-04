import { useEffect, useState } from "react";
import Button from "../../Components/Button/Button";
import "./CampaignsRequests.css";
import { Pagination, Table } from "rsuite";
import fakeCampaigns from "../../FakeData/fakeCampaigns";
import { NavLink } from "react-router-dom";
function CampaignsRequests() {
  const { Column, HeaderCell, Cell } = Table;
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [sortColumn, setSortColumn] = useState();
  const [sortType, setSortType] = useState();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const totalData = fakeCampaigns.filter((item) => item.status === "pending");

  useEffect(() => {
    const filteredData = fakeCampaigns.filter(
      (item) => item.status === "pending"
    );

    let sortedData = filteredData;
    if (sortColumn && sortType) {
      sortedData = filteredData.sort((a, b) => {
        let x = a[sortColumn];
        let y = b[sortColumn];
        if (typeof x === "string") {
          x = x.charCodeAt();
        }
        if (typeof y === "string") {
          y = y.charCodeAt();
        }
        return sortType === "asc" ? x - y : y - x;
      });
    }

    const start = limit * (page - 1);
    const end = start + limit;
    setData(sortedData.slice(start, end));
  }, [page, limit, sortColumn, sortType]);

  const handleSortColumn = (sortColumn, sortType) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSortColumn(sortColumn);
      setSortType(sortType);
    }, 500);
  };

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

        >
          View More
        </NavLink>
      </Cell>
    );
  };

  return (
    <div className="">
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

        <Column width={200}>
          <HeaderCell>...</HeaderCell>
          <ViewMoreCell dataKey="id" />
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
          layout={["total", "-", "pager", "-", "limit", "|", "skip"]}
          total={totalData.length}
          limitOptions={[10, 30, 50]}
          limit={limit}
          activePage={page}
          onChangePage={setPage}
          onChangeLimit={handleChangeLimit}
          className="custom-pagination"
        />
      </div>
    </div>
  );
}

export default CampaignsRequests;
