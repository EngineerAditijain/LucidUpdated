import React, { useState } from "react";
import Container from "./formcontainer/container";
import Header from "../Header/header";

const AddUser = ({selectedZone, setSelectedZone,subheader}) => {


    return (
        <div className="h-full p-0 ml-[2%]" style={{
            width: "100%",
            height:"100%",
            background: "#f0f2f5",
        }}>
            <Header />
            <div className="overflow-auto h-[80%] flex justify-center items-center">
                <Container selectedZone={selectedZone} setSelectedZone={setSelectedZone} subheader={subheader}/>
            </div>

        </div>
    );
};

export default AddUser;
