import axios from "axios";

async function fetchDonors() {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND_ENDPOINT}donors`
    );
    console.log(response.data);

    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export default fetchDonors;
