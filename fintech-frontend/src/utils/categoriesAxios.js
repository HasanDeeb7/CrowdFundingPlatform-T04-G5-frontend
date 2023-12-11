import axios from "axios";

export async function getCategories() {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND_ENDPOINT}categories/`
    );
    if (response) {
      return response;
    }
  } catch (error) {
    console.log(error);
  }
}
