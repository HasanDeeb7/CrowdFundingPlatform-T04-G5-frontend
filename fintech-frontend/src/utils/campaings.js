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
export async function deleteCampaign(id) {
  console.log(process.env.REACT_APP_BACKEND_ENDPOINT);
  try {
    const response = await axios.delete(
      `${process.env.REACT_APP_BACKEND_ENDPOINT}campaigns/delete/${id}`
    );
    if (response) {
      return response;
    }
  } catch (error) {
    console.log(error);
  }
}
export async function approveCampaign(campaignId) {
  try {
    const response = await axios.patch(
      `${process.env.REACT_APP_BACKEND_ENDPOINT}campaigns/approve`,
      { campaignId: campaignId }
    );
    console.log(response);
    if (response) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
}
