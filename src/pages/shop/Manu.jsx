import React, { useEffect, useState } from "react";
import { Tab, Tabs, TabList } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import ShopCard from "./ShopCard";

const Manu = () => {
  const [menu, setMenu] = useState([]);
  const [filterCetagoryItem, setFilterCetagoryItem] = useState([]);
  const [selectCategory, setSlectCategory] = useState("all");
  const [shortOptions, setShortOptions] = useState("defult");

  // data loading
  useEffect(() => {
    //  data loading from backEnd
    const fetchData = async () => {
      try {
        const response = await fetch("/menu.json");
        const data = await response.json();
        // console.log(data);
        setMenu(data);
        setFilterCetagoryItem(data);
      } catch (error) {
        console.log("Error fetching data", error);
      }
    };
    //  call the function
    fetchData();
  }, []);

  //   filter by cetagory
  const filterItem = (category) => {
    const filtered =
      category === "all"
        ? menu
        : menu.filter((item) => item.category === category);

    setFilterCetagoryItem(filtered);
    setSlectCategory(category);
  };

  //   show all data function
  const showAll = () => {
    setFilterCetagoryItem(menu);
    setSlectCategory("all");
  };

  //  shorted data
  const handleShortingChange = (option) => {
    setShortOptions(option);
    let shortedItem = [...filterItem];

    // logic
    switch (option) {
      case "A-Z":
        shortedItem.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "Z-A":
        shortedItem.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "low-to-high":
        shortedItem.sort((a, b) => a.price - b.price);
        break;
      case "high-to-low":
        shortedItem.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }

    setFilterCetagoryItem(shortedItem);
  };

  return (
    <div className="">
      <div className="secetion-container bg-gradient-to-r from-0% from-[#FAFAFA] to-[#FCFCFC] to-100%">
        <div className="py-48 flex items-center justify-center">
          {/* texts */}
          <div className=" px-4 space-y-7 text-center">
            <h2 className="md:text-5xl text-4xl font-bold md:leading-snug leading-snug">
              For The Love Of Delectable{" "}
              <span className="text-green">Food</span>
            </h2>
            <p className="text-[#4A4A4A] text-xl">
              Come With Family & Where Each ipsum dolor sit amet. Plate Weaves a
              Story of Culinary Mastery and Passionate Craftsmanship
            </p>
            <button className="bg-green font-semibold btn text-white px-8 py-3 rounded-full">
              Order Now
            </button>
          </div>
        </div>
      </div>

      {/* container */}
      <div className="secetion-container flex flex-col md:flex-row md:space-x-40">
        {/* react tab */}
        <div className="w-full md:flex-1 py-8">
          <Tabs>
            <TabList>
              <Tab onClick={showAll}
              >All</Tab>
              <Tab
              onClick={() => filterItem("salad")}>Salad</Tab>
              <Tab
              onClick={() => filterItem("pizza")}>Pizza</Tab>
              <Tab
              onClick={() => filterItem("soup")}>Soups</Tab>
              <Tab
              onClick={() => filterItem("dessert")}>Desserts</Tab>
              <Tab
              onClick={() => filterItem("drinks")}>Drinks</Tab>
            </TabList>
          </Tabs>
        </div>
        <div  className=" py-8">
            <input className="border" type="text" />
        </div>
      </div>

      <div className="grid secetion-container grid-cols-1 lg:grid-cols-4 md:grid-cols-4 gap-4">
        {filterCetagoryItem.map((item, index) => (
          <ShopCard key={index} item={item} />
        ))}
      </div>
    </div>
  );
};

export default Manu;
