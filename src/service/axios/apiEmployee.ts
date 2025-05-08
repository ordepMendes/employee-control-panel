import axios from "axios";

const apiEmployee = axios.create({
  baseURL: "https://employee-control-api-production.up.railway.app",
});

export default apiEmployee;
