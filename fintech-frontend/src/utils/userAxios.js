import axios from "axios";
async function fetchUsers() {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND_ENDPOINT}users`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
export async function changeRole(data) {
  try {
    const response = await axios.patch(
      `${process.env.REACT_APP_BACKEND_ENDPOINT}users/changeRole`,
      data
    );
    return response && response;
  } catch (error) {
    console.log(error);
  }
}
export default fetchUsers;
