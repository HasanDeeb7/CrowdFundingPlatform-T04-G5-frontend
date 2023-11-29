import { Progress, Table } from "rsuite";
import { useState } from "react";
import fakeCampaigns from "../../FakeData/fakeCampaigns";
import { getPercentage } from "../../utils/getPercentage";
const { Column, HeaderCell, Cell } = Table;
const data = fakeCampaigns;

function ComponentsTableComponent() {
  const [sortColumn, setSortColumn] = useState();
  const [sortType, setSortType] = useState();
  const [loading, setLoading] = useState(false);

  const getData = () => {
    if (sortColumn && sortType) {
      return data.sort((a, b) => {
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
    return data;
  };

  const handleSortColumn = (sortColumn, sortType) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSortColumn(sortColumn);
      setSortType(sortType);
    }, 500);
  };

  return (
    <>
      <Table
        height={420}
        data={getData()}
        sortColumn={sortColumn}
        sortType={sortType}
        onSortColumn={handleSortColumn}
        loading={loading}
        className="campaignsTable"
      >
        <Column align="center" color="red" fixed sortable>
          <HeaderCell color="red">Id</HeaderCell>
          <Cell dataKey="id" color="red" />
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

        <Column width={"100%"} style={{ marginLeft: "100px" }} sortable>
          <HeaderCell>status</HeaderCell>
          <Cell dataKey="status" />
        </Column>
      </Table>
    </>
  );
}
export default ComponentsTableComponent;
