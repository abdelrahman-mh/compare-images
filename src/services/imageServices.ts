import axios from "axios";

const fetchImage = async (url: string) => {
  const response = await axios.get(url, { responseType: "arraybuffer" });
  return response;
};

const payload = { fetchImage };
export default payload;
