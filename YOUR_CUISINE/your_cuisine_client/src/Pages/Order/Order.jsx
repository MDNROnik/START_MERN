import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import orderImg from "../../assets/order/banner2.jpg";
import useMenu from "../../Hooks/useMenu";
import Cover from "../Share/Cover";
import OrderCard from "./OrderCard";

const Order = () => {
  const [menu, loading] = useMenu();
  const [breakfast, setBreakfast] = useState([]);
  const [lunch, setLunch] = useState([]);
  const [dinner, setDinner] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [desserts, setDesserts] = useState([]);

  const { cate } = useParams();
  const [tabIndex, setTabIndex] = useState(cate);
  // console.log(cate);

  useEffect(() => {
    const tbreakfast = menu.filter((item) => item.category === "breakfast");
    const tlunch = menu.filter((item) => item.category === "lunch");
    const tdinner = menu.filter((item) => item.category === "dinner");
    const tdrinks = menu.filter((item) => item.category === "drinks");
    const tdesserts = menu.filter((item) => item.category === "dessert");

    setBreakfast(tbreakfast);
    setLunch(tlunch);
    setDinner(tdinner);
    setDrinks(tdrinks);
    setDesserts(tdesserts);
  }, [menu]);

  return (
    <div>
      <Cover img={orderImg} title={"Place Your Order"}></Cover>
      <Tabs
        defaultIndex={tabIndex}
        onSelect={(index) => setTabIndex(index)}
        className="m-10"
      >
        <TabList className="flex justify-between gap-2 bg-[#bcaf87] p-2 rounded-full shadow-inner">
          <Tab
            className="cursor-pointer flex-1 text-center py-2 rounded-full transition-all duration-300 text-[#07252d] font-medium
                         hover:bg-[#07252d] hover:text-[#bcaf87] focus:outline-none"
            selectedClassName="bg-[#07252d] text-[#bfb086] shadow-md"
          >
            Breakfast
          </Tab>
          <Tab
            className="cursor-pointer flex-1 text-center py-2 rounded-full transition-all duration-300 text-[#07252d] font-medium
                         hover:bg-[#07252d] hover:text-[#bcaf87] focus:outline-none"
            selectedClassName="bg-[#07252d] text-[#bcaf87] shadow-md"
          >
            Lunch
          </Tab>
          <Tab
            className="cursor-pointer flex-1 text-center py-2 rounded-full transition-all duration-300 text-[#07252d] font-medium
                         hover:bg-[#07252d] hover:text-[#bcaf87] focus:outline-none"
            selectedClassName="bg-[#07252d] text-[#bcaf87] shadow-md"
          >
            Dinner
          </Tab>
          <Tab
            className="cursor-pointer flex-1 text-center py-2 rounded-full transition-all duration-300 text-[#07252d] font-medium
                         hover:bg-[#07252d] hover:text-[#bcaf87] focus:outline-none"
            selectedClassName="bg-[#07252d] text-[#bcaf87] shadow-md"
          >
            Drinks
          </Tab>
          <Tab
            className="cursor-pointer flex-1 text-center py-2 rounded-full transition-all duration-300 text-[#07252d] font-medium
                         hover:bg-[#07252d] hover:text-[#bcaf87] focus:outline-none"
            selectedClassName="bg-[#07252d] text-[#bcaf87] shadow-md"
          >
            Dessert
          </Tab>
        </TabList>

        <TabPanel>
          <OrderCard items={breakfast}></OrderCard>
        </TabPanel>
        <TabPanel>
          <OrderCard items={lunch}></OrderCard>
        </TabPanel>
        <TabPanel>
          <OrderCard items={dinner}></OrderCard>
        </TabPanel>
        <TabPanel>
          <OrderCard items={drinks}></OrderCard>
        </TabPanel>
        <TabPanel>
          <OrderCard items={desserts}></OrderCard>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default Order;

// for future code code practice
{
  /* <Tabs>
        <TabList className="flex justify-between gap-2 bg-gray-100 p-2 rounded-full shadow-inner">
          {categories.map((cat, idx) => (
            <Tab
              key={idx}
              className="cursor-pointer flex-1 text-center py-2 rounded-full transition-all duration-300 text-gray-600 font-medium
                         hover:bg-white hover:text-black focus:outline-none"
              selectedClassName="bg-white text-black shadow-md"
            >
              {cat}
            </Tab>
          ))}
        </TabList>

        {categories.map((cat, idx) => (
          <TabPanel key={idx} className="mt-6 p-6 bg-white rounded-xl shadow-lg animate-fade-in">
            <h2 className="text-xl font-semibold">{cat} Menu</h2>
            <p className="mt-2 text-gray-600">Delicious {cat.toLowerCase()} items will appear here.</p>
          </TabPanel>
        ))}
      </Tabs> */
}
