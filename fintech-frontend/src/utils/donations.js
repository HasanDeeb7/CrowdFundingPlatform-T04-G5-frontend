import axios from "axios";

async function fetchDonations() {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND_ENDPOINT}donations/read`
    );

    return response.data;
  } catch (error) {
    console.error(error);
  }
}
export default fetchDonations;
