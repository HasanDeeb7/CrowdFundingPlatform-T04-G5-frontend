import { Table, Pagination } from "rsuite";
import React, { useEffect, useState } from "react";
import { SelectPicker } from "rsuite";
import fetchUsers, { changeRole } from "../../utils/userAxios";
import { toast } from "react-toastify";
import "./AllUsers.css";

const roleOptions = [
  { label: "Admin", value: "admin" },
  { label: "Creator", value: "creator" },
  { label: "Donor", value: "donor" },
];

const AllUsers = () => {
  const [limit, setLimit] = React.useState(10);
  const [page, setPage] = React.useState(1);
  let [userApi, setUserApi] = useState([]);
  async function fetchAllUsers() {
    let donations = await fetchUsers();
    setUserApi(donations);
  }

  const handleRoleChange = async (value, rowData) => {
    // this should handle the changes from the backend
    const toastId = toast("Changing role...", {
      autoClose: false,
      closeOnClick: false,
    });

    try {
      const response = await changeRole({ id: rowData.id, role: value });
      if (response) {
        console.log(response.data);
        toast.dismiss(toastId);
        toast.success(`Role Changed to ${value}`);
      } else {
        toast.update(toastId, {
          render: "Something Wrong!",
          type: "error",
          autoClose: 2000,
        });
      }
    } catch (error) {
      console.log(error);
      toast.update(toastId, {
        render: "Something Wrong!",
        type: "error",
        autoClose: 2000,
      });
    }

    console.log("Role changed:", value, rowData);
  };
  useEffect(() => {
    fetchAllUsers();
  }, [handleRoleChange]);
  const { Column, HeaderCell, Cell } = Table;
  const defaultData = userApi.filter((data) => data.role !== "admin");

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
    <div className="allUsersContainer">
      <h1 style={{ marginBottom: 10 }}>All Users</h1>
      <Table
        height={420}
        data={data}
        rowHeight={() => 60}
        className="campaignsTable"
      >
        <Column width={50} align="center" fixed>
          <HeaderCell>Id</HeaderCell>
          <Cell dataKey="id" />
        </Column>

        <Column width={300} fixed>
          <HeaderCell>First Name</HeaderCell>
          <Cell dataKey="firstName" />
        </Column>

        <Column width={300}>
          <HeaderCell>Last Name</HeaderCell>
          <Cell dataKey="lastName" />
        </Column>

        <Column width={300}>
          <HeaderCell>Username</HeaderCell>
          <Cell dataKey="userName" />
        </Column>
        <Column width={300}>
          <HeaderCell>Role</HeaderCell>
          <Cell dataKey="role" />
        </Column>
        <Column width={300}>
          <HeaderCell>Role</HeaderCell>
          <Cell dataKey="role" editable>
            {(rowData, rowIndex) => {
              return (
                <SelectPicker
                  value=""
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
