import { useEffect, useState } from "react";
import MenuItem from "../Share/MenuItem";
import SectionTitle from "../Share/SectionTitle";

const HomeMenu = () => {
  const [menu, setMenu] = useState([]);
  useEffect(() => {
    fetch("menu.json")
      .then((res) => res.json())
      .then((data) => {
        const popular = data.filter((item) => item.category === "popular");
        console.log(popular);

        setMenu(popular);
      });
  }, []);
  return (
    <section className="mb-12">
      <SectionTitle
        heading="From Our Menu"
        subHeading="Popular Items"
      ></SectionTitle>
      <div className="grid md:grid-cols-2 gap-10">
        {menu?.map((item) => (
          <MenuItem key={item._id} item={item}></MenuItem>
        ))}
      </div>
      <button className="btn btn-outline border-0 border-b-4 mt-4">
        View Full Menu
      </button>
    </section>
  );
};

export default HomeMenu;
