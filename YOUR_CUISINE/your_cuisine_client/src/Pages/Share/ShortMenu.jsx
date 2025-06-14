import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";

const ShortMenu = ({ heading, subHeading, category, cate }) => {
  const [menu, setMenu] = useState([]);
  useEffect(() => {
    fetch("menu.json")
      .then((res) => res.json())
      .then((data) => {
        const filter = data.filter((item) => item.category === category);
        // console.log(filter);
        const limited = filter.slice(0, 4);
        setMenu(limited);
      });
  }, []);
  // console.log(cate);

  return (
    <div className="bg-[#0a2a2f] text-white py-10 px-6 md:px-20">
      <h2 className="text-3xl font-serif text-center mb-10 relative">
        <span className="border-t border-white w-12 inline-block mr-4 align-middle" />
        {category}
        <span className="border-t border-white w-12 inline-block ml-4 align-middle" />
      </h2>
      <div className="grid md:grid-cols-2 gap-8">
        {menu.map((item, index) => (
          <div
            key={index}
            className={`py-4 border-b border-white/20 ${
              item.highlight
                ? "bg-[#d9c18f] text-black p-6 rounded-md shadow-md"
                : ""
            }`}
          >
            {item.highlight && (
              <p className="text-xs uppercase mb-2 tracking-wide text-gray-700">
                Chef Recommend
              </p>
            )}
            <div className="flex justify-between text-lg font-serif font-medium">
              <span>{item.name}</span>
              <span>${item.price.toFixed(2)}</span>
            </div>
            <p className="text-sm text-white/70 mt-1">{item.recipe}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShortMenu;
