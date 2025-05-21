import React, { useState } from "react";
import { useLoaderData } from "react-router";
import CoffeeCard from "./CoffeeCard";
import Header from "./Header"

const Home = () => {
  const initialCoffees = useLoaderData();
  const [coffees, setCoffees] = useState(initialCoffees);

  console.log(coffees);
  if(!coffees){
    return <div className="text-center text-6xl">Loading...</div>
  }

  
  return (
    <div className="m-20">
      <div>
        <Header />
      </div>
      <h1 className="text-6xl text-center">Welcome To The World Of COFFEES !</h1>
      
      
      <div className="grid grid-cols-2 md:grid-cols-2 gap-6">
        {coffees?.map((coffee) => (
          <CoffeeCard
            key={coffee._id}
            coffees={coffees}
            coffee={coffee}
            setCoffees={setCoffees}
          ></CoffeeCard>
        ))}
      </div>
    </div>
  );
};

export default Home;
