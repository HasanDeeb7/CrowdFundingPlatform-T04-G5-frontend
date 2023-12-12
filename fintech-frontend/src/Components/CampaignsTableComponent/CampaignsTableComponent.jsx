import { Pagination, Progress, Table, TagPicker } from "rsuite";
import { useContext, useEffect, useState } from "react";
import { getPercentage } from "../../utils/getPercentage";
import "./CampaignsTableComponents.css";
import { NavLink, useNavigate } from "react-router-dom";
import { getCampaigns } from "../../axios/campaings";
import Loading from "../Loading/Loading";
import UserContext from "../../useContext/userContext";
import Button from "../Button/Button";
import CreateCampaign from "../Dashboard/CreateCampaign";
import Input from "../Input/Input";
import { getCategories } from "../../utils/categoriesAxios";
const { Column, HeaderCell, Cell } = Table;

function ComponentsTableComponent({ setIsLoading }) {
  const [sortColumn, setSortColumn] = useState();
  const [sortType, setSortType] = useState();
  const [loading, setLoading] = useState(true);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [campaigns, setCampaigns] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchCampaigns, setSearchCampaigns] = useState({ text: null });
  const [filter, setFilter] = useState([]);
  const [tagFilter, setTagFilter] = useState();
  const tagStyles = { width: 300 };

  const { user } = useContext(UserContext);
  const handleChangeLimit = (dataKey) => {
    setPage(1);
    setLimit(dataKey);
  };
  async function fetchCampaigns() {
    const data = await getCampaigns();
    if (data) {
      if (user.role === "creator") {
        return setCampaigns(data.data);
      }
      return setCampaigns(data.data.filter((item) => item.status === "active"));
    }
  }
  async function fetchCategories() {
    try {
      const data = await getCategories();
      if (data) {
        const filters = data.data.map((item) => ({
          label: item.name,
          value: item.name,
        }));
        setFilter(filters.map((item) => item.label));
        setIsLoading(false);
        setLoading(false);
        return setTagFilter(filters);
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchCampaigns();
    fetchCategories();
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
    if (searchCampaigns.text) {
      const result = campaigns.filter((item) =>
        item.title.toLowerCase().includes(searchCampaigns.text.toLowerCase())
      );
      return filter.length > 0
        ? result.filter((item) => filter.includes(item.Category?.name))
        : result;
    } else {
      return filter.length > 0
        ? campaigns.filter((item) => filter.includes(item.Category?.name))
        : campaigns;
    }
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
        >
          View Details
        </NavLink>
      </Cell>
    );
  };

  return (
    <>
      <>
        <div className="campaignsHeader">
          <h1>Campaigns</h1>
          {user.role === "creator" && (
            <Button
              action="New Campaign"
              onClick={() => setIsModalOpen(true)}
            />
          )}
        </div>
        {isModalOpen && (
          <CreateCampaign
            action="Create Campaign"
            closeHandler={() => setIsModalOpen(false)}
          />
        )}
        <div className="searchFilterWrapper">
          <Input
            value={searchCampaigns}
            setValue={setSearchCampaigns}
            control="text"
            label="Search..."
          />
          <TagPicker
            size="lg"
            placeholder="Category"
            data={tagFilter}
            style={tagStyles}
            onChange={setFilter}
          />
        </div>
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

          <Column width={200} style={{ marginLeft: "100px" }} sortable>
            <HeaderCell className="customHeaderCell">status</HeaderCell>
            <Cell dataKey="status" />
          </Column>

          <Column width={150}>
            <HeaderCell>...</HeaderCell>
            <ActionCell dataKey="id" />
          </Column>
        </Table>
      </>

      <div style={{ padding: 20, width: "100%" }}>
        <Pagination
          prev
          next
          first
          last
          ellipsis
          boundaryLinks
          maxButtons={5}
          size="xs"
          layout={["total", "-", "limit", "|", "pager", "-", "skip"]}
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
