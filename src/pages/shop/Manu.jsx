import React, { useEffect, useState } from "react";
import { Tab, Tabs, TabList } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { FaFilter } from "react-icons/fa";
import Cards from "../Cards";

const Manu = () => {
  const [menu, setMenu] = useState([]);
  const [filterCetagoryItem, setFilterCetagoryItem] = useState([]);
  const [selectCategory, setSlectCategory] = useState("all");
  const [shortOptions, setShortOptions] = useState("defult");
  const [currentPage,setCurrentPage] = useState(1)
  const [itemParPage] = useState(8)

  // data loading
  useEffect(() => {
    //  data loading from backEnd
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:6001/menu");
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
    setCurrentPage(1)
  };

  //   show all data function
  const showAll = () => {
    setFilterCetagoryItem(menu);
    setSlectCategory("all");
    setCurrentPage(1)
  };

  //  shorted data
  const handleSortChange = (option) => {
    setShortOptions(option);

    // Logic for sorting based on the selected option
    let sortedItems = [...filterCetagoryItem];

    switch (option) {
      case "A-Z":
        sortedItems.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "Z-A":
        sortedItems.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "low-to-high":
        sortedItems.sort((a, b) => a.price - b.price);
        break;
      case "high-to-low":
        sortedItems.sort((a, b) => b.price - a.price);
        break;
      default:
        // Do nothing for the "default" case
        break;
    }

    setFilterCetagoryItem(sortedItems);
    setCurrentPage(1)
  
  };

  // pagination logic
  const indexOfListItem = currentPage * itemParPage
  const indexOfFristItem = indexOfListItem - itemParPage
  const currentItem = filterCetagoryItem.slice(indexOfFristItem,indexOfListItem)
  const paginate = (pageNumber) => setCurrentPage(pageNumber)



  return (
    <div className="secetion-container">
      <div className=" bg-gradient-to-r from-0% from-[#FAFAFA] to-[#FCFCFC] to-100%">
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
      <div className="flex flex-col md:flex-row md:space-x-40">
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
        <div className="py-8">
           <div className="flex w-full">
             <div className="p-2 bg-black">
               <FaFilter className="text-white w-4 h-4"/>
             </div>
             {/* shorted filter */}
             <select
              id="sort"
              onChange={(e) =>handleSortChange(e.target.value)}
              className="bg-black text-white px-2 py-1 rounded-sm"
              >
                <option value="default">Default</option>
                <option value="A-Z">A-Z</option>
                <option value="Z-A">Z-A</option>
                <option value="low-to-high">Low To High</option>
                <option value="high-to-low">High To Low</option>
             </select>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 gap-4">
        {currentItem.map((item, index) => (
          <Cards key={index} item={item}/>
        ))}
      </div>

      <div className="flex justify-center my-8">
           {
            Array.from({length:Math.ceil(filterCetagoryItem.length / itemParPage)}).map((_,index)=>(
              <button key={index + 1}
               onClick={() =>paginate(index + 1)}
               className={`mx-1 px-3 py-1 rounded-full ${currentPage === index +1 ? "bg-green text-white" : 'bg-gray-200'}`}
              >
                {index + 1}
              </button>
            ))
           }
      </div>
    </div>
  );
};

export default Manu;
