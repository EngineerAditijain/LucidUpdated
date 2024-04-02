import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Logo from "../../logo.jpg"

const SideBar = () => {
  const [selected, setSelected] = useState('/home');
  const history = useHistory();

  const handleItemClick = (route) => {
    setSelected(route);
    history.push(route);
  };

  return (
    <>
      <div className='flex flex-col bg-[#2B3B7C] w-[15%] rounded-lg text-white items-center h-[100%]'>
        <div className='flex justify-center items-center mt-[10%]'>
          <img src={Logo} width={"80%"} className='self-center'/>
        </div>
        <div className='flex flex-col mt-[50%] h-[100%] w-[100%] gap-8'>
        <div
          className={` cursor-pointer ${selected === '/home' ? 'bg-[#f0f2f5] text-black' : ''} w-[100%] flex items-center justify-center pt-3 pb-3` }
          onClick={() => handleItemClick('/home')}
        >
          Home
        </div>
        <div
          className={` cursor-pointer ${selected === '/add' ? 'bg-[#f0f2f5] text-black' : ''} w-[100%] flex items-center justify-center  pt-3 pb-3`}
          onClick={() => handleItemClick('/add')}
        >
          Add Subdomain
        </div>
        </div>
        {/* Add more menu items here */}
      </div>
    </>
  );
};

export default SideBar;
