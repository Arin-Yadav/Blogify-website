import axios from "axios";

export const deleteData = async (endpoint) => {
  const c = confirm(`Are you sure to delete this data`);
  if (c) {
    try {
      await axios.delete(endpoint, { withCredentials: true });
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  } else {
    return false;
  }
};
