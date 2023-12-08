import axios from "axios";

export async function Donate(data) {
  console.log(data);
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_BACKEND_ENDPOINT}donations/add`,
      data
    );
    if (response) {
      return response;
    }
  } catch (error) {
    console.log(error);
  }
}
