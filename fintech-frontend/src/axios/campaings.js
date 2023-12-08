import axios from "axios";

export async function getCampaigns() {
  try {
    const data = await axios.get(
      `${process.env.REACT_APP_BACKEND_ENDPOINT}campaigns/`
    );
    if (data) {
      return data;
    }
  } catch (error) {
    console.log(error);
  }
}
