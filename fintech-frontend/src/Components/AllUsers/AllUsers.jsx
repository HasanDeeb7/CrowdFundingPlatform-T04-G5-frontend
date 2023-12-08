import { Table, Pagination } from "rsuite";
import fakeUsers from "../../FakeData/fakeUsers";
import React from "react";
import { SelectPicker } from "rsuite";

const { Column, HeaderCell, Cell } = Table;
const defaultData = fakeUsers.filter((data) => data.role !== "admin");

const roleOptions = [
  { label: "Admin", value: "admin" },
  { label: "Creator", value: "creator" },
  { label: "Donor", value: "donor" },
];

const handleRoleChange = (value, rowData) => {
  // this should handle the changes from the backend
  console.log("Role changed:", value, rowData);
};

const AllUsers = () => {
  const [limit, setLimit] = React.useState(10);
  const [page, setPage] = React.useState(1);

  const handleChangeLimit = (dataKey) => {
    setPage(1);
    setLimit(dataKey);
  };

  const data = defaultData.filter((v, i) => {
    const start = limit * (page - 1);
    const end = start + limit;
    return i >= start && i < end;
  });

  return (
    <div>
      <h1 style={{ marginBottom: 10 }}>All Users</h1>
      <Table height={500} data={data} rowHeight={() => 60}>
        <Column width={50} align="center" fixed>
          <HeaderCell>Id</HeaderCell>
          <Cell dataKey="id" />
        </Column>

        <Column width={100} fixed>
          <HeaderCell>First Name</HeaderCell>
          <Cell dataKey="firstName" />
        </Column>

        <Column width={100}>
          <HeaderCell>Last Name</HeaderCell>
          <Cell dataKey="lastName" />
        </Column>

        <Column width={200}>
          <HeaderCell>Username</HeaderCell>
          <Cell dataKey="userName" />
        </Column>
        <Column width={200} flexGrow={1}>
          <HeaderCell>Role</HeaderCell>
          <Cell dataKey="role" editable>
            {(rowData, rowIndex) => {
              return (
                <SelectPicker
                  defaultValue={rowData.role}
                  onChange={(value) => handleRoleChange(value, rowData)}
                  data={roleOptions}
                  style={{
                    width: 150,
                  }}
                  searchable={false}
                  cleanable={false}
                />
              );
            }}
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
          total={defaultData.length}
          limitOptions={[10, 30, 50]}
          limit={limit}
          activePage={page}
          onChangePage={setPage}
          onChangeLimit={handleChangeLimit}
        />
      </div>
    </div>
  );
};
export default AllUsers;
