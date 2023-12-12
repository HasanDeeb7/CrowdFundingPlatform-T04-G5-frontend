import axios from "axios";
import { toast } from "react-toastify";

export async function CreateUser(formData) {
  console.log(process.env.REACT_APP_BACKEND_ENDPOINT);
  try {
    const data = await axios.post(
      `${process.env.REACT_APP_BACKEND_ENDPOINT}users/add`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return data;
  } catch (error) {
    console.log(error);
    toast.error(error.response.data.error);
  }
}
