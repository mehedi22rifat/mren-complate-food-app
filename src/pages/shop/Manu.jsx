import React, { useEffect, useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

const Manu = () => {

    const [menu,stManu] = useState([])
    const [filterItem,setFilterItem] = useState([])
    const [selectSetCategory,setSlectCategory] = useState('all')
    const [shortOptions,setShortOptions] = useState('defult')
 

    // data loading
          useEffect(() =>{
            //  data loading from backEnd
            const fetchData = async() =>{

                try{
                    const response = await fetch('/menu.json');
                    const data = await response.json();
                    console.log(data)
                }
                catch(error){
                    console.log('Error fetching data',error)
                }
            }
            //  call the function
             fetchData();
          },[])


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
      <div className="secetion-container">
        {/* react tab */}

        <Tabs>
          <TabList>
            <Tab>Title 1</Tab>
            <Tab>Title 2</Tab>
            <Tab>Title 2</Tab>
            <Tab>Title 2</Tab>
            <Tab>Title 2</Tab>

          </TabList>

          <TabPanel>
            <h2>Any content 1</h2>
          </TabPanel>
          <TabPanel>
            <h2>Any content 2</h2>
          </TabPanel> 
          <TabPanel>
            <h2>Any content 2</h2>
          </TabPanel> 
          <TabPanel>
            <h2>Any content 2</h2>
          </TabPanel> 
          <TabPanel>
            <h2>Any content 2</h2>
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
};

export default Manu;
