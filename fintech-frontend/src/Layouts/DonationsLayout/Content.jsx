import React ,{useContext} from "react";
import { Table, Pagination , Button} from "rsuite";
import UserContext from "../../useContext/userContext";
import "./Content.css";
import "../../App.css";
// import Test from '../../Components/CampaignsTableComponent/CampaignsTableComponent.jsx'

const { Column, HeaderCell, Cell } = Table;

function Content() {
  // const userContext = userContext();

  const { user, setUser } = useContext(UserContext);

  // console.log(user.data)

  const [limit, setLimit] = React.useState(5);
  const [page, setPage] = React.useState(1);

  const handleChangeLimit = (dataKey) => {
    setPage(1);
    setLimit(dataKey);
  };

  const start = limit * (page - 1);
  const end = start + limit;

  // const data = dataContext.slice(start, end);

  return (
    <div>
      <Table height={420}  className="tableContainer">
        <Column width={134} align="center" fixed>
          <HeaderCell>Id</HeaderCell>
          <Cell dataKey="id" />
        </Column>

        <Column width={220}>
          <HeaderCell>Donor Name</HeaderCell>
          <Cell dataKey="donorName" />
        </Column>

        <Column width={220}>
          <HeaderCell>Campaign Title</HeaderCell>
          <Cell dataKey="campaignTitle" />
        </Column>

        <Column width={200}>
          <HeaderCell>Transferred Amount</HeaderCell>
          <Cell dataKey="transferredAmount" />
        </Column>
        
        <Column width={200} >
          <HeaderCell>Status</HeaderCell>
          <Cell dataKey="status" />
        </Column>
        
        <Column width={150}>
        <HeaderCell>Date</HeaderCell>
        <Cell dataKey="date" />
      </Column>
        <Column width={'100%'} fixed="right">
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
          // total={useDataContext.length}
          limitOptions={[5,10,15]}
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
