import { useEffect, useState } from "react";
import SectionTitle from "../Share/SectionTitle";
import MenuItem from "./MenuItem";

const ShortMenu = ({ heading, subHeading, category }) => {
  const [menu, setMenu] = useState([]);
  useEffect(() => {
    fetch("menu.json")
      .then((res) => res.json())
      .then((data) => {
        const filter = data.filter((item) => item.category === category);
        console.log(filter);
        const limited = filter.slice(0, 4);
        setMenu(limited);
      });
  }, []);
  return (
    <section className="mb-12">
      {!heading ? (
        <div className="pt-10"></div>
      ) : (
        <SectionTitle heading={heading} subHeading={subHeading}></SectionTitle>
      )}

      <div className="grid md:grid-cols-2 gap-10">
        {menu?.map((item) => (
          <MenuItem key={item._id} item={item}></MenuItem>
        ))}
      </div>
      <div className="flex justify-center">
        <button className=" btn btn-outline border-0  border-b-4 mt-4">
          View Full Menu
        </button>
      </div>
    </section>
  );
};

export default ShortMenu;
