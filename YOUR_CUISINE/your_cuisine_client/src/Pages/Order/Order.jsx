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
  const [salad, setSalad] = useState([]);
  const [pizza, setPizza] = useState([]);
  const [desserts, setDesserts] = useState([]);
  const [soup, setSoup] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const { cate } = useParams();
  const [tabIndex, setTabIndex] = useState(cate);
  // console.log(cate);

  useEffect(() => {
    // fetch("http://localhost:5000/menu")
    //   .then((res) => res.json())
    //   .then((data) => {
    //     // console.log(data);

    //     // setMenu(data);
    //     const tdesserts = data.filter((item) => item.category === "dessert");
    //     const tsoup = data.filter((item) => item.category === "soup");
    //     const tsalad = data.filter((item) => item.category === "salad");
    //     const tpizza = data.filter((item) => item.category === "pizza");
    //     const tdrinks = data.filter((item) => item.category === "drinks");

    //     setSalad(tsalad);
    //     setPizza(tpizza);
    //     setDesserts(tdesserts);
    //     setSoup(tsoup);
    //     setDrinks(tdrinks);
    //   });
    // console.log('====================================');
    // console.log(menu);
    // console.log('====================================');
    const tdesserts = menu.filter((item) => item.category === "dessert");
    const tsoup = menu.filter((item) => item.category === "soup");
    const tsalad = menu.filter((item) => item.category === "salad");
    const tpizza = menu.filter((item) => item.category === "pizza");
    const tdrinks = menu.filter((item) => item.category === "drinks");

    setSalad(tsalad);
    setPizza(tpizza);
    setDesserts(tdesserts);
    setSoup(tsoup);
    setDrinks(tdrinks);
  }, [menu]);

  // console.log("salad, ", salad);
  // console.log("pizza, ", pizza);
  // console.log("desserts, ", desserts);
  // console.log("soup, ", soup);
  // console.log("drinks, ", drinks);

  return (
    <div>
      <Cover img={orderImg} title={"Place Your Order"}></Cover>
      <Tabs defaultIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
        <TabList>
          <Tab>Salad</Tab>
          <Tab>Pizza</Tab>
          <Tab>Soup</Tab>
          <Tab>Dessert</Tab>
          <Tab>Drinks</Tab>
        </TabList>
        <TabPanel>
          <OrderCard items={salad}></OrderCard>
        </TabPanel>
        <TabPanel>
          <OrderCard items={pizza}></OrderCard>
        </TabPanel>
        <TabPanel>
          <OrderCard items={soup}></OrderCard>
        </TabPanel>
        <TabPanel>
          <OrderCard items={desserts}></OrderCard>
        </TabPanel>
        <TabPanel>
          <OrderCard items={drinks}></OrderCard>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default Order;
