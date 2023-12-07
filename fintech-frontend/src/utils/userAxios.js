import axios from "axios";
async function fetchUsers() {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND_ENDPOINT}users`
    );
    // console.log(response.data);

    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export default fetchUsers;
