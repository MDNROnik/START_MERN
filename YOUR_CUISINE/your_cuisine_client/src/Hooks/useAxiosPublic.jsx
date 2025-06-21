import axios from "axios";
const axiosUser = axios.create({
  baseURL: "https://your-cuisine-server.vercel.app",
  // baseURL: "http://localhost:5000",
});
const useAxiosPublic = () => {
  return axiosUser;
};

export default useAxiosPublic;
