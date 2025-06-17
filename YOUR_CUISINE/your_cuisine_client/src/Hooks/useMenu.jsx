import { useEffect, useState } from "react";
import useAxiosPublic from "./useAxiosPublic";
const useMenu = () => {
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosPublic = useAxiosPublic();
  useEffect(() => {
    axiosPublic.get("/menu").then((res) => {
      // console.log(res.data);
      setMenu(res.data);
    });
    setLoading(false);
  }, [loading]);
  return [menu, loading, setLoading];
};

export default useMenu;
