import React, { useContext, useState, useEffect } from "react";
import { Table, Pagination, Button } from "rsuite";
import UserContext from "../../useContext/userContext";
import "./Content.css";
import "../../App.css";
import fetchDonations from "../../utils/donations";
import Loading from '../../Components/Loading/Loading'
// import Test from '../../Components/CampaignsTableComponent/CampaignsTableComponent.jsx'

const { Column, HeaderCell, Cell } = Table;

function Content({ activeFilter , searchText}) {
  const { user, setUser } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);
  const [donations, setDonations] = useState([]);


  const filterDataByTimeAndSearch = (data) => {
    const currentDate = new Date();

    // Filter data based on the activeFilter
    let filteredData = data;
    switch (activeFilter) {
      case 'Today':
        filteredData = filteredData.filter(item => isToday(new Date(item.createdAt), currentDate));
        break;
      case 'This Week':
        filteredData = filteredData.filter(item => isWeek(new Date(item.createdAt), currentDate));
        break;
      case 'This Month':
        filteredData = filteredData.filter(item => isSameMonth(new Date(item.createdAt), currentDate));
        break;
      default:
        break;
    }

    
    if (searchText) {
      const lowerSearchText = searchText.toLowerCase().trim();
      filteredData = filteredData.filter(item =>
        item.Campaign.title.toLowerCase().includes(lowerSearchText)
      );
    }
    return filteredData;
  };
  
  const isToday = (date1, date2) => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };

  const isWeek = (date1, date2) => {
    const firstDate = new Date(date1);
    const secondDate = new Date(date2);

    const firstWeekNumber = getISOWeek(firstDate);
    const secondWeekNumber = getISOWeek(secondDate);

    return firstWeekNumber === secondWeekNumber;
  };

  const getISOWeek = (date) => {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const daysInFirstWeek = 7 - firstDayOfYear.getDay();
    const daysSinceFirstDay = Math.floor(
      (date - firstDayOfYear) / (24 * 60 * 60 * 1000)
    );

    return Math.ceil((daysSinceFirstDay - daysInFirstWeek + 1) / 7);
  };

  const isSameMonth = (date1, date2) => {
    const firstDate = new Date(date1);
    const secondDate = new Date(date2);
  
    return (
      firstDate.getFullYear() === secondDate.getFullYear() &&
      firstDate.getMonth() === secondDate.getMonth()
    );
  };

  async function fetchDashboard() {
    setIsLoading(true);

    try {
      let fetchedDonations = await fetchDonations();
      setDonations(fetchedDonations.data);
      // console.log(user)
      // console.log(user.role);
      // console.log(user.Creator.id)
    } catch (error) {
      console.error("Error fetching donations:", error);
    } finally {
      setIsLoading(false);
    }
  }
  useEffect(() => {
    fetchDashboard();
  }, []);

  // useEffect(() => {
  //   console.log(donations);
  // }, [donations]); 

  const filteredData = filterDataByTimeAndSearch(donations, activeFilter);

  const [limit, setLimit] = React.useState(5);
  const [page, setPage] = React.useState(1);

  const handleChangeLimit = (dataKey) => {
    setPage(1);
    setLimit(dataKey);
  };

  const start = limit * (page - 1);
  const end = start + limit;

  const data = filteredData.slice(start, end);

  return (
    <div>
      {isLoading ? (
        <div><Loading/></div>
      ) : (
        <div >
      <div >
      <Table height={420} className="tableContainer" data={data}>
        <Column width={134} align="center" fixed>
          <HeaderCell>Id</HeaderCell>
          <Cell dataKey="id" />
        </Column>

        <Column width={220}>
          <HeaderCell>Donor Name</HeaderCell>
          
          <Cell>
            {(rowData) =>
              {return `${rowData.Donor.User?.firstName} ${rowData.Donor.User?.lastName}`}
            }
          </Cell>
        </Column>

        <Column width={220}>
          <HeaderCell>Campaign Title</HeaderCell>
          <Cell dataKey="Campaign.title" />
        </Column>

        <Column width={220}>
          <HeaderCell>Creator Name</HeaderCell>
          {/* <Cell dataKey="Campaign.Creator.User?" /> */}
          <Cell>
            {(rowData)=>{
              return `${rowData.Campaign?.Creator?.User?.firstName}`
            }}
          </Cell>
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

        <Column width={200} fixed="right">
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
      </div>
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
      )}
    </div>
  );
}

export default Content;
