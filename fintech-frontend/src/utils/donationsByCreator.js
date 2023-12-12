import axios from "axios";

const creatorId = 22; // Replace with the actual creatorId

async function fetchDonationsByCreatorId(creatorId) {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND_ENDPOINT}donations/read/donationsByCreator`,
      {
        params: {
          creatorId: creatorId,
        },
      }
    );
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export default fetchDonationsByCreatorId
