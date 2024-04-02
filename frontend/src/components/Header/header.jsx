import React from 'react';
import { AppBar, Box, MenuItem, MenuList, Popover, Stack, Tab, Tabs, Toolbar, Typography } from '@mui/material';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import logo from "../../logo.svg"
import Profile from "../../Profile.svg"

const Header = () => {
  const [value, setValue] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    // <div style={{marginTop:0}}>
      <AppBar
      
        sx={{
          backgroundColor: '#2B3B7C',
          // height:"80px",
          justifyContent:"center",
          borderRadius:"10px"
          // alignItems:"center"
        }}

        position="sticky">
          <Stack direction={"row"}  justifyContent={"flex-end"} width={"100%"} sx={{
            alignItems:"center",
            display:"flex",
            height:"100%"
          }}>
         {/* <img src={logo}/> */}
          
        <Toolbar sx={{ gap:3,  fontWeight:500 }}>

          
       <div style={{
       gap:"4px",
       alignItems:"center",
        display:"flex",
       flexDirection:"row",
       }}>
        <div style={{ backgroundColor:"white",color:"#000000", padding:"4px", borderRadius:"5px", alignItems:"center",height: "fit-content",color:" #393285"}}>
        Your Profile 
        </div>
        <div style={{borderRadius:"20px", padding:"2px", display:"flex", justifyContent:"center", alignItems:"center"}}> 
         <img src={Profile} />
        </div>
       </div>
        </Toolbar>
        </Stack>

      </AppBar>
    // </div>
  )
}

export default Header