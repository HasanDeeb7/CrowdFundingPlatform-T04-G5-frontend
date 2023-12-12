import axios from "axios";

async function fetchCampaigns() {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND_ENDPOINT}campaigns`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
export default fetchCampaigns;
