import React from 'react';
import { Stack } from '@mui/material';
import Image from "../../assets/formfill.svg"
import FormContainer from "./form"

const Container = ({selectedZone, setSelectedZone,subheader}) => {
  return (
    <Stack direction="row" className=' w-full h-[90%] justify-center gap-2 ' style={{ overflow: "auto" }} >
      <div className="flex justify-center flex-col w-[45%] ">
        <div className="flex flex-row justify-between text-[#5262bc] font-sans">
          <div>Fill Record Details</div>
          {/* <div>Need Help ?Contact Us</div> */}
        </div>

        <div className="bg-white p-4 rounded-md flex overflow-auto  w-[100%] justify-center no-scrollbar mb-4">
          <FormContainer selectedZone={selectedZone} setSelectedZone={setSelectedZone} subheader={subheader}/>
        </div>
      </div>
      <img src={Image} style={{ width:"30%" , height:"85%"}} alt="Form Image" />
    </Stack>
  );
};

export default Container;
