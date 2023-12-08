import axios from "axios";

export async function createCampaign(data) {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_BACKEND_ENDPOINT}campaigns/add`,
      data,
      { headers: { "Content-Type": "multipart/form-data" } }
    );
    if (response) {
      return response;
    }
  } catch (error) {
    console.log(error);
  }
}
